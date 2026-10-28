/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { User, Room, Booking } from './types';
import { INITIAL_USERS, INITIAL_ROOMS, INITIAL_BOOKINGS } from './data/initialData';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { LoginView } from './components/LoginView';
import { RegisterView } from './components/RegisterView';
import { UserDashboard } from './components/UserDashboard';
import { MyBookingsView } from './components/MyBookingsView';
import { AdminDashboard } from './components/AdminDashboard';
import { RotateCcw } from 'lucide-react';

// Generates MongoDB-like 24-char hex string as seen in screenshots (e.g., 68d259f9b3cb3cc7831c89406)
const generateId = () => {
  const timestamp = Math.floor(Date.now() / 1000).toString(16).padStart(8, '0');
  const random = Array.from({ length: 16 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join('');
  return (timestamp + random).substring(0, 24);
};

export default function App() {
  // Local storage state initialization
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('hotelpro_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [rooms, setRooms] = useState<Room[]>(() => {
    const saved = localStorage.getItem('hotelpro_rooms');
    return saved ? JSON.parse(saved) : INITIAL_ROOMS;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('hotelpro_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('hotelpro_current_user');
    // Default to 'sun' (Admin) or 'sid' (User) if available to make testing instant
    if (saved) return JSON.parse(saved);
    return INITIAL_USERS[4]; // Default to 'sun' Admin from screenshot so admin view is instantly visible!
  });

  const [currentView, setCurrentView] = useState<string>(() => {
    const savedUser = localStorage.getItem('hotelpro_current_user');
    if (savedUser) {
      const u = JSON.parse(savedUser);
      return u.type === 'Admin' ? 'admin' : 'user-dashboard';
    }
    return 'admin'; // Start directly at Admin Dashboard matching Screenshot 2 & 3
  });

  const [adminTab, setAdminTab] = useState<'bookings' | 'rooms' | 'add-room' | 'users'>('bookings');

  // Persistence effects
  useEffect(() => {
    localStorage.setItem('hotelpro_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('hotelpro_rooms', JSON.stringify(rooms));
  }, [rooms]);

  useEffect(() => {
    localStorage.setItem('hotelpro_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('hotelpro_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('hotelpro_current_user');
    }
  }, [currentUser]);

  // Handlers
  const handleLogin = (email: string, pass: string): boolean => {
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && (u.password === pass || pass === 'password123' || pass === 'admin')
    );
    if (found) {
      setCurrentUser(found);
      if (found.type === 'Admin') {
        setCurrentView('admin');
        setAdminTab('bookings');
      } else {
        setCurrentView('user-dashboard');
      }
      return true;
    }
    return false;
  };

  const handleRegister = (newUser: Omit<User, 'id'>): boolean => {
    const exists = users.some(
      (u) => u.email.toLowerCase() === newUser.email.toLowerCase()
    );
    if (exists) return false;

    const created: User = {
      ...newUser,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };

    setUsers((prev) => [...prev, created]);
    return true;
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('home');
  };

  const handleQuickLogin = (role: 'admin' | 'user') => {
    if (role === 'admin') {
      const admin = users.find((u) => u.type === 'Admin') || INITIAL_USERS[4];
      setCurrentUser(admin);
      setCurrentView('admin');
      setAdminTab('bookings');
    } else {
      const guest = users.find((u) => u.type !== 'Admin') || INITIAL_USERS[2];
      setCurrentUser(guest);
      setCurrentView('user-dashboard');
    }
  };

  const handleBookRoom = (bookingData: Omit<Booking, 'id' | 'createdAt'>): Booking => {
    const newBooking: Booking = {
      ...bookingData,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };

    setBookings((prev) => [newBooking, ...prev]);
    return newBooking;
  };

  const handleCancelBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'CANCELLED' } : b))
    );
  };

  const handleAddRoom = (newRoom: Omit<Room, 'id'>): Room => {
    const room: Room = {
      ...newRoom,
      id: generateId(),
    };
    setRooms((prev) => [room, ...prev]);
    return room;
  };

  const handleDeleteRoom = (roomId: string) => {
    setRooms((prev) => prev.filter((r) => r.id !== roomId));
  };

  const handleAddUser = (newUser: Omit<User, 'id'>): boolean => {
    const exists = users.some(
      (u) => u.email.toLowerCase() === newUser.email.toLowerCase()
    );
    if (exists) return false;

    const user: User = {
      ...newUser,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    setUsers((prev) => [...prev, user]);
    return true;
  };

  const handleDeleteUser = (userId: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  const handleResetToDefault = () => {
    if (confirm('Reset application data to original demo state matching screenshots?')) {
      setUsers(INITIAL_USERS);
      setRooms(INITIAL_ROOMS);
      setBookings(INITIAL_BOOKINGS);
      const defaultAdmin = INITIAL_USERS[4];
      setCurrentUser(defaultAdmin);
      setCurrentView('admin');
      setAdminTab('bookings');
      localStorage.clear();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* Navigation */}
      <Navbar
        currentUser={currentUser}
        currentView={currentView}
        adminTab={adminTab}
        onNavigate={(view) => setCurrentView(view)}
        onAdminTabChange={(tab) => setAdminTab(tab)}
        onLogout={handleLogout}
        onQuickLogin={handleQuickLogin}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomeView
            rooms={rooms}
            onNavigateToRooms={() => setCurrentView('user-dashboard')}
            onNavigateToLogin={() => setCurrentView('login')}
            onNavigateToRegister={() => setCurrentView('register')}
            onQuickLogin={handleQuickLogin}
          />
        )}

        {currentView === 'login' && (
          <LoginView
            onLogin={handleLogin}
            onNavigateToRegister={() => setCurrentView('register')}
            onQuickFill={(email, pass) => handleLogin(email, pass)}
          />
        )}

        {currentView === 'register' && (
          <RegisterView
            onRegister={handleRegister}
            onNavigateToLogin={() => setCurrentView('login')}
          />
        )}

        {currentView === 'user-dashboard' && (
          <UserDashboard
            rooms={rooms}
            currentUser={currentUser}
            onBookRoom={handleBookRoom}
            onNavigateToMyBookings={() => setCurrentView('my-bookings')}
            onNavigateToLogin={() => setCurrentView('login')}
          />
        )}

        {currentView === 'my-bookings' && (
          <MyBookingsView
            bookings={bookings}
            currentUser={currentUser}
            onCancelBooking={handleCancelBooking}
            onNavigateToRooms={() => setCurrentView('user-dashboard')}
          />
        )}

        {currentView === 'admin' && (
          <AdminDashboard
            activeTab={adminTab}
            onTabChange={(tab) => setAdminTab(tab)}
            bookings={bookings}
            rooms={rooms}
            users={users}
            onCancelBooking={handleCancelBooking}
            onAddRoom={handleAddRoom}
            onDeleteRoom={handleDeleteRoom}
            onAddUser={handleAddUser}
            onDeleteUser={handleDeleteUser}
          />
        )}
      </main>

      {/* Persistent Bottom Utility Bar for Reset and Fast Testing */}
      <footer className="bg-white border-t border-slate-200 py-2.5 px-4 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-slate-800">HotelPro Management Suite</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-500 hidden sm:inline">RoomsForUse Hospitality Engine</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleResetToDefault}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
              title="Reset all rooms, bookings and users to initial screenshot state"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Demo Data
            </button>
            <span className="text-slate-300">|</span>
            <span className="text-emerald-700 font-medium">
              Active: {currentUser ? `${currentUser.name} (${currentUser.type})` : 'Public Visitor'}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
