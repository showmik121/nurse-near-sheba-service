
export interface Nurse {
  id: string;
  name: string;
  distance: number; // in km
  rating: number;
  hourlyRate: number;
  available: boolean;
  imageUrl: string;
  languages: string[];
}

export const nursesData: Nurse[] = [
  {
    id: "1",
    name: "Ayesha Karim",
    distance: 1.2,
    rating: 4.6,
    hourlyRate: 550,
    available: true,
    imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    languages: ["Bangla", "English"],
  },
  {
    id: "2",
    name: "Meena Rahman",
    distance: 3.5,
    rating: 4.8,
    hourlyRate: 550,
    available: true,
    imageUrl: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    languages: ["Bangla", "Hindi", "English"],
  },
  {
    id: "3",
    name: "Nusrat Hossain",
    distance: 1.5,
    rating: 4.4,
    hourlyRate: 320,
    available: true,
    imageUrl: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    languages: ["Bangla", "English"],
  },
  {
    id: "4",
    name: "Tahmina Begum",
    distance: 2.8,
    rating: 4.2,
    hourlyRate: 400,
    available: false,
    imageUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    languages: ["Bangla"],
  }
];
