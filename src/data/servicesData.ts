
export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
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
  }
];
