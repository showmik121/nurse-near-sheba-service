
import React from "react";
import { ServiceCategory } from "../data/servicesData";

interface ServiceCardProps {
  service: ServiceCategory;
  hasPromo?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, hasPromo = false }) => {
  return (
    <div className="relative service-card">
      {hasPromo && (
        <span className="service-promo">Promo</span>
      )}
      <div className="text-4xl mb-3">{service.icon}</div>
      <p className="text-sm font-medium text-center text-gray-800">{service.name}</p>
    </div>
  );
};

export default ServiceCard;
