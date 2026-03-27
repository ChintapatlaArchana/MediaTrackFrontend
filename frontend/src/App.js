import { Routes, Route } from "react-router-dom";

import PlatformOperation from "./pages/operator/PlatformOperation";
import IngestPage from "./pages/operator/IngestPage";
import PackagingPage from "./pages/operator/PackagingPage";
import CDNPage from "./pages/operator/CDNPage";
import DRMPage from "./pages/operator/DRMPage";
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import ContentEditor from "./pages/editor/ContentEditor";
import ContentLibrary from "./pages/editor/ContentLibrary";
import ScheduleRelease from "./pages/editor/ScheduleRelease";
import UploadContent from "./pages/editor/UploadContent";
import QuickEditForm from "./components/editor/QuickEditForm"
import AdOpsManager from "./pages/AdOpsManager";
import CreateCampaign from "./pages/CreateCampaign";

import ViewReports from "./pages/ViewReports";
import AllCampaigns from "./pages/AllCampaigns";

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
      <Route
        path="/editor"
        element={<ContentEditor />}
      />
      <Route
        path="/editor/upload"
        element={<UploadContent />}
      />
      <Route
        path="/editor/schedule"
        element={<ScheduleRelease />}
      />
      <Route
        path="/editor/library"
        element={<ContentLibrary />}
      />
      <Route path="/titles/edit/:titleId" element={<QuickEditForm />} />
      <Route path="/adops" element={<AdOpsManager />} />
     
      
      {/* Campaign Routes */}
      <Route path="/campaigns/all" element={<AllCampaigns />} />
      <Route path="/campaigns/create" element={<CreateCampaign />} />
    
      <Route path="/reports/view" element={<ViewReports />} />

    </Routes>
  );
}

export default App;
