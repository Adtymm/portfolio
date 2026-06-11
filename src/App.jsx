import { Route, Routes } from "react-router-dom";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import Home from "./pages/Home.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";
import BonsaiVision from "./components/project/BonsaiVision.jsx";

export default function App() {
  return (
    <>
      <div className="min-h-screen bg-black text-white relative flex flex-col items-center">
        <SmoothCursor />
        <div className="w-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Route spesifik BonsaiVision harus di atas /:slug agar tidak terambil generic */}
            <Route path="/project/bonsaivision" element={<BonsaiVision />} />
            <Route path="/project/:slug" element={<ProjectDetail />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

