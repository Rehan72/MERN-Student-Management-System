import React, { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { motion } from "framer-motion";


function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative h-screen flex flex-col bg-[#F4F6F9] text-foreground font-sans selection:bg-sky-500/30 selection:text-white antialiased overflow-hidden">
      <header className="sticky top-0 z-40 w-full bg-[#1A2B4A] border-b border-white/10 backdrop-blur-3xl">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </header>

      <div className="flex flex-1 overflow-hidden relative z-10">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main Content Area */}
        <div className="relative flex-1 flex flex-col overflow-y-auto overflow-x-hidden no-scrollbar">
          <main className="relative flex-1 p-6 md:p-10 z-10">
            <div className="mx-auto max-w-screen-2xl">
              {children}
            </div>
          </main>
        </div>
      </div>
      {/* Footer */}
      <footer className="relative z-10 px-6 py-8 md:px-10 border-t border-white/10 bg-[#2D3748] backdrop-blur-xl mt-auto">
        <Footer />
      </footer>
    </div>
  );
}

export default Layout;
