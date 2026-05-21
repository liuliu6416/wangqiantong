/**
 * 网签通数据层
 * 真实楼盘数据从购房通 SSR 抓取（public/data/projects.json）
 * 楼栋/房源数据基于真实价格区间智能生成
 */

// ==================== 生成引擎 ====================
const STATUSES = ["已备案","已备案","已备案","已备案","已网签","已网签","已网签","未售","未售","未售","未售","未售","已认购"];
const BLD_TYPES = ["高层","高层","高层","超高层","小高层","小高层","洋房"];
const BLD_NAMES = ["1栋","2栋","3栋","4栋","5栋","6栋","A座","B座","C座","1号楼","2号楼","3号楼"];

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateBuildings(project) {
  const numBld = randInt(2, 5);
  const buildings = [];
  const priceRange = parsePriceRange(project.priceDesc || project.priceRange);

  for (let i = 0; i < numBld; i++) {
    const typeIdx = randInt(0, BLD_TYPES.length - 1);
    const type = BLD_TYPES[typeIdx];
    const floors = type === "超高层" ? randInt(35, 48) : type === "高层" ? randInt(24, 34) : type === "小高层" ? randInt(14, 20) : randInt(6, 10);
    const unitsPerFloor = randInt(2, 4);
    const name = BLD_NAMES[i % BLD_NAMES.length];

    const units = [];
    for (let f = 1; f <= Math.min(floors, 6); f++) {
      for (let u = 0; u < unitsPerFloor; u++) {
        const buildArea = Math.round((80 + Math.random() * 80) * 10) / 10;
        const innerArea = Math.round(buildArea * (0.78 + Math.random() * 0.05) * 10) / 10;
        const price = priceRange ? randInt(priceRange[0], priceRange[1]) : randInt(15000, 40000);
        units.push({
          room: `${f}-${String(u + 1).padStart(2, "0")}${f}`,
          floor: f,
          usage: Math.random() > 0.85 ? "商业" : "住宅",
          buildArea,
          innerArea,
          price,
          status: STATUSES[randInt(0, STATUSES.length - 1)],
        });
      }
    }

    const sold = units.filter(u => u.status === "已备案" || u.status === "已网签").length;
    buildings.push({ id: `${project.id}_b${i}`, projectId: project.id, name, type, floors, units, soldUnits: sold, totalUnits: units.length });
  }

  return buildings;
}

function parsePriceRange(str) {
  if (!str) return null;
  const m = str.match(/(\d+)-(\d+)/);
  if (!m) return null;
  return [parseInt(m[1]), parseInt(m[2])];
}

// ==================== 加载数据 ====================
let projectList = [];
let buildingMap = {};

async function loadData() {
  try {
    const res = await fetch(import.meta.env.BASE_URL + "data/projects.json");
    const projects = await res.json();

    projectList = projects.map((p, i) => {
      const buildings = generateBuildings(p);
      const totalUnits = buildings.reduce((s, b) => s + b.totalUnits, 0);
      const soldUnits = buildings.reduce((s, b) => s + b.soldUnits, 0);

      const projectId = p.id || `proj_${i}`;
      const bldIds = buildings.map(b => b.id);

      bldIds.forEach(bid => {
        buildingMap[bid] = buildings.find(b => b.id === bid);
      });

      return {
        id: projectId,
        name: p.name,
        recordName: p.name,
        presaleNumber: "蓉预售字第" + (20240000 + i) + "号",
        developer: "开发商信息待同步",
        address: p.location || (p.district || ""),
        region: p.district || "成都",
        totalUnits,
        soldUnits,
        buildings: bldIds,
        tags: p.tags || [],
        priceRange: p.priceDesc || p.priceRange || null,
        views: p.views || null,
        category: p.category || null,
        location: p.location || null,
      };
    });
  } catch (e) {
    console.error("Failed to load project data:", e);
  }
}

// ==================== 同步初始化 ====================
// 先用空数据，页面加载后自动填充
// Pages must handle the async loading case

let dataLoaded = false;
let dataPromise = null;

function ensureData() {
  if (!dataPromise) {
    dataPromise = loadData().then(() => { dataLoaded = true; });
  }
  return dataPromise;
}

// ==================== 公共 API ====================
export async function initData() {
  await ensureData();
  return projectList.length;
}

export function isDataReady() {
  return dataLoaded;
}

export function searchProjects(keyword, regionFilter) {
  let list = projectList;
  if (regionFilter && regionFilter !== "全部") {
    list = list.filter(p => p.region === regionFilter);
  }
  if (!keyword || !keyword.trim()) return list;
  const kw = keyword.trim().toLowerCase();
  return list.filter(p =>
    p.name.toLowerCase().includes(kw) ||
    (p.recordName && p.recordName.toLowerCase().includes(kw)) ||
    (p.region && p.region.includes(kw)) ||
    (p.address && p.address.toLowerCase().includes(kw))
  );
}

export function getAllRegions() {
  const set = new Set(projectList.map(p => p.region).filter(Boolean));
  return ["全部", ...Array.from(set).sort()];
}

export function getProject(id) {
  return projectList.find(p => p.id === id) || null;
}

export function getBuilding(id) {
  return buildingMap[id] || null;
}

export function getBuildingsByProject(projectId) {
  const project = getProject(projectId);
  if (!project) return [];
  return project.buildings.map(bid => buildingMap[bid]).filter(Boolean);
}

export function getProjectCount() {
  return projectList.length;
}

export function getTotalUnits() {
  return projectList.reduce((s, p) => s + p.totalUnits, 0);
}
