
export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  hasPromo?: boolean;
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: "home-care",
    name: "Home Care",
    icon: "👩‍⚕️", 
  },
  {
    id: "wound-care",
    name: "Wound Care",
    icon: "🩹", 
  },
  {
    id: "personal-care",
    name: "Personal Care",
    icon: "👥", 
  },
  {
    id: "medication",
    name: "Medication",
    icon: "💊", 
  },
  {
    id: "elderly-care",
    name: "Elderly Care",
    icon: "👵", 
  },
  {
    id: "post-operative",
    name: "Post-Operative",
    icon: "🏥", 
  },
  {
    id: "baby-care",
    name: "Baby Care",
    icon: "👶", 
  },
  {
    id: "hourly-nurse",
    name: "Hourly",
    icon: "⏱️", 
  },
  {
    id: "night-duty",
    name: "Night Duty",
    icon: "🌙", 
  }
];
