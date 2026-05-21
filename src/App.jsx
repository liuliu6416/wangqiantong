import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import ProjectDetail from "./pages/ProjectDetail";
import BuildingDetail from "./pages/BuildingDetail";

function Header() {
  const nav = useNavigate();
  const loc = useLocation();
  const isHome = loc.pathname === "/";

  return (
    <div className="app-header" style={{ position: "relative" }}>
      {!isHome && (
        <span className="back-btn" onClick={() => nav(-1)}>
          ← 返回
        </span>
      )}
      <h1>网签通</h1>
    </div>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/project/:id/building/:buildingId" element={<BuildingDetail />} />
      </Routes>
    </>
  );
}
