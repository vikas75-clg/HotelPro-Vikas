import React, { useState } from 'react';
import { Booking, User } from '../types';
import { Calendar, Phone, DollarSign, Ban, CheckCircle2, AlertTriangle, ArrowLeft } from 'lucide-react';

interface MyBookingsViewProps {
  bookings: Booking[];
  currentUser: User | null;
  onCancelBooking: (bookingId: string) => void;
  onNavigateToRooms: () => void;
}

export const MyBookingsView: React.FC<MyBookingsViewProps> = ({
  bookings,
  currentUser,
  onCancelBooking,
  onNavigateToRooms,
}) => {
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  // Filter bookings for current user (or show all user-relevant if sid)
  const userBookings = currentUser
    ? bookings.filter((b) => b.userId === currentUser.id || b.userName.toLowerCase() === currentUser.name.toLowerCase())
    : bookings;

  const handleConfirmCancel = (id: string) => {
    onCancelBooking(id);
    setCancellingId(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-slate-200 mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <button
                onClick={onNavigateToRooms}
                className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 font-medium"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Rooms
              </button>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">My Bookings</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Review and manage your room reservations. Total active reservations: {userBookings.filter(b => b.status === 'BOOKED').length}
            </p>
          </div>

          <button
            onClick={onNavigateToRooms}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold uppercase tracking-wider rounded-md shadow-xs transition"
          >
            + Book Another Room
          </button>
        </div>

        {/* Bookings List */}
        {userBookings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userBookings.map((b) => (
              <div
                key={b.id}
                className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md transition"
              >
                <div>
                  {/* Header: Room Type and Status Pill */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <h3 className="text-base font-bold text-slate-900">
                      {b.roomType}
                      <span className="text-xs font-normal text-slate-500 ml-1.5">(Room #{b.roomNumber})</span>
                    </h3>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider ${
                        b.status === 'BOOKED'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-red-500 text-white'
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>

                  {/* Details matching Screenshot 2 */}
                  <div className="space-y-2 text-xs text-slate-600">
                    <p className="font-mono text-[11px] text-slate-500 break-all">
                      <span className="font-semibold text-slate-700">Booking ID:</span> {b.id}
                    </p>
                    <p className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>
                        <strong className="text-slate-800">From:</strong> {b.fromDate}{' '}
                        <span className="text-slate-300">|</span>{' '}
                        <strong className="text-slate-800">To:</strong> {b.toDate} ({b.totalDays} Days)
                      </span>
                    </p>
                    <p className="flex items-center gap-2">
                      <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                      <span>
                        <strong className="text-slate-800">Total Amount:</strong>{' '}
                        <span className="text-slate-900 font-bold">₹{b.totalAmount}</span>
                      </span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>
                        <strong className="text-slate-800">Customer Phone:</strong> {b.customerPhone}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Cancel Action matching Screenshot 2 */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  {b.status === 'BOOKED' ? (
                    <button
                      onClick={() => setCancellingId(b.id)}
                      className="w-full py-1.5 px-4 border border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600 text-xs font-semibold uppercase tracking-wider rounded transition cursor-pointer"
                    >
                      CANCEL BOOKING
                    </button>
                  ) : (
                    <span className="text-xs text-slate-400 italic">Booking has been cancelled</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
            <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-slate-800">No Reservations Yet</h3>
            <p className="text-xs text-slate-500 mt-1 mb-6">
              You haven't made any hotel room bookings yet. Explore our rooms and suites to reserve your stay.
            </p>
            <button
              onClick={onNavigateToRooms}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs uppercase tracking-wider rounded-md shadow-xs transition"
            >
              Browse Rooms
            </button>
          </div>
        )}

        {/* Cancellation Confirmation Dialog */}
        {cancellingId && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 text-center">
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-3">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">Cancel Reservation?</h3>
              <p className="text-xs text-slate-600 mb-6">
                Are you sure you want to cancel this booking? This will update the status to CANCELLED in the system.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setCancellingId(null)}
                  className="flex-1 py-2 text-xs font-semibold text-slate-700 border border-slate-300 rounded hover:bg-slate-50"
                >
                  Keep Booking
                </button>
                <button
                  onClick={() => handleConfirmCancel(cancellingId)}
                  className="flex-1 py-2 text-xs font-semibold text-white bg-red-600 rounded hover:bg-red-700"
                >
                  Yes, Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
