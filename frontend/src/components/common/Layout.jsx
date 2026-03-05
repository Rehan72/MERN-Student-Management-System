import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative h-screen flex flex-col bg-slate-100 dark:bg-slate-950 text-foreground font-sans selection:bg-indigo-500/30 selection:text-white antialiased overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full bg-slate-900 dark:bg-slate-950 border-b border-white/[0.06]">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </header>

      <div className="flex flex-1 overflow-hidden relative z-10">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main Content Area */}
        <div className="relative flex-1 flex flex-col overflow-y-auto overflow-x-hidden no-scrollbar bg-grid-pattern-light">
          {/* Subtle ambient glow in content area */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/[0.03] rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-500/[0.03] rounded-full blur-[100px] pointer-events-none" />
          
          <main className="relative flex-1 p-6 md:p-8 z-10">
            <div className="mx-auto max-w-screen-2xl">
              {children}
            </div>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-5 md:px-8 border-t border-white/[0.06] bg-slate-900 dark:bg-slate-950">
        <Footer />
      </footer>
    </div>
  );
}

export default Layout;
