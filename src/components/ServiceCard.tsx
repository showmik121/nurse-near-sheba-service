
import React from "react";
import { ServiceCategory } from "../data/servicesData";

interface ServiceCardProps {
  service: ServiceCategory;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="text-3xl mb-2">{service.icon}</div>
      <p className="text-sm font-medium text-gray-800">{service.name}</p>
    </div>
  );
};

export default ServiceCard;
