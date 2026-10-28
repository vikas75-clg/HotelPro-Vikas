import React, { useState } from 'react';
import { Room, User, Booking } from '../types';
import {
  Users,
  Calendar,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Info,
  CheckCircle,
  Sparkles,
  Wifi,
  Tv,
  Coffee,
  Shield,
  Search,
  Filter,
  X,
} from 'lucide-react';

interface UserDashboardProps {
  rooms: Room[];
  currentUser: User | null;
  onBookRoom: (bookingData: Omit<Booking, 'id' | 'createdAt'>) => Booking;
  onNavigateToMyBookings: () => void;
  onNavigateToLogin: () => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({
  rooms,
  currentUser,
  onBookRoom,
  onNavigateToMyBookings,
  onNavigateToLogin,
}) => {
  const [selectedRoomForDetails, setSelectedRoomForDetails] = useState<Room | null>(null);
  const [bookingRoom, setBookingRoom] = useState<Room | null>(null);

  // Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('ALL');
  const [capacityFilter, setCapacityFilter] = useState<string>('ALL');

  // Booking Form State
  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const [fromDate, setFromDate] = useState(todayStr);
  const [toDate, setToDate] = useState(tomorrowStr);
  const [guestName, setGuestName] = useState(currentUser?.name || '');
  const [guestPhone, setGuestPhone] = useState(currentUser?.phone || '');
  const [paymentMethod, setPaymentMethod] = useState<'Card' | 'UPI' | 'Desk'>('UPI');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Active image index for rooms
  const [activeImageIndexes, setActiveImageIndexes] = useState<{ [roomId: string]: number }>({});

  const nextImage = (roomId: string, total: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndexes((prev) => ({
      ...prev,
      [roomId]: ((prev[roomId] || 0) + 1) % total,
    }));
  };

  const prevImage = (roomId: string, total: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndexes((prev) => ({
      ...prev,
      [roomId]: ((prev[roomId] || 0) - 1 + total) % total,
    }));
  };

  const calculateDays = () => {
    const start = new Date(fromDate);
    const end = new Date(toDate);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const handleStartBooking = (room: Room) => {
    if (!currentUser) {
      onNavigateToLogin();
      return;
    }
    setBookingRoom(room);
    setGuestName(currentUser.name);
    setGuestPhone(currentUser.phone || '');
    setConfirmedBooking(null);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingRoom || !currentUser) return;

    setIsProcessingPayment(true);

    const days = calculateDays();
    const totalAmount = days * bookingRoom.rentPerDay;

    setTimeout(() => {
      // Format dates as DD-MM-YYYY to match screenshots
      const formatToDDMMYYYY = (iso: string) => {
        const parts = iso.split('-');
        if (parts.length === 3) return `${parts[2]}-${parts[1]}-${parts[0]}`;
        return iso;
      };

      const newBooking = onBookRoom({
        roomNumber: bookingRoom.roomNumber,
        roomType: `${bookingRoom.type} Room`,
        roomId: bookingRoom.id,
        userId: currentUser.id,
        userName: guestName || currentUser.name,
        customerPhone: guestPhone || currentUser.phone,
        fromDate: formatToDDMMYYYY(fromDate),
        toDate: formatToDDMMYYYY(toDate),
        totalDays: days,
        totalAmount: totalAmount,
        status: 'BOOKED',
        paymentMethod: paymentMethod,
      });

      setIsProcessingPayment(false);
      setConfirmedBooking(newBooking);
    }, 1200);
  };

  // Filtered rooms
  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      room.roomNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.type.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType =
      typeFilter === 'ALL' ||
      (typeFilter === 'Delux' && room.type.toLowerCase().includes('delux')) ||
      (typeFilter === 'Ordinary' && (room.type.toLowerCase().includes('ordinary') || room.type.toLowerCase().includes('non-delux')));

    const matchesCapacity =
      capacityFilter === 'ALL' ||
      (capacityFilter === '1' && room.capacity === 1) ||
      (capacityFilter === '2' && room.capacity === 2) ||
      (capacityFilter === '3+' && room.capacity >= 3);

    return matchesSearch && matchesType && matchesCapacity;
  });

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      {/* Subheader / breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Available Rooms & Suites</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Welcome to Roomly at HotelPro. Real-time availability, instant confirmations.
            </p>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search rooms..."
                className="pl-8 pr-3 py-1.5 text-xs bg-slate-100 rounded-md border border-slate-200 focus:outline-hidden focus:ring-1 focus:ring-blue-500 w-36 sm:w-44"
              />
            </div>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="text-xs px-2.5 py-1.5 bg-slate-100 rounded-md border border-slate-200 text-slate-700"
            >
              <option value="ALL">All Types</option>
              <option value="Delux">Delux</option>
              <option value="Ordinary">Ordinary</option>
            </select>

            <select
              value={capacityFilter}
              onChange={(e) => setCapacityFilter(e.target.value)}
              className="text-xs px-2.5 py-1.5 bg-slate-100 rounded-md border border-slate-200 text-slate-700"
            >
              <option value="ALL">All Capacities</option>
              <option value="1">1 Person</option>
              <option value="2">2 People</option>
              <option value="3+">3+ People</option>
            </select>
          </div>
        </div>
      </div>

      {/* Room Listing Grid matching Screenshot 1 & 2 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room) => {
            const currentImgIndex = activeImageIndexes[room.id] || 0;
            const images = room.images && room.images.length > 0
              ? room.images
              : ['https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80'];

            return (
              <div
                key={room.id}
                className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden flex flex-col hover:shadow-lg transition-shadow"
              >
                {/* Photo with Carousel controls */}
                <div className="relative aspect-16/10 bg-slate-100 overflow-hidden group">
                  <img
                    src={images[currentImgIndex]}
                    alt={`Room ${room.roomNumber}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Room Number & Badge */}
                  <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-xs font-semibold px-2.5 py-1 rounded-md">
                    Room {room.roomNumber}
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className="bg-emerald-600 text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-xs uppercase">
                      {room.type}
                    </span>
                  </div>

                  {images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => prevImage(room.id, images.length, e)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/80 hover:bg-white text-slate-800 rounded-full flex items-center justify-center shadow-md transition"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => nextImage(room.id, images.length, e)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/80 hover:bg-white text-slate-800 rounded-full flex items-center justify-center shadow-md transition"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                      <div className="absolute bottom-2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/40 px-2 py-0.5 rounded-full">
                        {images.map((_, i) => (
                          <div
                            key={i}
                            className={`w-1.5 h-1.5 rounded-full transition-all ${
                              i === currentImgIndex ? 'bg-white w-3' : 'bg-white/50'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Details matching Screenshot 1 exactly */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">
                      Room Type: <span className="font-semibold text-slate-800">{room.type.toLowerCase()}</span>
                    </h3>

                    <div className="space-y-1.5 text-xs text-slate-600 mb-4">
                      <p className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-medium text-slate-700">Room Capacity:</span> {room.capacity} {room.capacity === 1 ? 'Person' : 'People'}
                      </p>
                      <p className="flex items-center gap-1.5 font-medium text-slate-900">
                        <span className="text-blue-600 font-bold text-sm">Rent: ₹ {room.rentPerDay}</span>
                        <span className="text-slate-500 font-normal">per day</span>
                      </p>
                      <p className="text-slate-600">
                        <span className="font-medium text-slate-700">Type:</span> {room.type.toLowerCase()}
                      </p>
                      <p className="text-slate-500 text-xs line-clamp-2 mt-2 leading-relaxed">
                        <span className="font-medium text-slate-700">Description:</span> {room.description}
                      </p>
                    </div>
                  </div>

                  {/* Action buttons matching screenshot */}
                  <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={() => setSelectedRoomForDetails(room)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs tracking-wider uppercase rounded shadow-xs transition"
                    >
                      LEARN MORE
                    </button>
                    <button
                      onClick={() => handleStartBooking(room)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs tracking-wider uppercase rounded shadow-xs transition ml-auto flex items-center gap-1"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      BOOK NOW
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredRooms.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
            <Building2Icon className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-slate-800">No rooms match your filter</h3>
            <p className="text-xs text-slate-500 mt-1">Try resetting your filter parameters or search terms.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setTypeFilter('ALL');
                setCapacityFilter('ALL');
              }}
              className="mt-4 px-3 py-1.5 bg-blue-600 text-white text-xs rounded font-medium"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* LEARN MORE Modal */}
      {selectedRoomForDetails && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            <div className="relative aspect-16/9 bg-slate-900">
              <img
                src={selectedRoomForDetails.images[0] || 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80'}
                alt={`Room ${selectedRoomForDetails.roomNumber}`}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedRoomForDetails(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-xs px-3 py-1.5 rounded-lg text-white">
                <span className="text-lg font-bold">Room {selectedRoomForDetails.roomNumber}</span>
                <span className="ml-2 text-xs text-blue-300 font-semibold uppercase">{selectedRoomForDetails.type}</span>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-4">
                <div>
                  <span className="text-2xl font-bold text-slate-900">₹ {selectedRoomForDetails.rentPerDay}</span>
                  <span className="text-xs text-slate-500 ml-1">/ night</span>
                </div>
                <div className="text-xs font-semibold px-2.5 py-1 rounded bg-blue-50 text-blue-700 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  Max Capacity: {selectedRoomForDetails.capacity} Guests
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">Description</h4>
                <p className="text-sm text-slate-700 leading-relaxed">{selectedRoomForDetails.description}</p>
              </div>

              {/* Amenities */}
              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-3">Room Highlights & Amenities</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {(selectedRoomForDetails.amenities || [
                    'Air Conditioning',
                    'High Speed Wi-Fi',
                    'HD TV',
                    'Room Service',
                    '24/7 Hot Water',
                    'Ensuite Bathroom',
                  ]).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-700">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image previews */}
              {selectedRoomForDetails.images && selectedRoomForDetails.images.length > 1 && (
                <div className="mb-6">
                  <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">Photo Gallery</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {selectedRoomForDetails.images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt="Room view"
                        className="h-20 w-full object-cover rounded-md border border-slate-200"
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  onClick={() => setSelectedRoomForDetails(null)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold rounded-md"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const r = selectedRoomForDetails;
                    setSelectedRoomForDetails(null);
                    handleStartBooking(r);
                  }}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold uppercase tracking-wider rounded-md shadow-xs"
                >
                  Proceed to Book
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BOOKING MODAL */}
      {bookingRoom && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[95vh] overflow-y-auto shadow-2xl border border-slate-200">
            {confirmedBooking ? (
              // Confirmation Screen
              <div className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-1">Reservation Confirmed!</h3>
                <p className="text-xs text-slate-500 mb-6">
                  Your booking has been registered and verified in the HotelPro system.
                </p>

                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-left text-xs space-y-2 mb-6">
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">Booking ID:</span>
                    <span className="font-mono font-semibold text-blue-600">{confirmedBooking.id}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">Room:</span>
                    <span className="font-semibold text-slate-900">Room {confirmedBooking.roomNumber} ({confirmedBooking.roomType})</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">Guest:</span>
                    <span className="font-semibold text-slate-900">{confirmedBooking.userName}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">Dates:</span>
                    <span className="font-semibold text-slate-900">{confirmedBooking.fromDate} to {confirmedBooking.toDate} ({confirmedBooking.totalDays} Days)</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">Total Paid:</span>
                    <span className="font-bold text-emerald-700 text-sm">₹ {confirmedBooking.totalAmount}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      setBookingRoom(null);
                      setConfirmedBooking(null);
                      onNavigateToMyBookings();
                    }}
                    className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs uppercase tracking-wider rounded-md"
                  >
                    View in My Bookings
                  </button>
                  <button
                    onClick={() => {
                      setBookingRoom(null);
                      setConfirmedBooking(null);
                    }}
                    className="flex-1 px-4 py-2.5 border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold text-xs uppercase tracking-wider rounded-md"
                  >
                    Book Another Room
                  </button>
                </div>
              </div>
            ) : (
              // Booking Form
              <div>
                <div className="bg-[#2f65b9] text-white p-4 flex items-center justify-between rounded-t-2xl">
                  <div>
                    <h3 className="font-bold text-base">Book Room {bookingRoom.roomNumber}</h3>
                    <p className="text-xs text-blue-100">{bookingRoom.type} Room • ₹ {bookingRoom.rentPerDay} / day</p>
                  </div>
                  <button
                    onClick={() => setBookingRoom(null)}
                    className="text-white/80 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleConfirmBooking} className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Check-in Date</label>
                      <input
                        type="date"
                        value={fromDate}
                        min={todayStr}
                        onChange={(e) => setFromDate(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Check-out Date</label>
                      <input
                        type="date"
                        value={toDate}
                        min={fromDate || todayStr}
                        onChange={(e) => setToDate(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Guest Full Name</label>
                    <input
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="e.g. sid"
                      className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Customer Phone</label>
                    <input
                      type="tel"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      placeholder="e.g. 9704927807"
                      className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
                      required
                    />
                  </div>

                  {/* Payment Method Selector */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Payment Method</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('UPI')}
                        className={`p-2.5 rounded-lg border text-xs font-medium text-center transition ${
                          paymentMethod === 'UPI'
                            ? 'border-blue-600 bg-blue-50 text-blue-700'
                            : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        UPI / QR
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('Card')}
                        className={`p-2.5 rounded-lg border text-xs font-medium text-center transition ${
                          paymentMethod === 'Card'
                            ? 'border-blue-600 bg-blue-50 text-blue-700'
                            : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        Credit Card
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('Desk')}
                        className={`p-2.5 rounded-lg border text-xs font-medium text-center transition ${
                          paymentMethod === 'Desk'
                            ? 'border-blue-600 bg-blue-50 text-blue-700'
                            : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        Pay at Desk
                      </button>
                    </div>
                  </div>

                  {/* Price Calculation Summary */}
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-xs space-y-1.5">
                    <div className="flex justify-between text-slate-600">
                      <span>Rate per Day:</span>
                      <span>₹ {bookingRoom.rentPerDay}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Total Duration:</span>
                      <span>{calculateDays()} Days</span>
                    </div>
                    <div className="flex justify-between font-bold text-slate-900 border-t border-slate-200 pt-1.5 text-sm">
                      <span>Total Amount:</span>
                      <span className="text-blue-700">₹ {calculateDays() * bookingRoom.rentPerDay}</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isProcessingPayment}
                      className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-md shadow-xs transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isProcessingPayment ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Processing Booking...
                        </>
                      ) : (
                        `CONFIRM & PAY ₹ ${calculateDays() * bookingRoom.rentPerDay}`
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

function Building2Icon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  );
}
