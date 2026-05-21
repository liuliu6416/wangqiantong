/**
 * 模拟数据 — 成都市商品房网签备案信息
 * 结构对齐成都市公共数据开放平台字段
 */

const mockProjects = [
  {
    id: "p001",
    name: "蜀都花园",
    recordName: "蜀都花园二期",
    presaleNumber: "蓉预售字第51010020240001号",
    developer: "成都蜀都置业有限公司",
    address: "高新区天府大道南段1688号",
    region: "高新区",
    totalUnits: 432,
    soldUnits: 318,
    buildings: ["b001", "b002", "b003", "b004"],
  },
  {
    id: "p002",
    name: "锦城湖畔",
    recordName: "锦城湖畔小区",
    presaleNumber: "蓉预售字第51010020240015号",
    developer: "成都锦城房地产开发有限公司",
    address: "天府新区兴隆湖东岸99号",
    region: "天府新区",
    totalUnits: 256,
    soldUnits: 189,
    buildings: ["b101", "b102", "b103"],
  },
  {
    id: "p003",
    name: "龙湖天街名邸",
    recordName: "龙湖天街名邸项目",
    presaleNumber: "蓉预售字第51010020240032号",
    developer: "成都龙湖地产发展有限公司",
    address: "成华区建设路188号",
    region: "成华区",
    totalUnits: 520,
    soldUnits: 401,
    buildings: ["b201", "b202", "b203", "b204", "b205"],
  },
  {
    id: "p004",
    name: "万科翡翠公园",
    recordName: "万科翡翠公园一期",
    presaleNumber: "蓉预售字第51010020240058号",
    developer: "成都万科房地产有限公司",
    address: "锦江区东大街下东大街段99号",
    region: "锦江区",
    totalUnits: 180,
    soldUnits: 52,
    buildings: ["b301", "b302"],
  },
  {
    id: "p005",
    name: "中海锦城",
    recordName: "中海锦城北区",
    presaleNumber: "蓉预售字第51010020240076号",
    developer: "成都中海地产有限公司",
    address: "青羊区光华大道一段88号",
    region: "青羊区",
    totalUnits: 340,
    soldUnits: 340,
    buildings: ["b401", "b402", "b403"],
  },
];

