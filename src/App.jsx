import { BrowserRouter, Routes, Route } from "react-router-dom";

import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
// Footer kept for route stability; using new minimal footer
import SiteHeader from "./components/layout/SiteHeader.tsx";
import SiteFooter from "./components/layout/SiteFooter.tsx";
import ProjectDetail from "./components/ProjectDetail";
// Replaced floating ThemeToggle with header toggle
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-[rgb(var(--bg))] text-[rgb(var(--fg))] transition-colors">
          <SiteHeader />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <Projects />
                  <About />
                  <Skills />
                  <Contact />
                  <SiteFooter />
                </>
              }
            />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
