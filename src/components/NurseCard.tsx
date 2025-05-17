
import React from "react";
import { Nurse } from "../data/nursesData";
import { Button } from "@/components/ui/button";

interface NurseCardProps {
  nurse: Nurse;
}

const NurseCard: React.FC<NurseCardProps> = ({ nurse }) => {
  // Helper function to render stars
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < Math.floor(rating)) {
        stars.push(
          <span key={i} className="text-accent">
            ★
          </span>
        );
      } else if (i === Math.floor(rating) && rating % 1 > 0) {
        stars.push(
          <span key={i} className="text-accent">
            ★
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="text-gray-300">
            ★
          </span>
        );
      }
    }
    return stars;
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-4 flex items-center">
      <div className="mr-3">
        <img
          src={nurse.imageUrl}
          alt={nurse.name}
          className="w-16 h-16 rounded-full object-cover"
        />
      </div>
      <div className="flex-grow">
        <h3 className="font-bold text-gray-800">{nurse.name}</h3>
        <div className="flex items-center gap-1 my-1">
          {renderStars(nurse.rating)}
          <span className="text-xs text-gray-500 ml-1">{nurse.distance} km away</span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm">
            <span className={`font-medium ${nurse.available ? 'text-green-600' : 'text-red-500'}`}>
              {nurse.available ? 'Available' : 'Unavailable'}
            </span>
            <span className="text-gray-600 ml-2 font-medium">{nurse.hourlyRate} tk/hr</span>
          </p>
        </div>
      </div>
      <div className="ml-2">
        <Button 
          variant="default" 
          className="bg-primary hover:bg-primary/90"
          disabled={!nurse.available}
        >
          Hire Now
        </Button>
      </div>
    </div>
  );
};

export default NurseCard;
