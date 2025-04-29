import { Battery, Building, Car, Droplet, Earth, Flower2, Globe, Leaf, Lightbulb, Recycle, Sprout, Sun, Trash2, Trees, Waves, Wind, Zap } from "lucide-react";

import { HeroSectionType } from "../types/types";

export const COLOR_OPTIONS = [
    { label: "Green", hex: "#dcfce7" },
    { label: "Light Green", hex: "#bbf7d0" },
    { label: "Blue", hex: "#dbeafe" },
    { label: "Sky Blue", hex: "#bfdbfe" },
    { label: "Yellow", hex: "#fef9c3" },
    { label: "Light Yellow", hex: "#fef08a" },
    { label: "Purple", hex: "#f3e8ff" },
    { label: "Lavender", hex: "#e9d5ff" },
    { label: "Peach", hex: "#ffedd5" },
    { label: "Coral", hex: "#fed7aa" },
    { label: "Light Red", hex: "#fee2e2" },
    { label: "Rose", hex: "#fecaca" },
    { label: "Light Gray", hex: "#f3f4f6" },
    { label: "Cool Gray", hex: "#e5e7eb" },
] as const;


export const sections: HeroSectionType[] = [
    {
        title: "Future Footprint",
        subtitle: "Building a sustainable future, one step at a time.",
        image: "/images/homepage.jpg",
    },
    {
        title: "About Future Footprint",
        subtitle: "Our mission is to create a greener, more sustainable world for future generations.",
        image: "/images/about.jpg",
    },
    {
        title: "Blog",
        subtitle: "Explore the latest insights on sustainability and green living..",
        image: "/images/blog.jpg",
    },
    {
        title: "Sustainable Solutions for a Better Tomorrow",
        subtitle: " We offer innovative environmental services designed to reduce your ecological footprint, improve sustainability performance, and create a positive impact on our planet.",
        image: "/images/services.jpg",
    },
    {
        title: "Get in Touch",
        subtitle: " Ready to start your sustainability journey? We're here to help you create a greener future for your organization.",
        image: "/images/contact.jpg",
    }
]

export const ICON_OPTIONS = [
    { name: "Leaf", component: Leaf },
    { name: "Droplet", component: Droplet },
    { name: "Sun", component: Sun },
    { name: "Building", component: Building },
    { name: "Recycle", component: Recycle },
    { name: "Trees", component: Trees },
    { name: "Globe", component: Globe },
    { name: "Wind", component: Wind },
    { name: "Waves", component: Waves },
    { name: "Energy", component: Zap },
    { name: "Battery", component: Battery },
    { name: "Flower", component: Flower2 },
    { name: "Earth", component: Earth },
    { name: "ElectricCar", component: Car },
    { name: "Lightbulb", component: Lightbulb },
    { name: "Sprout", component: Sprout },
    { name: "Trash", component: Trash2 }
] as const
