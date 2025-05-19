
export interface ServiceDetail {
  id: string;
  name_en: string;
  name_bn: string;
  price: number;
}

export interface ServiceCategory {
  id: string;
  name: string;
  name_bn?: string;
  icon: string;
  hasPromo?: boolean;
  details?: ServiceDetail[];
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: "home-care",
    name: "Home Care",
    name_bn: "হোম কেয়ার",
    icon: "👩‍⚕️",
    details: [
      {
        id: "cannula",
        name_en: "Cannula Insertion",
        name_bn: "ক্যানোলা দেওয়া",
        price: 200
      },
      {
        id: "saline",
        name_en: "Saline Administration",
        name_bn: "সালাইন দেওয়া",
        price: 300
      },
      {
        id: "bp-check",
        name_en: "Blood Pressure Check",
        name_bn: "BP চেক",
        price: 50
      },
      {
        id: "injection",
        name_en: "Injection Administration",
        name_bn: "ইনজেকশন দেওয়া",
        price: 150
      },
      {
        id: "bathing",
        name_en: "Body Cleaning/Bathing",
        name_bn: "শারীরিক সাফাই/বাথিং",
        price: 400
      },
      {
        id: "blood-sugar",
        name_en: "Blood Sugar Check",
        name_bn: "ব্লাড সুগার চেক",
        price: 100
      }
    ]
  },
  {
    id: "wound-care",
    name: "Wound Care",
    name_bn: "ক্ষত পরিচর্যা",
    icon: "🩹", 
  },
  {
    id: "personal-care",
    name: "Personal Care",
    name_bn: "ব্যক্তিগত পরিচর্যা",
    icon: "👥", 
  },
  {
    id: "medication",
    name: "Medication",
    name_bn: "ঔষধ সেবন",
    icon: "💊", 
  },
  {
    id: "elderly-care",
    name: "Elderly Care",
    name_bn: "বয়স্ক পরিচর্যা",
    icon: "👵", 
  },
  {
    id: "post-operative",
    name: "Post-Operative",
    name_bn: "অপারেশন পরবর্তী",
    icon: "🏥", 
  },
  {
    id: "baby-care",
    name: "Baby Care",
    name_bn: "শিশু পরিচর্যা",
    icon: "👶", 
  },
  {
    id: "hourly-nurse",
    name: "Hourly",
    name_bn: "ঘন্টায়",
    icon: "⏱️", 
  },
  {
    id: "night-duty",
    name: "Night Duty",
    name_bn: "রাত্রি ডিউটি",
    icon: "🌙", 
  }
];
