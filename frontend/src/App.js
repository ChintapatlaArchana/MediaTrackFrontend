import { Routes, Route } from "react-router-dom";

import PlatformOperation from "./pages/operator/PlatformOperation";
import IngestPage from "./pages/operator/IngestPage";
import PackagingPage from "./pages/operator/PackagingPage";
import CDNPage from "./pages/operator/CDNPage";
import DRMPage from "./pages/operator/DRMPage";
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";

import OperatorLayout from "./components/operator/OperatorLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/operator" element={<PlatformOperation />} />
      <Route path="/home" element={<PlatformOperation />} />
      <Route path="/ingest" element={<IngestPage />} />
      <Route path="/packaging" element={<PackagingPage />} />
      <Route path="/cdn" element={<CDNPage />} />
      <Route path="/drm" element={<DRMPage />} />
    </Routes>
  );
}

export default App;
