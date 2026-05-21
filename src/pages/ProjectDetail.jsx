import { useParams, useNavigate } from "react-router-dom";
import { Tag } from "antd-mobile";
import { getProject, getBuildingsByProject } from "../data/mockData";

export default function ProjectDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const project = getProject(id);

  if (!project) {
    return (
      <div className="empty-state">
        <div className="icon">📭</div>
        <div>项目未找到</div>
      </div>
    );
  }

  const buildings = getBuildingsByProject(id);
  const rate = project.totalUnits > 0 ? Math.round((project.soldUnits / project.totalUnits) * 100) : 0;
  const unsold = project.totalUnits - project.soldUnits;

  const getStatusTag = (sold, total) => {
    if (sold === 0) return <Tag color="default">待售</Tag>;
    if (sold >= total) return <Tag color="danger">售罄</Tag>;
    return <Tag color="primary">在售</Tag>;
  };

  return (
    <div>
      {/* 项目基本信息 */}
      <div style={{ background: "#fff", padding: 16, borderBottom: "1px solid #f0f0f0" }}>
        <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{project.name}</div>
        <div style={{ fontSize: 13, color: "#666", marginBottom: 4 }}>
          <span style={{ color: "#999" }}>备案名：</span>{project.recordName}
        </div>
        <div style={{ fontSize: 13, color: "#666", marginBottom: 4 }}>
          <span style={{ color: "#999" }}>预售证：</span>{project.presaleNumber}
        </div>
        <div style={{ fontSize: 13, color: "#666", marginBottom: 4 }}>
          <span style={{ color: "#999" }}>开发商：</span>{project.developer}
        </div>
        <div style={{ fontSize: 13, color: "#666", marginBottom: 10 }}>
          <span style={{ color: "#999" }}>地址：</span>{project.address}
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <Tag color="default" fill="outline">{project.region}</Tag>
          <Tag color="default" fill="outline">{buildings.length} 栋楼</Tag>
          {getStatusTag(project.soldUnits, project.totalUnits)}
        </div>
      </div>

      {/* 统计概览 */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-number">{project.totalUnits}</div>
          <div className="stat-label">总套数</div>
        </div>
        <div className="stat-card sold">
          <div className="stat-number">{project.soldUnits}</div>
          <div className="stat-label">已售（网签+备案）</div>
        </div>
        <div className="stat-card unsold">
          <div className="stat-number">{unsold}</div>
          <div className="stat-label">可售</div>
        </div>
        <div className="stat-card rate">
          <div className="stat-number">{rate}%</div>
          <div className="stat-label">去化率</div>
        </div>
      </div>

      {/* 各楼栋概览 — 点击进入楼栋详情 */}
      <div style={{ padding: "0 16px 4px", fontSize: 14, fontWeight: 600, color: "#333" }}>
        🏢 楼栋分布
      </div>
      {buildings.map((b) => {
        const bSold = b.units.filter((u) => u.status === "已备案" || u.status === "已网签").length;
        const bTotal = b.units.length;
        const bRate = bTotal > 0 ? Math.round((bSold / bTotal) * 100) : 0;
        return (
          <div
            key={b.id}
            className="project-card"
            onClick={() => nav(`/project/${id}/building/${b.id}`)}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{b.name}</div>
                <div style={{ fontSize: 12, color: "#999", marginTop: 2 }}>
                  {b.type} · {b.floors}层 · {bTotal}套
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#1677ff" }}>
                  {bSold}/{bTotal}
                </div>
                <div style={{ fontSize: 12, color: "#999" }}>去化 {bRate}%</div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="safe-bottom" />
    </div>
  );
}
