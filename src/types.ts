export interface Review {
  user: string;
  rating: number;
  comment: string;
}

export interface Accommodation {
  id: string;
  destinationId: string;
  destination?: Destination;
  title: string;
  description: string;
  amenities: Array<{ icon: string; title: string }>;
  beds: number;
  pricePerNight: number;
  coverImage: string;
  rating: number;
  reviews: Review[];
}

export interface Activity {
  id: string;
  destinationId: string;
  destination?: Destination;
  title: string;
  description: string;
  duration: string; // TODO:
  groupSize: number; // TODO:
  ageGroup: string; // TODO:
  included: string[];
  requirements: string[];
  price: number;
  rating: number;
  reviews: Review[];
  thumbnail: string;
}

export interface Destination {
  id: string;
  title: string;
  location: string;
  timePeriod: number;
  climate: string;
  travelTips: string[];
  price: number;
  description: string;
  coverImage: string;
  tags?: string[];
  reviews: Review[];
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  coverImage: string;
}

export interface CartActivity {
  activity: Activity;
  attendees: number;
}

export interface CartAccommodation {
  accommodation: Accommodation;
  startDate: string;
  endDate: string;
  duration?: number;
  guests: number;
}

export interface CartItem {
  id: string;
  destinationId: string;
  destinationPrice: number;
  accommodations: CartAccommodation[];
  activities: CartActivity[];
}
