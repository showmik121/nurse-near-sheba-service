
import React from "react";
import SearchBar from "@/components/SearchBar";
import ServiceCard from "@/components/ServiceCard";
import NurseCard from "@/components/NurseCard";
import { serviceCategories } from "@/data/servicesData";
import { nursesData } from "@/data/nursesData";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="nurse-near-app p-4">
      <header className="mb-6">
        <h1 className="text-4xl font-bold text-primary mb-6">NurseNear</h1>
        <SearchBar placeholder="Search for services" />
      </header>

      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Services</h2>
          <Button variant="ghost" className="text-sm text-primary p-0">View All</Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {serviceCategories.slice(0, 4).map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      <section className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Popular Nurses</h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" className="text-sm py-1 px-3 h-8">
              Filter
            </Button>
            <Button variant="ghost" className="text-sm text-primary p-0">View All</Button>
          </div>
        </div>
        <div className="space-y-4">
          {nursesData.map((nurse) => (
            <NurseCard key={nurse.id} nurse={nurse} />
          ))}
        </div>
      </section>

      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2">
        <div className="max-w-[500px] mx-auto flex justify-around">
          <Button variant="ghost" className="flex flex-col items-center text-xs text-primary">
            <span className="material-icons mb-1">🏠</span>
            Home
          </Button>
          <Button variant="ghost" className="flex flex-col items-center text-xs text-gray-500">
            <span className="material-icons mb-1">📅</span>
            Bookings
          </Button>
          <Button variant="ghost" className="flex flex-col items-center text-xs text-gray-500">
            <span className="material-icons mb-1">💬</span>
            Chat
          </Button>
          <Button variant="ghost" className="flex flex-col items-center text-xs text-gray-500">
            <span className="material-icons mb-1">👤</span>
            Profile
          </Button>
        </div>
      </footer>
      
      {/* Add padding to ensure footer doesn't cover content */}
      <div className="h-16"></div>
    </div>
  );
};

export default Index;
