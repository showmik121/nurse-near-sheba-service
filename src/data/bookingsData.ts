
import { Booking } from "@/components/BookingsList";

// Demo booking data
export const demoBookings: Booking[] = [
  {
    id: "BK123456",
    services: ["Blood Pressure Check", "Diabetes Care"],
    date: "2025-05-22",
    time: "10:00",
    price: 1200,
    status: 'pending',
    careProvider: 'female',
  },
  {
    id: "BK123457",
    services: ["IV Therapy", "Wound Care"],
    date: "2025-05-23",
    time: "14:30",
    price: 1500,
    status: 'processed',
    careProvider: 'male',
  },
  {
    id: "BK123458",
    services: ["Post-Surgery Care"],
    date: "2025-05-20",
    time: "16:00",
    price: 2000,
    status: 'cancelled',
    careProvider: 'female',
  },
];

// Initial bookings state
export const initialBookings = [...demoBookings];
