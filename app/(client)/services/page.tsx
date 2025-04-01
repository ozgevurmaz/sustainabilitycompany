'use client';

import ServicesSection from "@/components/client/servicesSection";
import HeroSection from "@/components/client/Hero";
import { dummyServices } from "@/lib/constant";

export default function Services() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection index={3} /> 

      <div className="container mx-auto px-4 py-20">
        <ServicesSection services={dummyServices}/>
      </div>
    </div>
  );
}
