import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import IntroLoader from "./components/IntroLoader";
import Home from "./pages/Home";
import About from "./pages/About";
import Categories from "./pages/Categories";
import CategoryPage from "./pages/CategoryPage";
import VideoPlayer from "./pages/VideoPlayer";
import "./App.css";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <Router>
      <ScrollToTop />
      {/* 1. Interactive Cursor Glow Ring */}
      <CustomCursor />

      {/* 2. Premium 5-Second Intro Loader */}
      {!loadingComplete ? (
        <IntroLoader onComplete={() => setLoadingComplete(true)} />
      ) : (
        <div className="flex flex-col min-h-screen bg-background text-slate-100 transition-opacity duration-700 ease-out">
          
          {/* 3. Sticky Glassmorphism Header */}
          <Navbar />

          {/* 4. SPA Main Content Frame */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/cooking" element={<CategoryPage />} />
              <Route path="/comedy" element={<CategoryPage />} />
              <Route path="/cartoon" element={<CategoryPage />} />
              <Route path="/games" element={<CategoryPage />} />
              <Route path="/fashion" element={<CategoryPage />} />
              <Route path="/video/:id" element={<VideoPlayer />} />
            </Routes>
          </main>

          {/* 5. Luxury Cinematic Footer */}
          <Footer />

        </div>
      )}
    </Router>
  );
}
