/**
 * 购房通数据抓取脚本
 * 从 cdgoufangtong.com SSR 页面提取真实成都楼盘数据
 * 运行: node scripts/scrape.mjs
 */
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const BASE = "https://www.cdgoufangtong.com";
const CATEGORIES = ["hot", "forthcoming_sale", "latest_opening", "latest_lot_number", "surplus"];
const MAX_PAGES = 5;
const DATA_DIR = join(import.meta.dirname, "..", "public", "data");

async function fetchPage(path) {
  const res = await fetch(BASE + path, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
      "Accept-Language": "zh-CN,zh;q=0.9",
    },
  });
  return res.text();
}

function extractProjects(html) {
  const projects = [];

  // Split HTML into building-item blocks
  const blocks = html.split(/<div class="building-item"/g).slice(1);

  for (const block of blocks) {
    // Extract name from h1 > span
    const nameMatch = block.match(/<h1[^>]*><span[^>]*>([^<]+)<\/span>/);
    if (!nameMatch) continue;
    const name = nameMatch[1].trim();

    // Extract district from p tag
    const distMatch = block.match(/<p[^>]*>([^<]+)<\/p>/);
    const district = distMatch ? distMatch[1].trim() : null;

    // Extract tags from tags div
    const tagsBlock = block.match(/<div class="tags"[^>]*>([\s\S]*?)<\/div>/);
    const tags = [];
    if (tagsBlock) {
      const tagRegex = /<span[^>]*>([^<]+)<\/span>/g;
      let tm;
      while ((tm = tagRegex.exec(tagsBlock[1])) !== null) {
        tags.push(tm[1].trim());
      }
    }

    // Extract views count
    const viewMatch = block.match(/<span[^>]*>([\d.]+w)<\/span>/);
    const views = viewMatch ? viewMatch[1] : null;

    // Extract price range from the block
    const priceMatch = block.match(/(\d+-\d+)元[\/／]㎡/);
    const priceRange = priceMatch ? priceMatch[1] : null;

    projects.push({ name, district, tags, views, priceRange });
  }

  return projects;
}

function extractFromNuxt(html) {
  const nxtMatch = html.match(
    /window\.__NUXT__\s*=\s*(.*?)(?=;<\/script>)/
  );
  if (!nxtMatch) return [];

  const nxt = nxtMatch[1];

  // Extract building objects with location and price
  // Pattern: name:"...",...location:"...",...price_desc:"..." (may have minified fields between)
  const results = [];
  const nameRegex = /name:"([^"]+)"/g;
  let nm;
  while ((nm = nameRegex.exec(nxt)) !== null) {
    const name = nm[1];
    // Get surrounding context (200 chars after name)
    const pos = nm.index;
    const ctx = nxt.slice(pos, pos + 400);

    // Skip district/zone names (they don't have location field)
    if (!ctx.includes('location:"')) continue;

    const locMatch = ctx.match(/location:"([^"]+)"/);
    const priceMatch = ctx.match(/price_desc:"([^"]+)"/);

    results.push({
      name,
      location: locMatch ? locMatch[1] : null,
      priceDesc: priceMatch ? priceMatch[1] : null,
    });
  }
  return results;
}

function mergeData(htmlProjects, nuxtData) {
  const merged = htmlProjects.map((p) => {
    const nuxt = nuxtData.find(
      (n) => n.name === p.name || n.name.includes(p.name) || p.name.includes(n.name)
    );
    return {
      ...p,
      location: nuxt?.location || null,
      priceDesc: nuxt?.priceDesc || p.priceRange || null,
    };
  });

  // Also add projects found only in NUXT
  for (const nd of nuxtData) {
    if (!merged.find((m) => m.name === nd.name)) {
      merged.push({
        name: nd.name,
        district: null,
        tags: [],
        views: null,
        location: nd.location,
        priceDesc: nd.priceDesc,
      });
    }
  }

  return merged;
}

async function main() {
  mkdirSync(DATA_DIR, { recursive: true });

  let allProjects = [];

  for (const cat of CATEGORIES) {
    console.log(`Fetching ${cat}...`);
    for (let page = 1; page <= MAX_PAGES; page++) {
      try {
        const path = `/${cat}/?page=${page}`;
        const html = await fetchPage(path);

        if (html.includes("This page could not be found")) {
          break; // No more pages
        }

        const htmlProjects = extractProjects(html);
        const nuxtData = extractFromNuxt(html);
        const merged = mergeData(htmlProjects, nuxtData);

        if (merged.length === 0) break;

        // Tag with category
        merged.forEach((p) => {
          p.category = cat;
          p.id = "gft_" + Buffer.from(p.name).toString("base64").slice(0, 12);
        });

        allProjects.push(...merged);
        console.log(`  Page ${page}: ${merged.length} projects`);
      } catch (e) {
        console.error(`  Error ${cat} page ${page}: ${e.message}`);
        break;
      }
    }
  }

  // Deduplicate by name
  const seen = new Set();
  const unique = [];
  for (const p of allProjects) {
    const key = p.name;
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(p);
    }
  }

  console.log(`\nTotal unique projects: ${unique.length}`);

  // Save data
  const outputPath = join(DATA_DIR, "projects.json");
  writeFileSync(outputPath, JSON.stringify(unique, null, 2));
  console.log(`Saved to ${outputPath}`);

  // Also save metadata
  const meta = {
    lastUpdated: new Date().toISOString(),
    totalProjects: unique.length,
    source: "cdgoufangtong.com",
    categories: CATEGORIES,
  };
  writeFileSync(join(DATA_DIR, "meta.json"), JSON.stringify(meta, null, 2));
}

main().catch(console.error);
