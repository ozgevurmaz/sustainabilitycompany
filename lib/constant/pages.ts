import { Leaf, Droplet, Sun, Building } from "lucide-react";
import { HeroSectionType, ServicesType } from "../types/types";

export const dummyPosts = [
    {
        _id: "1",
        title: "Understanding Carbon Footprint",
        excerpt: "Learn how carbon footprint affects the environment and what you can do to reduce it.",
        image: "/images/carbon-footprint.jpg",
        slug: "understanding-carbon-footprint",
        readTime: "5 min read",
    },
    {
        _id: "2",
        title: "Water Conservation Tips",
        excerpt: "Simple and effective ways to conserve water and reduce wastage.",
        image: "/images/water-conservation.jpg",
        slug: "water-conservation-tips",
        readTime: "4 min read",
    },
    {
        _id: "3",
        title: "The Future of Renewable Energy",
        excerpt: "Exploring the latest innovations in solar and wind energy.",
        image: "/images/renewable-energy.jpg",
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