const buildingMap = {
  // === 蜀都花园 ===
  b001: {
    id: "b001",
    projectId: "p001",
    name: "1栋",
    type: "高层",
    floors: 26,
    units: [
      { room: "1-101", floor: 1, usage: "住宅", buildArea: 118.5, innerArea: 96.2, price: 28500, status: "已备案" },
      { room: "1-102", floor: 1, usage: "住宅", buildArea: 95.3, innerArea: 77.1, price: 27200, status: "已备案" },
      { room: "1-103", floor: 1, usage: "住宅", buildArea: 125.0, innerArea: 101.5, price: 29300, status: "已备案" },
      { room: "1-104", floor: 1, usage: "住宅", buildArea: 88.6, innerArea: 71.8, price: 26800, status: "已备案" },
      { room: "1-201", floor: 2, usage: "住宅", buildArea: 118.5, innerArea: 96.2, price: 28700, status: "已网签" },
      { room: "1-202", floor: 2, usage: "住宅", buildArea: 95.3, innerArea: 77.1, price: 27400, status: "已备案" },
      { room: "1-203", floor: 2, usage: "住宅", buildArea: 125.0, innerArea: 101.5, price: 29500, status: "未售" },
      { room: "1-204", floor: 2, usage: "住宅", buildArea: 88.6, innerArea: 71.8, price: 27000, status: "未售" },
      { room: "1-301", floor: 3, usage: "住宅", buildArea: 118.5, innerArea: 96.2, price: 28900, status: "已备案" },
      { room: "1-302", floor: 3, usage: "住宅", buildArea: 95.3, innerArea: 77.1, price: 27600, status: "已网签" },
      { room: "1-303", floor: 3, usage: "住宅", buildArea: 125.0, innerArea: 101.5, price: 29700, status: "未售" },
      { room: "1-304", floor: 3, usage: "住宅", buildArea: 88.6, innerArea: 71.8, price: 27200, status: "已认购" },
      { room: "1-501", floor: 5, usage: "住宅", buildArea: 118.5, innerArea: 96.2, price: 29300, status: "已备案" },
      { room: "1-502", floor: 5, usage: "住宅", buildArea: 95.3, innerArea: 77.1, price: 28000, status: "未售" },
      { room: "1-503", floor: 5, usage: "住宅", buildArea: 125.0, innerArea: 101.5, price: 30100, status: "已备案" },
      { room: "1-504", floor: 5, usage: "住宅", buildArea: 88.6, innerArea: 71.8, price: 27600, status: "已网签" },
    ],
  },
  b002: {
    id: "b002",
    projectId: "p001",
    name: "2栋",
    type: "高层",
    floors: 26,
    units: [
      { room: "2-101", floor: 1, usage: "住宅", buildArea: 108.0, innerArea: 87.5, price: 27800, status: "已备案" },
      { room: "2-102", floor: 1, usage: "住宅", buildArea: 108.0, innerArea: 87.5, price: 27800, status: "已备案" },
      { room: "2-103", floor: 1, usage: "住宅", buildArea: 135.2, innerArea: 109.8, price: 30500, status: "已备案" },
      { room: "2-104", floor: 1, usage: "住宅", buildArea: 135.2, innerArea: 109.8, price: 30500, status: "已网签" },
      { room: "2-201", floor: 2, usage: "住宅", buildArea: 108.0, innerArea: 87.5, price: 28000, status: "已网签" },
      { room: "2-202", floor: 2, usage: "住宅", buildArea: 108.0, innerArea: 87.5, price: 28000, status: "已备案" },
      { room: "2-203", floor: 2, usage: "住宅", buildArea: 135.2, innerArea: 109.8, price: 30700, status: "未售" },
      { room: "2-204", floor: 2, usage: "住宅", buildArea: 135.2, innerArea: 109.8, price: 30700, status: "未售" },
      { room: "2-301", floor: 3, usage: "住宅", buildArea: 108.0, innerArea: 87.5, price: 28200, status: "已备案" },
      { room: "2-302", floor: 3, usage: "住宅", buildArea: 108.0, innerArea: 87.5, price: 28200, status: "已备案" },
      { room: "2-303", floor: 3, usage: "住宅", buildArea: 135.2, innerArea: 109.8, price: 30900, status: "未售" },
      { room: "2-304", floor: 3, usage: "住宅", buildArea: 135.2, innerArea: 109.8, price: 30900, status: "已认购" },
    ],
  },
  b003: {
    id: "b003",
    projectId: "p001",
    name: "3栋",
    type: "小高层",
    floors: 18,
    units: [
      { room: "3-101", floor: 1, usage: "住宅", buildArea: 142.0, innerArea: 118.5, price: 32500, status: "未售" },
      { room: "3-102", floor: 1, usage: "住宅", buildArea: 142.0, innerArea: 118.5, price: 32500, status: "已备案" },
      { room: "3-103", floor: 1, usage: "住宅", buildArea: 128.5, innerArea: 106.8, price: 31800, status: "已网签" },
      { room: "3-201", floor: 2, usage: "住宅", buildArea: 142.0, innerArea: 118.5, price: 32800, status: "未售" },
      { room: "3-202", floor: 2, usage: "住宅", buildArea: 142.0, innerArea: 118.5, price: 32800, status: "未售" },
      { room: "3-203", floor: 2, usage: "住宅", buildArea: 128.5, innerArea: 106.8, price: 32000, status: "已备案" },
      { room: "3-301", floor: 3, usage: "住宅", buildArea: 142.0, innerArea: 118.5, price: 33100, status: "已备案" },
      { room: "3-302", floor: 3, usage: "住宅", buildArea: 142.0, innerArea: 118.5, price: 33100, status: "已网签" },
      { room: "3-303", floor: 3, usage: "住宅", buildArea: 128.5, innerArea: 106.8, price: 32300, status: "未售" },
    ],
  },
  b004: {
    id: "b004",
    projectId: "p001",
    name: "4栋",
    type: "小高层",
    floors: 18,
    units: [
      { room: "4-101", floor: 1, usage: "住宅", buildArea: 110.0, innerArea: 89.5, price: 29000, status: "已备案" },
      { room: "4-102", floor: 1, usage: "住宅", buildArea: 110.0, innerArea: 89.5, price: 29000, status: "已备案" },
      { room: "4-103", floor: 1, usage: "商业", buildArea: 58.2, innerArea: 50.1, price: 42000, status: "未售" },
      { room: "4-201", floor: 2, usage: "住宅", buildArea: 110.0, innerArea: 89.5, price: 29200, status: "已网签" },
      { room: "4-202", floor: 2, usage: "住宅", buildArea: 110.0, innerArea: 89.5, price: 29200, status: "未售" },
      { room: "4-203", floor: 2, usage: "商业", buildArea: 58.2, innerArea: 50.1, price: 42200, status: "未售" },
    ],
  },

  // === 锦城湖畔 ===
  b101: {
    id: "b101", projectId: "p002", name: "A座", type: "高层", floors: 32,
    units: [
      { room: "A-101", floor: 1, usage: "住宅", buildArea: 102.0, innerArea: 82.5, price: 31200, status: "已备案" },
      { room: "A-102", floor: 1, usage: "住宅", buildArea: 102.0, innerArea: 82.5, price: 31200, status: "已备案" },
      { room: "A-103", floor: 1, usage: "住宅", buildArea: 89.5, innerArea: 72.0, price: 29800, status: "已网签" },
      { room: "A-104", floor: 1, usage: "住宅", buildArea: 138.0, innerArea: 112.3, price: 33800, status: "未售" },
      { room: "A-201", floor: 2, usage: "住宅", buildArea: 102.0, innerArea: 82.5, price: 31500, status: "已备案" },
      { room: "A-202", floor: 2, usage: "住宅", buildArea: 102.0, innerArea: 82.5, price: 31500, status: "未售" },
      { room: "A-203", floor: 2, usage: "住宅", buildArea: 89.5, innerArea: 72.0, price: 30100, status: "已备案" },
      { room: "A-204", floor: 2, usage: "住宅", buildArea: 138.0, innerArea: 112.3, price: 34100, status: "已网签" },
      { room: "A-301", floor: 3, usage: "住宅", buildArea: 102.0, innerArea: 82.5, price: 31800, status: "未售" },
      { room: "A-302", floor: 3, usage: "住宅", buildArea: 102.0, innerArea: 82.5, price: 31800, status: "已备案" },
      { room: "A-303", floor: 3, usage: "住宅", buildArea: 89.5, innerArea: 72.0, price: 30400, status: "已备案" },
      { room: "A-304", floor: 3, usage: "住宅", buildArea: 138.0, innerArea: 112.3, price: 34400, status: "未售" },
    ],
  },
  b102: {
    id: "b102", projectId: "p002", name: "B座", type: "高层", floors: 32,
    units: [
      { room: "B-101", floor: 1, usage: "住宅", buildArea: 115.0, innerArea: 93.2, price: 32000, status: "已备案" },
      { room: "B-102", floor: 1, usage: "住宅", buildArea: 115.0, innerArea: 93.2, price: 32000, status: "已备案" },
      { room: "B-103", floor: 1, usage: "住宅", buildArea: 96.8, innerArea: 78.5, price: 30500, status: "已网签" },
      { room: "B-201", floor: 2, usage: "住宅", buildArea: 115.0, innerArea: 93.2, price: 32300, status: "未售" },
      { room: "B-202", floor: 2, usage: "住宅", buildArea: 115.0, innerArea: 93.2, price: 32300, status: "未售" },
      { room: "B-203", floor: 2, usage: "住宅", buildArea: 96.8, innerArea: 78.5, price: 30800, status: "已备案" },
      { room: "B-301", floor: 3, usage: "住宅", buildArea: 115.0, innerArea: 93.2, price: 32600, status: "已备案" },
      { room: "B-302", floor: 3, usage: "住宅", buildArea: 115.0, innerArea: 93.2, price: 32600, status: "已网签" },
      { room: "B-303", floor: 3, usage: "住宅", buildArea: 96.8, innerArea: 78.5, price: 31100, status: "未售" },
    ],
  },
  b103: {
    id: "b103", projectId: "p002", name: "C座", type: "小高层", floors: 16,
    units: [
      { room: "C-101", floor: 1, usage: "住宅", buildArea: 155.0, innerArea: 128.6, price: 36800, status: "已备案" },
      { room: "C-102", floor: 1, usage: "住宅", buildArea: 155.0, innerArea: 128.6, price: 36800, status: "已备案" },
      { room: "C-103", floor: 1, usage: "住宅", buildArea: 130.0, innerArea: 107.5, price: 35200, status: "未售" },
      { room: "C-201", floor: 2, usage: "住宅", buildArea: 155.0, innerArea: 128.6, price: 37200, status: "已网签" },
      { room: "C-202", floor: 2, usage: "住宅", buildArea: 155.0, innerArea: 128.6, price: 37200, status: "已备案" },
      { room: "C-203", floor: 2, usage: "住宅", buildArea: 130.0, innerArea: 107.5, price: 35600, status: "未售" },
    ],
  },

  // === 龙湖天街名邸 ===
  b201: {
    id: "b201", projectId: "p003", name: "1号楼", type: "超高层", floors: 40,
    units: [
      { room: "1-101", floor: 1, usage: "商业", buildArea: 85.0, innerArea: 72.0, price: 48000, status: "未售" },
      { room: "1-102", floor: 1, usage: "商业", buildArea: 68.5, innerArea: 58.0, price: 46500, status: "已备案" },
      { room: "1-201", floor: 2, usage: "住宅", buildArea: 98.0, innerArea: 79.2, price: 29800, status: "已备案" },
      { room: "1-202", floor: 2, usage: "住宅", buildArea: 98.0, innerArea: 79.2, price: 29800, status: "已网签" },
      { room: "1-203", floor: 2, usage: "住宅", buildArea: 112.5, innerArea: 91.0, price: 30800, status: "已备案" },
      { room: "1-301", floor: 3, usage: "住宅", buildArea: 98.0, innerArea: 79.2, price: 30000, status: "未售" },
      { room: "1-302", floor: 3, usage: "住宅", buildArea: 98.0, innerArea: 79.2, price: 30000, status: "已备案" },
      { room: "1-303", floor: 3, usage: "住宅", buildArea: 112.5, innerArea: 91.0, price: 31000, status: "已备案" },
    ],
  },
  b202: {
    id: "b202", projectId: "p003", name: "2号楼", type: "超高层", floors: 40,
    units: [
      { room: "2-101", floor: 1, usage: "商业", buildArea: 92.0, innerArea: 78.5, price: 49000, status: "已备案" },
      { room: "2-102", floor: 1, usage: "商业", buildArea: 75.0, innerArea: 63.8, price: 47500, status: "未售" },
      { room: "2-201", floor: 2, usage: "住宅", buildArea: 105.0, innerArea: 85.0, price: 30500, status: "已备案" },
      { room: "2-202", floor: 2, usage: "住宅", buildArea: 105.0, innerArea: 85.0, price: 30500, status: "已备案" },
      { room: "2-203", floor: 2, usage: "住宅", buildArea: 120.0, innerArea: 97.5, price: 31500, status: "已网签" },
      { room: "2-301", floor: 3, usage: "住宅", buildArea: 105.0, innerArea: 85.0, price: 30700, status: "未售" },
    ],
  },
  b203: { id: "b203", projectId: "p003", name: "3号楼", type: "高层", floors: 28, units: [] },
  b204: { id: "b204", projectId: "p003", name: "4号楼", type: "高层", floors: 28, units: [] },
  b205: { id: "b205", projectId: "p003", name: "5号楼", type: "小高层", floors: 18, units: [] },

  // === 万科翡翠公园 ===
  b301: {
    id: "b301", projectId: "p004", name: "1幢", type: "高层", floors: 24,
    units: [
      { room: "1-101", floor: 1, usage: "住宅", buildArea: 145.0, innerArea: 120.5, price: 38500, status: "未售" },
      { room: "1-102", floor: 1, usage: "住宅", buildArea: 145.0, innerArea: 120.5, price: 38500, status: "未售" },
      { room: "1-103", floor: 1, usage: "住宅", buildArea: 128.5, innerArea: 106.2, price: 37200, status: "已认购" },
      { room: "1-201", floor: 2, usage: "住宅", buildArea: 145.0, innerArea: 120.5, price: 38800, status: "未售" },
      { room: "1-202", floor: 2, usage: "住宅", buildArea: 145.0, innerArea: 120.5, price: 38800, status: "已备案" },
      { room: "1-203", floor: 2, usage: "住宅", buildArea: 128.5, innerArea: 106.2, price: 37500, status: "未售" },
    ],
  },
  b302: {
    id: "b302", projectId: "p004", name: "2幢", type: "高层", floors: 24,
    units: [
      { room: "2-101", floor: 1, usage: "住宅", buildArea: 160.0, innerArea: 133.8, price: 39800, status: "未售" },
      { room: "2-102", floor: 1, usage: "住宅", buildArea: 160.0, innerArea: 133.8, price: 39800, status: "未售" },
      { room: "2-201", floor: 2, usage: "住宅", buildArea: 160.0, innerArea: 133.8, price: 40100, status: "已备案" },
      { room: "2-202", floor: 2, usage: "住宅", buildArea: 160.0, innerArea: 133.8, price: 40100, status: "未售" },
    ],
  },

  // === 中海锦城 ===
  b401: {
    id: "b401", projectId: "p005", name: "1栋", type: "高层", floors: 30,
    units: [
      { room: "1-101", floor: 1, usage: "住宅", buildArea: 110.0, innerArea: 89.5, price: 26500, status: "已备案" },
      { room: "1-102", floor: 1, usage: "住宅", buildArea: 110.0, innerArea: 89.5, price: 26500, status: "已备案" },
      { room: "1-103", floor: 1, usage: "住宅", buildArea: 93.5, innerArea: 75.8, price: 25800, status: "已备案" },
      { room: "1-201", floor: 2, usage: "住宅", buildArea: 110.0, innerArea: 89.5, price: 26800, status: "已备案" },
      { room: "1-202", floor: 2, usage: "住宅", buildArea: 110.0, innerArea: 89.5, price: 26800, status: "已备案" },
      { room: "1-203", floor: 2, usage: "住宅", buildArea: 93.5, innerArea: 75.8, price: 26000, status: "已备案" },
    ],
  },
  b402: { id: "b402", projectId: "p005", name: "2栋", type: "高层", floors: 30, units: [] },
  b403: { id: "b403", projectId: "p005", name: "3栋", type: "高层", floors: 30, units: [] },
};

