import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  GraduationCap,
  Calendar,
  BarChart3,
  Settings,
  ClipboardCheck,
  Bell,
  FileText,
  Award,
  Clock,
  UserCog,
  Building2,
  ScrollText,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useAuthStore from '../../store/useAuthStore';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { user } = useAuthStore();

  const categories = [
    { id: 'overview', name: 'OVERVIEW', icon: LayoutDashboard },
    { id: 'academic', name: 'ACADEMIC', icon: BookOpen },
    { id: 'people', name: 'PEOPLE', icon: Users },
    { id: 'system', name: 'SYSTEM', icon: Settings },
  ];

  const menuItems = [
    // Overview
    { category: 'overview', name: 'DASHBOARD', icon: LayoutDashboard, path: '/dashboard', allowedRoles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER'] },
    { category: 'overview', name: 'MY DASHBOARD', icon: LayoutDashboard, path: '/student-dashboard', allowedRoles: ['STUDENT'] },
    { category: 'overview', name: 'NOTIFICATIONS', icon: Bell, path: '/notifications', allowedRoles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER', 'STUDENT'] },
    { category: 'overview', name: 'ANALYTICS', icon: BarChart3, path: '/analytics', allowedRoles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER'] },

    // Academic
    { category: 'academic', name: 'COURSES', icon: BookOpen, path: '/courses', allowedRoles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER', 'STUDENT'] },
    { category: 'academic', name: 'MY COURSES', icon: BookOpen, path: '/my-courses', allowedRoles: ['STUDENT', 'TEACHER'] },
    { category: 'academic', name: 'SCHEDULES', icon: Calendar, path: '/schedules', allowedRoles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER', 'STUDENT'] },
    { category: 'academic', name: 'ATTENDANCE', icon: ClipboardCheck, path: '/attendance', allowedRoles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER', 'STUDENT'] },
    { category: 'academic', name: 'GRADES', icon: Award, path: '/grades', allowedRoles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER', 'STUDENT'] },
    { category: 'academic', name: 'ASSIGNMENTS', icon: FileText, path: '/assignments', allowedRoles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER', 'STUDENT'] },
    { category: 'academic', name: 'EXAMS', icon: ScrollText, path: '/exams', allowedRoles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER', 'STUDENT'] },

    // People
    { category: 'people', name: 'STUDENTS', icon: Users, path: '/students', allowedRoles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER'] },
    { category: 'people', name: 'TEACHERS', icon: UserCog, path: '/teachers', allowedRoles: ['SUPER_ADMIN', 'ADMIN'] },
    { category: 'people', name: 'CLASSES', icon: Building2, path: '/classes', allowedRoles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER'] },
    { category: 'people', name: 'DEPARTMENTS', icon: Building2, path: '/departments', allowedRoles: ['SUPER_ADMIN', 'ADMIN'] },

    // System
    { category: 'system', name: 'SETTINGS', icon: Settings, path: '/settings', allowedRoles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER', 'STUDENT'] },
    { category: 'system', name: 'REPORTS', icon: FileText, path: '/reports', allowedRoles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER'] },
    { category: 'system', name: 'ACTIVITY LOG', icon: Clock, path: '/activity-log', allowedRoles: ['SUPER_ADMIN', 'ADMIN'] },
  ];

  const filteredMenuItems = menuItems.filter(item => {
    // If no user or no role, show all items
    if (!user?.role) return true;
    // If user's role is in allowedRoles, show the item
    return item.allowedRoles.includes(user.role);
  });

  // If filtered items is empty, show all items (fallback)
  const displayMenuItems = filteredMenuItems.length > 0 ? filteredMenuItems : menuItems;

  // Determine active category based on current path
  const currentPathItem = displayMenuItems.find(item =>
    location.pathname === item.path || (location.pathname.startsWith(item.path) && item.path !== '/')
  );

  const [activeCategoryId, setActiveCategoryId] = useState(
    currentPathItem?.category || categories[0].id
  );

  // Sync active category with location changes ONLY when path changes
  const prevPathRef = React.useRef(location.pathname);
  React.useEffect(() => {
    if (location.pathname !== prevPathRef.current) {
      if (currentPathItem) {
        setActiveCategoryId(currentPathItem.category);
      }
      prevPathRef.current = location.pathname;
    }
  }, [location.pathname, currentPathItem]);

  const activeCategoryItems = displayMenuItems.filter(item => item.category === activeCategoryId);

  return (
    <>
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside
        className={`fixed left-0 top-[73px] z-50 h-[calc(100vh-73px)] flex w-72 bg-[#1E3A5F] border-r border-white/10 duration-500 ease-[0.22,1,0.36,1] lg:static lg:h-auto lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        {/* Category Icons Rail (Left) */}
        <div className="w-[72px] flex flex-col items-center py-6 border-r border-white/5 bg-[#1A2B4A]/50 relative z-20">
          {categories.map((cat) => {
            const isActive = activeCategoryId === cat.id;
            return (
              <button
                key={cat.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveCategoryId(cat.id);
                }}
                className={`relative w-full flex flex-col items-center py-4 transition-all duration-300 group cursor-pointer ${isActive ? 'text-sky-400' : 'text-white/60 hover:text-white'}`}
              >
                <cat.icon className={`w-5 h-5 mb-1 ${isActive ? 'scale-110' : 'scale-100 group-hover:scale-110'} transition-transform`} />
                <span className={`text-[9px] font-black tracking-tighter uppercase transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`}>
                  {cat.name}
                </span>

                {isActive && (
                  <>
                    <motion.div
                      layoutId="category-bg"
                      className="absolute inset-x-2 inset-y-2 bg-sky-500/10 rounded-xl -z-10"
                    />
                    <motion.div
                      layoutId="category-indicator"
                      className="absolute -left-px top-1/2 -translate-y-1/2 w-[2px] h-8 bg-sky-400 rounded-r-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                    />
                  </>
                )}
              </button>
            );
          })}
        </div>

        {/* Sub-menu Panel (Right) */}
        <div className="flex-1 overflow-y-auto no-scrollbar py-6 px-4 relative z-10">
          <div className="absolute top-0 left-0 w-full h-32 bg-radial-gradient from-sky-500/5 to-transparent pointer-events-none" />

          <div className="mb-2">
            <h3 className="text-[10px] font-black tracking-[0.5em] text-sky-400 uppercase px-4 mb-4">
              {categories.find(c => c.id === activeCategoryId)?.name}
            </h3>

            {/* Menu Items for Active Category */}
            <nav className="space-y-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategoryId}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 10, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeCategoryItems.length > 0 ? (
                    activeCategoryItems.map((item) => {
                      const isActive = location.pathname === item.path || (location.pathname.startsWith(item.path) && item.path !== '/');
                      return (
                        <Link
                          key={item.name + item.path}
                          to={item.path}
                          className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-all duration-300 ${isActive
                            ? 'bg-white/5 text-sky-400 border border-white/10 ring-1 ring-white/5'
                            : 'text-white/60 hover:text-white hover:bg-white/10 border border-transparent'
                            }`}
                        >
                          <item.icon className={`w-4 h-4 transition-colors ${isActive ? 'text-sky-400' : 'text-white/60 group-hover:text-sky-400/80'}`} />
                          <span className="text-[10px] font-bold tracking-widest uppercase truncate">{item.name}</span>

                          {isActive && (
                            <motion.div
                              layoutId="active-dot"
                              className="ml-auto w-1 h-1 rounded-full bg-sky-400"
                            />
                          )}
                        </Link>
                      );
                    })
                  ) : (
                    <div className="text-white/40 text-xs px-4 py-2">No items for this category</div>
                  )}
                </motion.div>
              </AnimatePresence>
            </nav>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;


