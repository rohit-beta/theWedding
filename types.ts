// FIX: Defined the Photo interface here to resolve a circular dependency.
// The component 'Photos.tsx' imports this type, so it must be defined here.
export interface Photo {
  id: number;
  imageUrl: string;
  alt: string;
}

export interface NavLink {
    path: string;
    label: string;
}

export interface WeddingPartyMember {
  name: string;
  role: string;
  imageUrl: string;
}

export interface WeddingEvent {
    name: string;
    dateTime: string;
    venueName: string;
    venueLink: string;
}

export interface RSVPData {
  guestName: string;
  phone: string;
  email: string;
  pax: number;
  arrivalDate: string;
  arrivalTime: string;
  arrivalMode: string;
  arrivalNumber: string;
  departureDate: string;
  departureTime: string;
  departureMode: string;
  departureNumber: string;
  comments?: string;
}

export interface GuestBookEntry {
  id: string;
  name: string;
  message: string;
  loves: number;
  // New properties for dynamic layout
  color: string;
  rotation: number;
  position: {
    top: number; // percentage
    left: number; // percentage
  };
  zIndex: number;
}