import { useParams, useNavigate } from "react-router-dom";
import { Tag } from "antd-mobile";
import { getProject, getBuilding, getBuildingsByProject } from "../data/mockData";

export default function BuildingDetail() {
  const { id, buildingId } = useParams();
  const nav = useNavigate();
  const project = getProject(id);
  const building = getBuilding(buildingId);
  const allBuildings = getBuildingsByProject(id);

  if (!project || !building) {
    return (
      <div className="empty-state">
        <div className="icon">📭</div>
        <div>楼栋信息未找到</div>
      </div>
    );
  }

  // 按楼层分组
  const floorGroups = {};
  building.units.forEach((u) => {
    if (!floorGroups[u.floor]) floorGroups[u.floor] = [];
    floorGroups[u.floor].push(u);
  });
  const floors = Object.keys(floorGroups).map(Number).sort((a, b) => a - b);

  // 价格统计
  const prices = building.units.map((u) => u.price);
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;

  const sold = building.units.filter((u) => u.status === "已备案" || u.status === "已网签").length;
  const total = building.units.length;

  const formatPrice = (p) => (p / 10000).toFixed(2) + "万/㎡";

  const switchBuilding = (bId) => {
    nav(`/project/${id}/building/${bId}`, { replace: true });
  };

  return (
    <div>
      {/* 楼栋基本信息 */}
      <div style={{ background: "#fff", padding: 16, borderBottom: "1px solid #f0f0f0" }}>
        <div style={{ fontSize: 13, color: "#999" }}>{project.name}</div>
        <div style={{ fontSize: 20, fontWeight: 700, marginTop: 4 }}>
          {building.name}
          <span style={{ fontSize: 13, color: "#999", fontWeight: 400, marginLeft: 8 }}>
            {building.type} · {building.floors}层
          </span>
        </div>
        <div style={{ display: "flex", gap: 24, marginTop: 10, fontSize: 13 }}>
          <div>
            <span style={{ color: "#999" }}>已售 </span>
            <span style={{ color: "#1677ff", fontWeight: 600 }}>{sold}</span>
          </div>
          <div>
            <span style={{ color: "#999" }}>可售 </span>
            <span style={{ color: "#52c41a", fontWeight: 600 }}>{total - sold}</span>
          </div>
          <div>
            <span style={{ color: "#999" }}>总计 </span>
            <span style={{ fontWeight: 600 }}>{total}</span>
          </div>
        </div>
      </div>

      {/* 楼栋切换 */}
      <div className="building-tabs" style={{ marginTop: 12 }}>
        {allBuildings.map((b) => (
          <div
            key={b.id}
            className={`building-tab ${b.id === buildingId ? "active" : ""}`}
            onClick={() => switchBuilding(b.id)}
          >
            {b.name}
          </div>
        ))}
      </div>

      {/* 房源表格 */}
      {building.units.length === 0 ? (
        <div className="empty-state">
          <div className="icon">🏗️</div>
          <div>暂未公示房源明细</div>
        </div>
      ) : (
        <>
          <div className="unit-table-wrap">
            <table className="unit-table">
              <thead>
                <tr>
                  <th>房号</th>
                  <th>楼层</th>
                  <th>用途</th>
                  <th>建面(㎡)</th>
                  <th>套内(㎡)</th>
                  <th>备案价(元/㎡)</th>
                  <th>总价(万)</th>
                  <th>状态</th>
                </tr>
              </thead>
              <tbody>
                {floors.map((floor) => (
                  <FloorSection key={floor} floor={floor} units={floorGroups[floor]} />
                ))}
              </tbody>
            </table>
          </div>

          {/* 价格区间 */}
          <div className="price-range">
            <div className="range-item">
              <div className="range-value">{formatPrice(minPrice)}</div>
              <div className="range-label">最低备案价</div>
            </div>
            <div className="range-item">
              <div className="range-value">{formatPrice(maxPrice)}</div>
              <div className="range-label">最高备案价</div>
            </div>
            <div className="range-item">
              <div className="range-value">
                {formatPrice(prices.length > 0 ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length / 100) * 100 : 0)}
              </div>
              <div className="range-label">平均备案价</div>
            </div>
          </div>
        </>
      )}

      <div className="safe-bottom" />
    </div>
  );
}

function FloorSection({ floor, units }) {
  return (
    <>
      <tr>
        <td colSpan={8} className="floor-group">
          第 {floor} 层
        </td>
      </tr>
      {units.map((u) => (
        <tr key={u.room}>
          <td style={{ fontWeight: 500 }}>{u.room}</td>
          <td>{u.floor}F</td>
          <td>{u.usage}</td>
          <td>{u.buildArea}</td>
          <td>{u.innerArea}</td>
          <td style={{ color: "#ff7a45", fontWeight: 500 }}>
            {(u.price / 10000).toFixed(2)}万
          </td>
          <td style={{ color: "#333", fontWeight: 500 }}>
            {((u.price * u.buildArea) / 10000).toFixed(0)}万
          </td>
          <td>
            <span className={`status-tag status-${u.status}`}>{u.status}</span>
          </td>
        </tr>
      ))}
    </>
  );
}
