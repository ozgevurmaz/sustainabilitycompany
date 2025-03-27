import { AlertCircle, ArrowLeft, Battery, Building, Car, Droplet, Earth, Edit2, Flower2, Globe, Leaf, Lightbulb, Recycle, Sprout, Sun, Trash2, Trees, Waves, Wind, Zap } from "lucide-react";

import { HeroSectionType, ServicesType } from "../types/types";

export const dummyPosts = [
    {
        _id: "1",
        title: "Understanding Carbon Footprint",
        excerpt: "Learn how carbon footprint affects the environment and what you can do to reduce it.",
        image: "/images/carbonfootprint.jpg",
        slug: "understanding-carbon-footprint",
        readTime: "5 min read",
    },
    {
        _id: "2",
        title: "Water Conservation Tips",
        excerpt: "Simple and effective ways to conserve water and reduce wastage.",
        image: "/images/waterfootprint.jpg",
        slug: "water-conservation-tips",
        readTime: "4 min read",
    },
    {
        _id: "3",
        title: "The Future of Renewable Energy",
        excerpt: "Exploring the latest innovations in solar and wind energy.",
        image: "/images/sustainableenergy.jpg",
        slug: "future-of-renewable-energy",
        readTime: "6 min read",
    },
];

export const services: ServicesType[] = [
    {
        id: "carbon-footprint-analysis",
        title: "Carbon Footprint Analysis",
        description: "Measure and reduce your carbon footprint with our expert solutions.",
        content: "We analyze your carbon emissions and provide actionable strategies to reduce your footprint, ensuring a sustainable future.",
        importance: "Understanding your carbon footprint is crucial in the fight against climate change. Businesses and individuals need to track their emissions to reduce environmental impact and meet global sustainability standards.",
        benefits: [
            "Identify key sources of carbon emissions",
            "Develop effective reduction strategies",
            "Enhance brand reputation and sustainability compliance",
            "Reduce operational costs through energy efficiency"
        ],
        imageUrl: "/images/carbonfootprint.jpg",
        icon: Leaf,
        color: "oklch(0.95 0.052 163.051)",
    },
    {
        id: "water-footprint-reduction",
        title: "Water Footprint Reduction",
        description: "Optimize water consumption and reduce waste effectively.",
        content: "Through advanced monitoring and conservation techniques, we help businesses and individuals reduce water usage and waste.",
        importance: "Water is a finite resource, and optimizing its usage is essential for sustainability. Understanding water consumption patterns helps prevent scarcity and ensures long-term water security.",
        benefits: [
            "Lower water bills and operational costs",
            "Reduce environmental impact",
            "Improve water conservation efforts",
            "Comply with sustainability regulations"
        ],
        imageUrl: "/images/waterfootprint.jpg",
        icon: Droplet,
        color: "oklch(0.932 0.032 255.585)",
    },
    {
        id: "sustainable-energy-consulting",
        title: "Sustainable Energy Consulting",
        description: "Transition to renewable energy sources with our tailored strategies.",
        content: "We guide you through solar, wind, and other renewable energy solutions to create a cleaner, greener energy plan.",
        importance: "Transitioning to sustainable energy reduces dependency on fossil fuels, lowers carbon emissions, and secures a long-term energy supply for businesses and communities.",
        benefits: [
            "Lower energy costs with renewables",
            "Reduce carbon emissions and meet sustainability goals",
            "Increase energy independence",
            "Improve company ESG (Environmental, Social, and Governance) score"
        ],
        imageUrl: "/images/sustainableenergy.jpg",
        icon: Sun,
        color: "oklch(0.973 0.071 103.193)"

    },
    {
        id: "corporate-sustainability-strategies",
        title: "Corporate Sustainability Strategies",
        description: "Develop long-term sustainability plans for your business.",
        content: "We help organizations implement effective sustainability programs that align with their goals and industry best practices.",
        importance: "Sustainability is a key driver of business success in today's world. Companies that integrate sustainable practices improve brand reputation, increase stakeholder trust, and achieve long-term profitability.",
        benefits: [
            "Enhance corporate social responsibility",
            "Increase customer and investor confidence",
            "Ensure long-term business resilience",
            "Comply with global sustainability regulations"
        ],
        imageUrl: "/images/sustainablitystrategies.jpg",
        icon: Building,
        color: "oklch(0.946 0.033 307.174)",
    },
];


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
        title: "Our Services",
        subtitle: "Explore how we help businesses and individuals achieve sustainability.",
        image: "/images/services.jpg",
    }
]

export const navItems = [
    {
        label: 'Services',
        children: [
            { label: 'Carbon Analysis', href: '/services/carbon-footprint-analysis' },
            { label: 'Water Management', href: '/services/water-footprint-reduction' },
            { label: 'Energy Consulting', href: '/services/sustainable-energy-consulting' },
            { label: 'Corporate Strategy', href: '/services/corporate-sustainability-strategies' },
        ],
    },
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
];

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
  ] as const
  export const COLOR_OPTIONS = [
    { value: "bg-green-100", label: "Green" },
    { value: "bg-green-200", label: "Light Green" },
    { value: "bg-blue-100", label: "Blue" },
    { value: "bg-blue-200", label: "Sky Blue" },
    { value: "bg-yellow-100", label: "Yellow" },
    { value: "bg-yellow-200", label: "Light Yellow" },
    { value: "bg-purple-100", label: "Purple" },
    { value: "bg-purple-200", label: "Lavender" },
    { value: "bg-orange-100", label: "Peach" },
    { value: "bg-orange-200", label: "Coral" },
    { value: "bg-red-100", label: "Light Red" },
    { value: "bg-red-200", label: "Rose" },
    { value: "bg-gray-100", label: "Light Gray" },
    { value: "bg-gray-200", label: "Cool Gray" },
  ] as const;