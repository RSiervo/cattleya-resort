
export interface Room {
  id: string;
  name: string;
  description: string;
  capacity: string;
  price: number;
  inclusions: string[];
  imageUrl: string;
  localImage?: string;
  category: 'Couple' | 'Family' | 'Barkada' | 'Private';
}

export interface BookingData {
  checkIn: string;
  checkOut: string;
  guests: number;
  roomId: string;
  roomName: string;
  email: string;
  fullName: string;
  phone: string;
  paymentMethod: string;
  totalAmount: number;
  depositPaid: number;
  paymentStatus: 'Pending' | 'Paid' | 'Failed';
  transactionId?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Amenity {
  name: string;
  icon: string;
}

export interface PaymentIntent {
  id: string;
  status: string;
  checkoutUrl: string;
}
