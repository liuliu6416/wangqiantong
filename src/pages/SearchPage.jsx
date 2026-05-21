import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { SearchBar, Tag } from "antd-mobile";
import { searchProjects, getAllRegions, getProjectCount, getTotalUnits } from "../data/mockData";

export default function SearchPage() {
  const [keyword, setKeyword] = useState("");
  const [region, setRegion] = useState("全部");
  const nav = useNavigate();

  const regions = useMemo(() => getAllRegions(), []);
  const results = useMemo(() => searchProjects(keyword, region), [keyword, region]);

  const getStatusTag = (sold, total) => {
    if (sold === 0) return <Tag color="default">待售</Tag>;
    if (sold >= total) return <Tag color="danger">售罄</Tag>;
    return <Tag color="primary">在售</Tag>;
  };

  return (
    <div>
      {/* 搜索区 */}
      <div className="search-section">
        <SearchBar
          placeholder="输入项目备案名称或案名搜索"
          value={keyword}
          onChange={setKeyword}
          style={{ "--background": "#f5f6f8", "--border-radius": "8px" }}
        />
      </div>

      {/* 数据概览 */}
      <div className="stats-row" style={{ paddingBottom: 4 }}>
        <div className="stat-card">
          <div className="stat-number" style={{ color: "#1677ff" }}>{getProjectCount()}</div>
          <div className="stat-label">入库项目</div>
        </div>
        <div className="stat-card">
          <div className="stat-number" style={{ color: "#52c41a" }}>{regions.length - 1}</div>
          <div className="stat-label">覆盖区县</div>
        </div>
        <div className="stat-card">
          <div className="stat-number" style={{ color: "#ff7a45" }}>{(getTotalUnits() / 10000).toFixed(1)}万</div>
          <div className="stat-label">房源总数</div>
        </div>
      </div>

      {/* 区域筛选 */}
      <div className="building-tabs" style={{ marginTop: 0 }}>
        {regions.map((r) => (
          <div
            key={r}
            className={`building-tab ${r === region ? "active" : ""}`}
            onClick={() => setRegion(r)}
          >
            {r}
          </div>
        ))}
      </div>

      {/* 结果列表 */}
      {results.length === 0 ? (
        <div className="empty-state">
          <div className="icon">🔍</div>
          <div>未找到匹配的项目</div>
          <div style={{ fontSize: 12, marginTop: 8 }}>试试调整搜索条件或切换区域</div>
        </div>
      ) : (
        <>
          <div style={{ padding: "12px 16px 0", fontSize: 13, color: "#999" }}>
            {region !== "全部" ? `${region} · ` : ""}共 {results.length} 个项目
          </div>
          {results.map((p) => (
            <div
              key={p.id}
              className="project-card"
              onClick={() => nav(`/project/${p.id}`)}
            >
              <div className="project-name">{p.name}</div>
              <div className="project-info-row">
                <span className="label">备案名</span>
                <span>{p.recordName}</span>
              </div>
              <div className="project-info-row">
                <span className="label">预售证</span>
                <span>{p.presaleNumber}</span>
              </div>
              <div className="project-info-row">
                <span className="label">开发商</span>
                <span>{p.developer}</span>
              </div>
              <div className="project-info-row">
                <span className="label">地址</span>
                <span>{p.address}</span>
              </div>
              <div className="project-tags">
                <Tag color="default" fill="outline">
                  {p.region}
                </Tag>
                <Tag color="default" fill="outline">
                  {p.buildings.length} 栋楼
                </Tag>
                <Tag color="default" fill="outline">
                  {p.totalUnits} 套
                </Tag>
                {getStatusTag(p.soldUnits, p.totalUnits)}
                <Tag color="warning" fill="outline">
                  去化 {p.totalUnits > 0 ? Math.round((p.soldUnits / p.totalUnits) * 100) : 0}%
                </Tag>
              </div>
            </div>
          ))}
        </>
      )}

      <div className="safe-bottom" />
    </div>
  );
}
