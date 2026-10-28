import React, { useState } from 'react';
import { Room, Booking, User, RoomType, UserRole } from '../types';
import {
  Calendar,
  Phone,
  DollarSign,
  Plus,
  Trash2,
  Users,
  Building,
  CheckCircle,
  AlertTriangle,
  Search,
  Image as ImageIcon,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

interface AdminDashboardProps {
  activeTab: 'bookings' | 'rooms' | 'add-room' | 'users';
  onTabChange: (tab: 'bookings' | 'rooms' | 'add-room' | 'users') => void;
  bookings: Booking[];
  rooms: Room[];
  users: User[];
  onCancelBooking: (bookingId: string) => void;
  onAddRoom: (newRoom: Omit<Room, 'id'>) => Room;
  onDeleteRoom: (roomId: string) => void;
  onAddUser: (newUser: Omit<User, 'id'>) => boolean;
  onDeleteUser: (userId: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  activeTab,
  onTabChange,
  bookings,
  rooms,
  users,
  onCancelBooking,
  onAddRoom,
  onDeleteRoom,
  onAddUser,
  onDeleteUser,
}) => {
  // Booking Filters
  const [bookingFilterStatus, setBookingFilterStatus] = useState<string>('ALL');
  const [bookingSearch, setBookingSearch] = useState('');

  // Add Room Form State matching Screenshot 3
  const [roomNumber, setRoomNumber] = useState('');
  const [capacity, setCapacity] = useState('');
  const [rentPerDay, setRentPerDay] = useState('');
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');
  const [roomType, setRoomType] = useState<'Delux' | 'Non-Delux'>('Delux');
  const [roomDescription, setRoomDescription] = useState('');
  const [addRoomSuccess, setAddRoomSuccess] = useState(false);
  const [addRoomError, setAddRoomError] = useState('');

  // Add User Form Modal State
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPhone, setNewUserPhone] = useState('');
  const [newUserRole, setNewUserRole] = useState<UserRole>('Ordinary');
  const [userSearch, setUserSearch] = useState('');

  // Handle Add Room submission
  const handleAddRoomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAddRoomError('');

    if (!roomNumber.trim() || !capacity || !rentPerDay || !roomDescription.trim()) {
      setAddRoomError('Please fill in all required room details.');
      return;
    }

    const images = [image1.trim(), image2.trim(), image3.trim()].filter(Boolean);
    if (images.length === 0) {
      // Default luxury room image if none provided
      images.push('https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80');
    }

    onAddRoom({
      roomNumber: roomNumber.trim(),
      capacity: parseInt(capacity, 10) || 1,
      rentPerDay: parseFloat(rentPerDay) || 1000,
      type: roomType,
      description: roomDescription.trim(),
      images: images,
      isAvailable: true,
    });

    setAddRoomSuccess(true);
    // Reset form
    setRoomNumber('');
    setCapacity('');
    setRentPerDay('');
    setImage1('');
    setImage2('');
    setImage3('');
    setRoomDescription('');

    setTimeout(() => {
      setAddRoomSuccess(false);
      onTabChange('rooms');
    }, 1500);
  };

  // Quick Preset fillers for testing
  const loadPresetRoom = (preset: 'penthouse' | 'suite' | 'standard') => {
    if (preset === 'penthouse') {
      setRoomNumber('205');
      setCapacity('4');
      setRentPerDay('3200');
      setImage1('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80');
      setImage2('https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80');
      setImage3('https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1000&q=80');
      setRoomType('Delux');
      setRoomDescription('Executive luxury penthouse suite with panoramic horizon views, private jacuzzi, and butler service.');
    } else if (preset === 'suite') {
      setRoomNumber('108');
      setCapacity('2');
      setRentPerDay('1800');
      setImage1('https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80');
      setImage2('https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=80');
      setImage3('');
      setRoomType('Delux');
      setRoomDescription('Contemporary boutique deluxe room with king bed, marble ensuite bathroom, and dedicated workspace.');
    } else {
      setRoomNumber('109');
      setCapacity('1');
      setRentPerDay('950');
      setImage1('https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&w=1000&q=80');
      setImage2('');
      setImage3('');
      setRoomType('Non-Delux');
      setRoomDescription('Welcome to Roomly. Compact and clean non-deluxe room with comfortable single bed, Wi-Fi, and air cooler.');
    }
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim() || !newUserPhone.trim()) return;

    const ok = onAddUser({
      name: newUserName.trim(),
      email: newUserEmail.trim(),
      phone: newUserPhone.trim(),
      type: newUserRole,
      password: 'password123',
    });

    if (ok) {
      setIsAddUserModalOpen(false);
      setNewUserName('');
      setNewUserEmail('');
      setNewUserPhone('');
    } else {
      alert('A user with this email already exists.');
    }
  };

  // Filtered Bookings
  const filteredBookings = bookings.filter((b) => {
    const matchesStatus =
      bookingFilterStatus === 'ALL' || b.status === bookingFilterStatus;
    const matchesSearch =
      b.id.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.customerPhone.includes(bookingSearch) ||
      b.userName.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.roomNumber.includes(bookingSearch);

    return matchesStatus && matchesSearch;
  });

  // Filtered Users
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.phone.includes(userSearch) ||
      u.id.toLowerCase().includes(userSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* ========================================================= */}
        {/* TAB 1: ALL BOOKINGS (Matching Screenshot 2)              */}
        {/* ========================================================= */}
        {activeTab === 'bookings' && (
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800">My Bookings</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  The Admin Dashboard consists of multiple fields. Real-time reservation status and guest details.
                </p>
              </div>

              {/* Status and Search filters */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={bookingSearch}
                    onChange={(e) => setBookingSearch(e.target.value)}
                    placeholder="Search ID or phone..."
                    className="pl-8 pr-3 py-1.5 text-xs bg-white rounded-md border border-slate-300 w-44"
                  />
                </div>
                <select
                  value={bookingFilterStatus}
                  onChange={(e) => setBookingFilterStatus(e.target.value)}
                  className="text-xs px-2.5 py-1.5 bg-white rounded-md border border-slate-300 text-slate-700 font-medium"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="BOOKED">Booked</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Grid of Cards matching Screenshot 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredBookings.map((b) => (
                <div
                  key={b.id}
                  className="bg-white rounded-lg shadow-xs border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md transition"
                >
                  <div>
                    {/* Header: Room Type and Status Pill */}
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-base font-bold text-slate-900">
                        {b.roomType}
                      </h3>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase ${
                          b.status === 'BOOKED'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-red-500 text-white'
                        }`}
                      >
                        {b.status}
                      </span>
                    </div>

                    {/* Details matching Screenshot 2 */}
                    <div className="space-y-1.5 text-xs text-slate-600">
                      <p className="font-mono text-[11px] text-slate-500 break-all">
                        <strong className="text-slate-800">Booking ID:</strong> {b.id}
                      </p>
                      <p>
                        <strong className="text-slate-800">From:</strong> {b.fromDate}{' '}
                        <strong className="text-slate-800 ml-2">To:</strong> {b.toDate}
                      </p>
                      <p>
                        <strong className="text-slate-800">Total Amount:</strong> ${b.totalAmount}
                      </p>
                      <p>
                        <strong className="text-slate-800">Customer Phone:</strong> {b.customerPhone}
                      </p>
                      <p className="text-slate-400 text-[11px]">
                        Guest Name: <span className="text-slate-600 font-medium">{b.userName}</span>
                      </p>
                    </div>
                  </div>

                  {/* Cancel Button matching Screenshot 2 */}
                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                    {b.status === 'BOOKED' ? (
                      <button
                        onClick={() => onCancelBooking(b.id)}
                        className="w-full py-1 px-4 border border-red-500 text-red-500 hover:bg-red-50 text-xs font-semibold uppercase tracking-wider rounded transition"
                      >
                        CANCEL BOOKING
                      </button>
                    ) : (
                      <span className="w-full text-center text-xs text-slate-400 py-1 italic">
                        Cancelled
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Total Bookings indicator matching Screenshot 2 */}
            <div className="text-center pt-2">
              <span className="text-xs font-bold text-slate-600">
                Total Bookings: {filteredBookings.length}
              </span>
            </div>
          </section>
        )}

        {/* ========================================================= */}
        {/* TAB 2: ALL ROOMS (Matching Screenshot 2)                 */}
        {/* ========================================================= */}
        {activeTab === 'rooms' && (
          <section className="space-y-4">
            <div>
              <h2 className="text-base font-bold text-slate-800">All rooms :</h2>
              <p className="text-xs text-slate-500">This showcases the available rooms.</p>
            </div>

            {/* Table Container Card with Blue Header Bar */}
            <div className="bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden">
              {/* Blue Header Bar matching Screenshot 2 */}
              <div className="bg-[#2f65b9] text-white px-6 py-3.5 flex items-center justify-between">
                <h3 className="font-bold text-sm sm:text-base">Hotel Room Booking History</h3>
                <span className="text-xs font-semibold bg-white/20 px-2.5 py-0.5 rounded-full">
                  Total Rooms: {rooms.length}
                </span>
              </div>

              {/* Rooms Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="px-5 py-3 font-semibold">Room ID</th>
                      <th className="px-5 py-3 font-semibold">Room Number</th>
                      <th className="px-5 py-3 font-semibold">Capacity</th>
                      <th className="px-5 py-3 font-semibold">Rent / Day</th>
                      <th className="px-5 py-3 font-semibold">Type</th>
                      <th className="px-5 py-3 font-semibold">Description</th>
                      <th className="px-5 py-3 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {rooms.map((room) => (
                      <tr key={room.id} className="hover:bg-slate-50/70 transition">
                        <td className="px-5 py-3.5 font-mono text-[11px] text-slate-500">
                          {room.id}
                        </td>
                        <td className="px-5 py-3.5 font-semibold text-slate-900">
                          {room.roomNumber}
                        </td>
                        <td className="px-5 py-3.5">{room.capacity}</td>
                        <td className="px-5 py-3.5 font-medium">₹ {room.rentPerDay}</td>
                        <td className="px-5 py-3.5">
                          <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                            {room.type}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-slate-600 max-w-xs truncate" title={room.description}>
                          {room.description}
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete Room ${room.roomNumber}?`)) {
                                onDeleteRoom(room.id);
                              }
                            }}
                            className="p-1 text-slate-400 hover:text-red-600 transition"
                            title="Delete Room"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================= */}
        {/* TAB 3: ADD ROOM (Matching Screenshot 3)                  */}
        {/* ========================================================= */}
        {activeTab === 'add-room' && (
          <section className="space-y-4">
            <div>
              <h2 className="text-base font-bold text-slate-800">Add rooms :</h2>
              <p className="text-xs text-slate-500">Adding the rooms which are available.</p>
            </div>

            {/* Card with Blue Header Bar matching Screenshot 3 */}
            <div className="bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden max-w-3xl mx-auto">
              <div className="bg-[#2f65b9] text-white px-6 py-3.5 text-center">
                <h3 className="font-bold text-base">Add a New Room</h3>
              </div>

              <div className="p-6 sm:p-8">
                {/* Preset quick buttons */}
                <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-blue-900 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    Fill Sample Template:
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => loadPresetRoom('penthouse')}
                      className="px-2.5 py-1 text-xs bg-white text-blue-700 font-medium rounded border border-blue-300 hover:bg-blue-100"
                    >
                      Penthouse Suite
                    </button>
                    <button
                      type="button"
                      onClick={() => loadPresetRoom('suite')}
                      className="px-2.5 py-1 text-xs bg-white text-blue-700 font-medium rounded border border-blue-300 hover:bg-blue-100"
                    >
                      Deluxe King
                    </button>
                    <button
                      type="button"
                      onClick={() => loadPresetRoom('standard')}
                      className="px-2.5 py-1 text-xs bg-white text-blue-700 font-medium rounded border border-blue-300 hover:bg-blue-100"
                    >
                      Standard Room
                    </button>
                  </div>
                </div>

                {addRoomSuccess && (
                  <div className="mb-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Room successfully added to hotel inventory! Redirecting to All Rooms...</span>
                  </div>
                )}

                {addRoomError && (
                  <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>{addRoomError}</span>
                  </div>
                )}

                <form onSubmit={handleAddRoomSubmit} className="space-y-4">
                  {/* Row 1: Room Number, Max Capacity, Room Rent */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Room Number</label>
                      <input
                        type="text"
                        value={roomNumber}
                        onChange={(e) => setRoomNumber(e.target.value)}
                        placeholder="Room Number"
                        className="w-full px-3 py-2 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Max. Capacity</label>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                        placeholder="No. of people"
                        className="w-full px-3 py-2 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Room Rent</label>
                      <input
                        type="number"
                        min="100"
                        value={rentPerDay}
                        onChange={(e) => setRentPerDay(e.target.value)}
                        placeholder="Rent per day"
                        className="w-full px-3 py-2 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
                        required
                      />
                    </div>
                  </div>

                  {/* Room Photos matching Screenshot 3 */}
                  <div className="space-y-2 pt-2">
                    <label className="block text-xs font-medium text-slate-700">Room Photos</label>
                    <input
                      type="url"
                      value={image1}
                      onChange={(e) => setImage1(e.target.value)}
                      placeholder="Image 1 URL"
                      className="w-full px-3 py-2 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
                    />
                    <input
                      type="url"
                      value={image2}
                      onChange={(e) => setImage2(e.target.value)}
                      placeholder="Image 2 URL"
                      className="w-full px-3 py-2 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
                    />
                    <input
                      type="url"
                      value={image3}
                      onChange={(e) => setImage3(e.target.value)}
                      placeholder="Image 3 URL"
                      className="w-full px-3 py-2 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
                    />
                  </div>

                  {/* Room Type matching Screenshot 3 */}
                  <div className="pt-2">
                    <label className="block text-xs font-medium text-slate-700 mb-1.5">Room Type</label>
                    <div className="flex items-center gap-6">
                      <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                        <input
                          type="radio"
                          name="roomType"
                          value="Delux"
                          checked={roomType === 'Delux'}
                          onChange={() => setRoomType('Delux')}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span>Delux</span>
                      </label>
                      <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                        <input
                          type="radio"
                          name="roomType"
                          value="Non-Delux"
                          checked={roomType === 'Non-Delux'}
                          onChange={() => setRoomType('Non-Delux')}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span>Non-Delux</span>
                      </label>
                    </div>
                  </div>

                  {/* Room Description matching Screenshot 3 */}
                  <div className="pt-2">
                    <label className="block text-xs font-medium text-slate-700 mb-1">Room Description</label>
                    <textarea
                      rows={4}
                      value={roomDescription}
                      onChange={(e) => setRoomDescription(e.target.value)}
                      placeholder="Provide room amenities, bed sizes, views, or policies..."
                      className="w-full px-3 py-2 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
                      required
                    />
                  </div>

                  {/* Submit Button matching Screenshot 3 */}
                  <div className="pt-4 text-center">
                    <button
                      type="submit"
                      className="w-auto px-8 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs uppercase tracking-wider rounded shadow-xs transition cursor-pointer"
                    >
                      ADD ROOM
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================= */}
        {/* TAB 4: ALL USER (Matching Screenshot 3)                  */}
        {/* ========================================================= */}
        {activeTab === 'users' && (
          <section className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-slate-800">All users :</h2>
                <p className="text-xs text-slate-500">This showcases the registered users.</p>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    placeholder="Search users..."
                    className="pl-8 pr-3 py-1.5 text-xs bg-white rounded-md border border-slate-300 w-40"
                  />
                </div>
                <button
                  onClick={() => setIsAddUserModalOpen(true)}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded flex items-center gap-1 shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add User
                </button>
              </div>
            </div>

            {/* Table Container Card with Dark Header Bar matching Screenshot 3 */}
            <div className="bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden">
              {/* Dark Header Bar matching Screenshot 3 */}
              <div className="bg-[#2c3338] text-white px-6 py-3.5 text-center relative">
                <h3 className="font-bold text-base">All Registered Users</h3>
                <span className="text-[11px] text-slate-300 block">Total Users: {users.length}</span>
              </div>

              {/* Users Table matching Screenshot 3 */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="px-5 py-3 font-semibold">User ID</th>
                      <th className="px-5 py-3 font-semibold">Name</th>
                      <th className="px-5 py-3 font-semibold">Email</th>
                      <th className="px-5 py-3 font-semibold">Phone</th>
                      <th className="px-5 py-3 font-semibold">Type</th>
                      <th className="px-5 py-3 font-semibold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-50/70 transition">
                        <td className="px-5 py-3.5 font-mono text-[11px] text-slate-500">
                          {u.id}
                        </td>
                        <td className="px-5 py-3.5 font-semibold text-slate-900">
                          {u.name}
                        </td>
                        <td className="px-5 py-3.5 text-slate-600">{u.email}</td>
                        <td className="px-5 py-3.5 text-slate-600">{u.phone}</td>
                        <td className="px-5 py-3.5">
                          {u.type === 'Admin' ? (
                            <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                              Admin
                            </span>
                          ) : (
                            <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                              Ordinary
                            </span>
                          )}
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <button
                            onClick={() => {
                              if (confirm(`Remove user ${u.name}?`)) {
                                onDeleteUser(u.id);
                              }
                            }}
                            className="p-1 text-slate-400 hover:text-red-600 transition"
                            title="Delete User"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* Modal: Add User */}
        {isAddUserModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
              <h3 className="text-base font-bold text-slate-900 mb-4">Register New System User</h3>
              <form onSubmit={handleCreateUser} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full px-3 py-2 border border-slate-300 rounded text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    placeholder="e.g. john@hotel.com"
                    className="w-full px-3 py-2 border border-slate-300 rounded text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Phone</label>
                  <input
                    type="tel"
                    value={newUserPhone}
                    onChange={(e) => setNewUserPhone(e.target.value)}
                    placeholder="e.g. 9704927807"
                    className="w-full px-3 py-2 border border-slate-300 rounded text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Role / Type</label>
                  <select
                    value={newUserRole}
                    onChange={(e) => setNewUserRole(e.target.value as UserRole)}
                    className="w-full px-3 py-2 border border-slate-300 rounded text-xs"
                  >
                    <option value="Ordinary">Ordinary (Guest)</option>
                    <option value="Admin">Admin (Manager)</option>
                  </select>
                </div>
                <div className="flex gap-2 pt-3">
                  <button
                    type="button"
                    onClick={() => setIsAddUserModalOpen(false)}
                    className="flex-1 py-2 text-xs font-semibold text-slate-700 border border-slate-300 rounded hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 text-xs font-semibold text-white bg-blue-600 rounded hover:bg-blue-700"
                  >
                    Add User
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
