
import React, { createContext, useContext, useState, useMemo } from 'react';
import { Booking } from '@/components/BookingsList';
import { initialBookings } from '@/data/bookingsData';

type BookingContextType = {
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  updateBookingStatus: (id: string, status: 'pending' | 'processed' | 'cancelled') => void;
  pendingBookings: Booking[];
  historyBookings: Booking[];
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);

  const addBooking = (booking: Booking) => {
    setBookings((prev) => [booking, ...prev]);
  };

  const updateBookingStatus = (id: string, status: 'pending' | 'processed' | 'cancelled') => {
    setBookings((prev) => 
      prev.map((booking) => 
        booking.id === id ? { ...booking, status } : booking
      )
    );
  };

  const pendingBookings = useMemo(() => 
    bookings.filter(booking => booking.status === 'pending'), [bookings]
  );

  const historyBookings = useMemo(() => 
    bookings.filter(booking => booking.status !== 'pending'), [bookings]
  );

  const value = {
    bookings,
    addBooking,
    updateBookingStatus,
    pendingBookings,
    historyBookings,
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