// 给没有填 units 的楼栋生成一些模拟数据
Object.values(buildingMap).forEach((b) => {
  if (b.units.length === 0) {
    const usages = ["住宅", "住宅", "住宅", "商业"];
    const statuses = ["已备案", "已备案", "已网签", "未售", "未售", "已认购"];
    for (let f = 1; f <= Math.min(b.floors, 5); f++) {
      for (let u = 0; u < 3; u++) {
        const area = Math.round((80 + Math.random() * 80) * 10) / 10;
        b.units.push({
          room: `${f}-${String(u + 1).padStart(2, "0")}${f}`,
          floor: f,
          usage: usages[u % usages.length],
          buildArea: area,
          innerArea: Math.round(area * 0.81 * 10) / 10,
          price: Math.round((26000 + Math.random() * 8000) / 100) * 100,
          status: statuses[Math.floor(Math.random() * statuses.length)],
        });
      }
    }
  }
});

// 更新 soldUnits
mockProjects.forEach((p) => {
  let sold = 0;
  let total = 0;
  p.buildings.forEach((bid) => {
    const b = buildingMap[bid];
    if (b) {
      total += b.units.length;
      sold += b.units.filter((u) => u.status === "已备案" || u.status === "已网签").length;
    }
  });
  p.totalUnits = total;
  p.soldUnits = sold;
});

export function searchProjects(keyword) {
  if (!keyword || !keyword.trim()) return mockProjects;
  const kw = keyword.trim().toLowerCase();
  return mockProjects.filter(
    (p) =>
      p.name.toLowerCase().includes(kw) ||
      p.recordName.toLowerCase().includes(kw) ||
      p.developer.toLowerCase().includes(kw) ||
      p.region.includes(kw) ||
      p.presaleNumber.includes(kw)
  );
}

export function getProject(id) {
  return mockProjects.find((p) => p.id === id) || null;
}

export function getBuilding(id) {
  return buildingMap[id] || null;
}

export function getBuildingsByProject(projectId) {
  const project = getProject(projectId);
  if (!project) return [];
  return project.buildings.map((bid) => buildingMap[bid]).filter(Boolean);
}
