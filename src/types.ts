export type UserRole = 'Admin' | 'Ordinary';

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  phone: string;
  type: UserRole;
  createdAt?: string;
}

export type RoomType = 'Delux' | 'Non-Delux' | 'Ordinary';

export interface Room {
  id: string;
  roomNumber: string;
  capacity: number;
  rentPerDay: number;
  type: RoomType;
  description: string;
  images: string[];
  amenities?: string[];
  isAvailable?: boolean;
}

export type BookingStatus = 'BOOKED' | 'CANCELLED';

export interface Booking {
  id: string;
  roomNumber: string;
  roomType: string;
  roomId?: string;
  userId: string;
  userName: string;
  customerPhone: string;
  fromDate: string; // DD-MM-YYYY or YYYY-MM-DD
  toDate: string;
  totalDays: number;
  totalAmount: number;
  status: BookingStatus;
  createdAt: string;
  paymentMethod?: string;
}
