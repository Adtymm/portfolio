import { Route, Routes } from "react-router-dom";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import Home from "./pages/Home.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";

// Custom Project Pages
import BonsaiVision from "./components/project/BonsaiVision.jsx";
import Alerglow from "./components/project/Alerglow.jsx";
import WebsiteIAIF from "./components/project/WebsiteIAIF.jsx";
import Tidyroom from "./components/project/Tidyroom.jsx";
import Disperkim from "./components/project/Disperkim.jsx";

export default function App() {
  return (
    <>
      <div className="min-h-screen bg-black text-white relative flex flex-col items-center">
        <SmoothCursor />
        <div className="w-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Home />} />

            {/* Specific Project Routes */}
            <Route path="/project/bonsaivision" element={<BonsaiVision />} />
            <Route path="/project/alerglow" element={<Alerglow />} />
            <Route path="/project/iaif-uin-sgd" element={<WebsiteIAIF />} />
            <Route path="/project/tidyroom" element={<Tidyroom />} />
            <Route path="/project/disperkim" element={<Disperkim />} />

            {/* Generic Fallback */}
            <Route path="/project/:slug" element={<ProjectDetail />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

