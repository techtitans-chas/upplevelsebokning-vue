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
  amenities: string[];
  beds: number;
  pricePerNight: number;
  thumbnail: string;
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
  thumbnail: string;
  coverImage: string;
  reviews: Review[];
}

export interface Travel {
  id: string;
  destinationId: string;
  destination?: Destination;
  accommodationId: string;
  accommodation?: Accommodation;
  startDate: string; //"dec 1" TODO:
  endDate: string; //"dec 3" TODO:
  duration?: number; // Computed: Number of nights
  price: number; // Computed: Total price based on accommodation
}
