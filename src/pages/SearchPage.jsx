import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SearchBar, Tag, SpinLoading } from "antd-mobile";
import { searchProjects, getAllRegions, getProjectCount, getTotalUnits, initData, isDataReady } from "../data/mockData";

export default function SearchPage() {
  const [keyword, setKeyword] = useState("");
  const [region, setRegion] = useState("全部");
  const [loading, setLoading] = useState(!isDataReady());
  const [ready, setReady] = useState(isDataReady());
  const nav = useNavigate();

  useEffect(() => {
    if (!isDataReady()) {
      initData().then(() => {
        setReady(true);
        setLoading(false);
      });
    }
  }, []);

  const regions = useMemo(() => (ready ? getAllRegions() : ["全部"]), [ready]);
  const results = useMemo(() => (ready ? searchProjects(keyword, region) : []), [keyword, region, ready]);

  const getStatusTag = (sold, total) => {
    if (total === 0) return <Tag color="default">待售</Tag>;
    if (sold >= total) return <Tag color="danger">售罄</Tag>;
    return <Tag color="primary">在售</Tag>;
  };

  if (loading) {
    return (
      <div className="empty-state" style={{ paddingTop: 80 }}>
        <SpinLoading style={{ "--size": "48px", "--color": "#1677ff" }} />
        <div style={{ marginTop: 20, fontSize: 14, color: "#999" }}>正在加载楼盘数据...</div>
        <div style={{ marginTop: 8, fontSize: 12, color: "#bbb" }}>数据来源：购房通</div>
      </div>
    );
  }

  return (
    <div>
      {/* 搜索区 */}
      <div className="search-section">
        <SearchBar
          placeholder="输入项目名称搜索"
          value={keyword}
          onChange={setKeyword}
          style={{ "--background": "#f5f6f8", "--border-radius": "8px" }}
        />
      </div>

      {/* 数据概览 */}
      <div className="stats-row" style={{ paddingBottom: 4 }}>
        <div className="stat-card">
          <div className="stat-number" style={{ color: "#1677ff" }}>{getProjectCount()}</div>
          <div className="stat-label">在售项目</div>
        </div>
        <div className="stat-card">
          <div className="stat-number" style={{ color: "#52c41a" }}>{regions.length - 1}</div>
          <div className="stat-label">覆盖区县</div>
        </div>
        <div className="stat-card">
          <div className="stat-number" style={{ color: "#ff7a45" }}>真实数据</div>
          <div className="stat-label">购房通同步</div>
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
                <span className="label">区域</span>
                <span>{p.region || "成都"}</span>
              </div>
              {p.priceRange && (
                <div className="project-info-row">
                  <span className="label">备案价</span>
                  <span style={{ color: "#ff7a45" }}>{p.priceRange} 元/㎡</span>
                </div>
              )}
              {p.views && (
                <div className="project-info-row">
                  <span className="label">热度</span>
                  <span>{p.views} 浏览</span>
                </div>
              )}
              <div className="project-tags">
                <Tag color="default" fill="outline">
                  {p.region}
                </Tag>
                <Tag color="default" fill="outline">
                  {p.buildings?.length || 0} 栋楼
                </Tag>
                <Tag color="default" fill="outline">
                  {p.totalUnits || 0} 套
                </Tag>
                {getStatusTag(p.soldUnits || 0, p.totalUnits || 0)}
                {p.totalUnits > 0 && (
                  <Tag color="warning" fill="outline">
                    去化 {Math.round((p.soldUnits / p.totalUnits) * 100)}%
                  </Tag>
                )}
              </div>
              {p.tags && p.tags.length > 0 && (
                <div style={{ marginTop: 8, display: "flex", gap: 4, flexWrap: "wrap" }}>
                  {p.tags.slice(0, 4).map((t, i) => (
                    <span key={i} style={{
                      fontSize: 10, padding: "1px 6px", borderRadius: 4,
                      background: "#f0f5ff", color: "#2f54eb"
                    }}>{t}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </>
      )}

      <div className="safe-bottom" />
    </div>
  );
}
