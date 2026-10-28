import React from 'react';
import { Room } from '../types';
import { Building2, ShieldCheck, CalendarCheck, Users, BedDouble, ArrowRight, Star, Sparkles, CheckCircle2 } from 'lucide-react';

interface HomeViewProps {
  rooms: Room[];
  onNavigateToRooms: () => void;
  onNavigateToLogin: () => void;
  onNavigateToRegister: () => void;
  onQuickLogin: (role: 'admin' | 'user') => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  rooms,
  onNavigateToRooms,
  onNavigateToLogin,
  onNavigateToRegister,
  onQuickLogin,
}) => {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-900 via-blue-800 to-slate-900 text-white py-16 sm:py-24">
        {/* Subtle patterned backdrop */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-medium mb-6">
            <Sparkles className="w-3.5 h-3.5 text-blue-300" />
            <span>Modern Digital-First Hospitality Solution</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight">
            Your Ultimate <span className="text-blue-400">Hotel Management</span> & Booking Solution
          </h1>

          <p className="mt-6 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            HotelPro streamlines hotel operations with a secure, scalable backend, ensuring efficient booking, guest management, and payment processing with intuitive interfaces and robust authentication.
          </p>

          {/* Call to Actions */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onNavigateToRooms}
              className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg transition flex items-center gap-2 cursor-pointer"
            >
              <BedDouble className="w-4 h-4" />
              Explore Rooms & Book Now
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onQuickLogin('admin')}
              className="px-6 py-3 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-white font-semibold text-sm border border-slate-700 transition flex items-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Launch Admin Dashboard
            </button>
          </div>

          {/* Quick Stats Banner */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto pt-8 border-t border-white/10 text-center">
            <div>
              <div className="text-2xl font-bold text-white">100%</div>
              <div className="text-xs text-slate-400 mt-0.5">Real-time Availability</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">4.9 ★</div>
              <div className="text-xs text-slate-400 mt-0.5">Guest Satisfaction</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">Instant</div>
              <div className="text-xs text-slate-400 mt-0.5">Booking Confirmations</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">Zero</div>
              <div className="text-xs text-slate-400 mt-0.5">Double-booking Risk</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Rooms Showcase */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">RoomsForUse Selection</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">Featured Rooms & Suites</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Handcrafted for optimal comfort, quiet work environments, and luxury getaways.
            </p>
          </div>
          <button
            onClick={onNavigateToRooms}
            className="mt-4 sm:mt-0 text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            View All Rooms ({rooms.length}) <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {rooms.slice(0, 3).map((room) => (
            <div
              key={room.id}
              onClick={onNavigateToRooms}
              className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden cursor-pointer hover:shadow-lg transition group"
            >
              <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
                <img
                  src={room.images[0]}
                  alt={`Room ${room.roomNumber}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <span className="absolute top-3 left-3 bg-slate-900/80 text-white text-xs font-semibold px-2 py-0.5 rounded">
                  Room {room.roomNumber}
                </span>
                <span className="absolute top-3 right-3 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                  {room.type}
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-slate-900">Room Type: {room.type.toLowerCase()}</h3>
                  <span className="text-blue-600 font-bold text-sm">₹ {room.rentPerDay} / day</span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                  {room.description}
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                  <span className="text-slate-600 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-slate-400" /> Max: {room.capacity}
                  </span>
                  <span className="text-blue-600 font-semibold group-hover:translate-x-1 transition flex items-center gap-1">
                    Book Stay <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Hospitality Solutions Grid */}
      <section className="bg-white py-16 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Why Independent Properties & Chains Rely on HotelPro
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Built for growth and adaptability, supporting high booking volumes while maintaining performance and reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                <CalendarCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">Efficient Booking Management</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Seamless real-time inventory synchronization, instant check-in schedules, and automated cancellation controls.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">Robust Security & Privacy</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Prioritizing data privacy and compliance so every guest interaction and reservation detail is fully protected.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200">
              <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">Dual Persona Workflows</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tailored interfaces for guests booking their stay and administrators managing inventory, rooms, and registered users.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Conclusion matching the prompt text */}
      <footer className="bg-slate-900 text-slate-400 py-10 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
              <Building2 className="w-4 h-4" />
            </div>
            <span className="font-bold text-white text-base">HotelPro</span>
            <span className="text-slate-500">| Powered by Roomly</span>
          </div>

          <p className="text-center md:text-left text-slate-400 max-w-xl text-[11px] leading-relaxed">
            Roomly offers a comprehensive solution to optimize hotel operations with its secure backend and user-friendly interfaces, simplifying booking, guest management, and payment processing.
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onQuickLogin('admin')}
              className="text-slate-300 hover:text-white transition"
            >
              Admin Portal
            </button>
            <button
              onClick={onNavigateToRooms}
              className="text-slate-300 hover:text-white transition"
            >
              Book Room
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
