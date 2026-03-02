import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Bell,
  User,
  Settings,
  LogOut,
  GraduationCap,
  Menu,
  X,
  Home,
  Users,
  BookOpen,
  BarChart3,
  ChevronDown,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useAuthStore from '../../store/useAuthStore';

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const userMenuRef = useRef(null);
  const notificationsRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navigation = [
    { id: 'dashboard', name: 'DASHBOARD', path: '/dashboard', icon: LayoutDashboard, allowedRoles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER'] },
    { id: 'dashboard', name: 'DASHBOARD', path: '/student-dashboard', icon: LayoutDashboard, allowedRoles: ['STUDENT'] },
    { id: 'students', name: 'STUDENTS', path: '/students', icon: Users, allowedRoles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER'] },
    { id: 'courses', name: 'COURSES', path: '/courses', icon: BookOpen, allowedRoles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER', 'STUDENT'] },
    { id: 'analytics', name: 'ANALYTICS', path: '/analytics', icon: BarChart3, allowedRoles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER'] },
  ];

  const filteredNav = navigation.filter(item => {
    if (!user?.role) return true;
    return item.allowedRoles.includes(user.role);
  });

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/login');
  };

  // Sample notifications
  const notifications = [
    { id: 1, title: 'New student registered', time: '2 min ago', read: false },
    { id: 2, title: 'Course assignment updated', time: '1 hour ago', read: false },
    { id: 3, title: 'Attendance report ready', time: '3 hours ago', read: true },
  ];
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <div className="flex items-center justify-between w-full h-[73px] px-4 md:px-6">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-xl text-white hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-sky-600 shadow-lg shadow-sky-500/20 group-hover:shadow-sky-500/40 transition-all duration-300">
              <GraduationCap size={20} className="text-white" />
            </div>
            <span className="hidden sm:block text-lg font-bold tracking-tight text-white">
              Student<span className="text-sky-400">MS</span>
            </span>
          </Link>
        </div>

        {/* Center Section - Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {filteredNav.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.id + item.path}
                to={item.path}
                className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all duration-300 ${
                  active
                    ? 'text-sky-400'
                    : 'text-white/80 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon size={14} className={active ? 'text-sky-400' : 'text-white/80'} />
                {item.name}
                {active && (
                  <motion.div
                    layoutId="header-nav-bg"
                    className="absolute inset-0 bg-sky-500/10 rounded-xl -z-10 border border-sky-500/20"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2.5 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-sky-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
              )}
            </button>

            <AnimatePresence>
              {notificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-3 w-80 bg-[#1a1a1a]/90 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50"
                >
                  <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
                    <h3 className="text-xs font-black tracking-widest text-sky-400 uppercase">Notifications</h3>
                    <span className="text-[10px] text-white/60">{unreadCount} new</span>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`px-5 py-4 hover:bg-white/5 transition-colors cursor-pointer border-b border-white/5 last:border-0 ${
                          !notif.read ? 'bg-sky-500/10' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {!notif.read && (
                            <div className="w-2 h-2 rounded-full bg-sky-400 mt-1.5 shrink-0" />
                          )}
                          <div className={!notif.read ? '' : 'ml-5'}>
                            <p className="text-xs font-medium text-white">{notif.title}</p>
                            <p className="text-[10px] text-white/60 mt-1">{notif.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-5 py-3 border-t border-white/10 bg-white/5">
                    <button className="text-[10px] font-bold uppercase tracking-widest text-sky-400 hover:underline">
                      View all notifications
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Menu */}
          {isAuthenticated && user ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/10 transition-all duration-200"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-500 to-sky-600 flex items-center justify-center shadow-lg">
                  <span className="text-xs font-black text-white">
                    {user.name?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                <span className="hidden xl:block text-xs font-bold text-white max-w-[100px] truncate">
                  {user.name || 'User'}
                </span>
                <ChevronDown size={14} className="hidden xl:block text-white" />
              </button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-3 w-56 bg-[#1a1a1a]/90 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50"
                  >
                    <div className="px-5 py-4 border-b border-white/10">
                      <p className="text-sm font-bold text-white truncate">{user.name || 'User'}</p>
                      <p className="text-xs text-white/60 truncate">{user.email || 'user@example.com'}</p>
                      <span className="inline-block mt-2 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider bg-sky-500/20 text-sky-400 rounded-lg">
                        {user.role || 'STUDENT'}
                      </span>
                    </div>
                    <div className="py-2">
                      <Link
                        to="/profile"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-3 px-5 py-3 text-xs text-white hover:bg-white/5 transition-all"
                      >
                        <User size={14} />
                        <span className="font-medium">Profile</span>
                      </Link>
                      <Link
                        to="/settings"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-3 px-5 py-3 text-xs text-white hover:bg-white/5 transition-all"
                      >
                        <Settings size={14} />
                        <span className="font-medium">Settings</span>
                      </Link>
                    </div>
                    <div className="py-2 border-t border-white/10">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-5 py-3 text-xs text-rose-400 hover:bg-rose-500/10 transition-all"
                      >
                        <LogOut size={14} />
                        <span className="font-medium">Log out</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-white hover:text-sky-400 transition-colors"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-xs font-black uppercase tracking-widest bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-colors shadow-lg shadow-sky-500/20"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
