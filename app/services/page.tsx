'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf, Droplet, Sun, Building } from "lucide-react";
import ServicesSection from "@/components/servicesSection";
import HeroSection from "@/components/Hero";

const services = [
  {
    id: "carbon-footprint-analysis",
    title: "Carbon Footprint Analysis",
    description: "Measure and reduce your carbon footprint with our expert solutions.",
    icon: Leaf,
  },
  {
    id: "water-footprint-reduction",
    title: "Water Footprint Reduction",
    description: "Optimize water consumption and reduce waste effectively.",
    icon: Droplet,
  },
  {
    id: "sustainable-energy-consulting",
    title: "Sustainable Energy Consulting",
    description: "Transition to renewable energy sources with our tailored strategies.",
    icon: Sun,
  },
  {
    id: "corporate-sustainability-strategies",
    title: "Corporate Sustainability Strategies",
    description: "Develop long-term sustainability plans for your business.",
    icon: Building,
  },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection index={3} /> 

      <div className="container mx-auto px-4 py-20">
        <ServicesSection/>
      </div>
    </div>
  );
}
