import React from 'react';
import { User } from '../types';
import { Building2, LogOut, ShieldCheck, UserCheck, CalendarCheck, Home } from 'lucide-react';

interface NavbarProps {
  currentUser: User | null;
  currentView: string;
  adminTab: 'bookings' | 'rooms' | 'add-room' | 'users';
  onNavigate: (view: string) => void;
  onAdminTabChange: (tab: 'bookings' | 'rooms' | 'add-room' | 'users') => void;
  onLogout: () => void;
  onQuickLogin: (type: 'admin' | 'user') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  currentView,
  adminTab,
  onNavigate,
  onAdminTabChange,
  onLogout,
  onQuickLogin,
}) => {
  const isAdmin = currentUser?.type === 'Admin';

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-xs">
      {/* Quick Demo Switcher Top Ribbon */}
      <div className="bg-slate-900 text-slate-300 text-xs px-4 py-1.5 flex flex-wrap items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-white tracking-wide flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            HotelPro Live System
          </span>
          <span className="text-slate-400 hidden sm:inline">|</span>
          <span className="text-slate-400 hidden sm:inline">Complete Hotel Booking & Management Solution</span>
        </div>

        <div className="flex items-center gap-2 mt-1 sm:mt-0">
          <span className="text-slate-400 hidden md:inline">Quick Demo Switch:</span>
          <button
            onClick={() => onQuickLogin('admin')}
            className={`px-2.5 py-0.5 rounded text-xs font-medium transition-colors flex items-center gap-1 ${
              currentUser?.type === 'Admin'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Admin Demo (sun)
          </button>
          <button
            onClick={() => onQuickLogin('user')}
            className={`px-2.5 py-0.5 rounded text-xs font-medium transition-colors flex items-center gap-1 ${
              currentUser && currentUser.type !== 'Admin'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            Guest Demo (sid)
          </button>
        </div>
      </div>

      {/* Primary Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Brand matching Screenshot */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate(currentUser ? (isAdmin ? 'admin' : 'user-dashboard') : 'home')}
              className="flex items-center gap-2 group text-left"
            >
              <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:bg-blue-700 transition">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-slate-900 block leading-none">
                  {currentUser && !isAdmin ? 'SB Hotel' : 'RoomsForUse'}
                </span>
                <span className="text-[11px] font-medium text-blue-600 tracking-wide uppercase">
                  HotelPro Management
                </span>
              </div>
            </button>
          </div>

          {/* Right Header Navigation matching Screenshot */}
          <div className="flex items-center gap-3 sm:gap-6 text-sm font-medium">
            {!currentUser ? (
              // Public Visitor Links
              <>
                <button
                  onClick={() => onNavigate('home')}
                  className={`px-3 py-1.5 rounded-md transition-colors ${
                    currentView === 'home' || currentView === 'user-dashboard'
                      ? 'text-blue-600 font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => onNavigate('login')}
                  className={`px-3 py-1.5 rounded-md transition-colors ${
                    currentView === 'login'
                      ? 'text-blue-600 font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => onNavigate('register')}
                  className="px-4 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-xs"
                >
                  SignUp
                </button>
              </>
            ) : isAdmin ? (
              // Admin Links
              <>
                <span className="text-slate-700 font-medium">
                  Hi, <span className="font-semibold text-slate-900">{currentUser.name}</span>
                </span>
                <button
                  onClick={() => onNavigate('user-dashboard')}
                  className="hidden md:inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 bg-blue-50 px-2.5 py-1 rounded"
                >
                  <Home className="w-3.5 h-3.5" />
                  View Guest Site
                </button>
                <button
                  onClick={onLogout}
                  className="text-slate-600 hover:text-red-600 flex items-center gap-1 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              // Guest/User Links
              <>
                <span className="text-slate-700 font-medium hidden sm:inline">
                  Hi <span className="font-semibold text-slate-900">{currentUser.name}</span>
                </span>
                <button
                  onClick={() => onNavigate('user-dashboard')}
                  className={`px-3 py-1.5 rounded-md transition-colors ${
                    currentView === 'user-dashboard'
                      ? 'text-blue-600 font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Rooms
                </button>
                <button
                  onClick={() => onNavigate('my-bookings')}
                  className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
                    currentView === 'my-bookings'
                      ? 'text-blue-600 font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <CalendarCheck className="w-4 h-4 text-blue-600" />
                  My Bookings
                </button>
                <button
                  onClick={onLogout}
                  className="text-slate-600 hover:text-red-600 flex items-center gap-1 transition-colors ml-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Admin Tab Navigation Subheader (Screenshot 2 & 3: ALL BOOKINGS, ALL ROOMS, ADD ROOM, ALL USER) */}
      {currentUser && isAdmin && currentView === 'admin' && (
        <div className="bg-[#2f65b9] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-1 sm:space-x-8 overflow-x-auto py-2.5 text-xs sm:text-sm font-semibold tracking-wider uppercase">
              <button
                onClick={() => onAdminTabChange('bookings')}
                className={`px-3 py-1 rounded transition-colors whitespace-nowrap ${
                  adminTab === 'bookings'
                    ? 'bg-white/20 text-white shadow-xs'
                    : 'text-blue-100 hover:bg-white/10 hover:text-white'
                }`}
              >
                All Bookings
              </button>
              <button
                onClick={() => onAdminTabChange('rooms')}
                className={`px-3 py-1 rounded transition-colors whitespace-nowrap ${
                  adminTab === 'rooms'
                    ? 'bg-white/20 text-white shadow-xs'
                    : 'text-blue-100 hover:bg-white/10 hover:text-white'
                }`}
              >
                All Rooms
              </button>
              <button
                onClick={() => onAdminTabChange('add-room')}
                className={`px-3 py-1 rounded transition-colors whitespace-nowrap ${
                  adminTab === 'add-room'
                    ? 'bg-white/20 text-white shadow-xs'
                    : 'text-blue-100 hover:bg-white/10 hover:text-white'
                }`}
              >
                Add Room
              </button>
              <button
                onClick={() => onAdminTabChange('users')}
                className={`px-3 py-1 rounded transition-colors whitespace-nowrap ${
                  adminTab === 'users'
                    ? 'bg-white/20 text-white shadow-xs'
                    : 'text-blue-100 hover:bg-white/10 hover:text-white'
                }`}
              >
                All User
              </button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};
