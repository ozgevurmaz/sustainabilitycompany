import { AlertCircle, ArrowLeft, Battery, Building, Car, Droplet, Earth, Edit2, Flower2, Globe, Leaf, Lightbulb, Recycle, Sprout, Sun, Trash2, Trees, Waves, Wind, Zap } from "lucide-react";

import { BlogFormDataType, BlogPostType, CategoryType, HeroSectionType, ServicesType, TestimonialType } from "../types/types";

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

export const dummyServices: ServicesType[] = [{
    id: "sustainability-audits",
    title: "Sustainability Audits",
    description: "Comprehensive evaluation of your organization's environmental impact and sustainability practices.",
    content: "Our sustainability audits provide a detailed assessment of your company's environmental footprint, resource usage, and operational practices. We identify areas for improvement and provide actionable recommendations to enhance your sustainability performance.",
    importance: "Understanding your current environmental impact is the first step toward meaningful change. Our audits establish a baseline and identify the most effective opportunities for improvement.",
    benefits: [
        "Environmental impact assessment",
        "Resource efficiency analysis",
        "Carbon footprint calculation",
        "Waste management review",
        "Detailed report with recommendations"
    ],
    imageUrl: "/services/sustainability-audit.jpg",
    icon: Leaf,
    color: "bg-green-500",
},
{
    id: "green-building-consultation",
    title: "Green Building Consultation",
    description: "Expert guidance on sustainable building practices, materials, and certifications.",
    content: "Our green building consultation services help you design, construct, or retrofit buildings to meet sustainability standards. We provide guidance on energy-efficient designs, sustainable materials, renewable energy integration, and certification processes like LEED or BREEAM.",
    importance: "Buildings account for approximately 40% of global energy consumption and carbon emissions. Green building practices can drastically reduce this impact while creating healthier, more efficient spaces.",
    benefits: [
        "Sustainable design assessment",
        "Energy efficiency modeling",
        "Material selection guidance",
        "Certification support (LEED, BREEAM)",
        "ROI analysis for green features"
    ],
    imageUrl: "/services/green-building.jpg",
    icon: Building,
    color: "bg-blue-500",
},
{
    id: "renewable-energy-implementation",
    title: "Renewable Energy Implementation",
    description: "Custom solutions for integrating renewable energy sources into your operations.",
    content: "We help businesses transition to renewable energy sources such as solar, wind, or geothermal. Our services include feasibility studies, system design, vendor selection, installation oversight, and performance monitoring to ensure optimal energy production.",
    importance: "Transitioning to renewable energy reduces carbon emissions, offers long-term cost savings, and provides resilience against energy price volatility and supply disruptions.",
    benefits: [
        "Renewable energy feasibility studies",
        "System design and specification",
        "Vendor selection assistance",
        "Installation project management",
        "Performance monitoring setup"
    ],
    imageUrl: "/services/renewable-energy.jpg",
    icon: Sun,
    color: "bg-yellow-500",
},
{
    id: "carbon-offset-programs",
    title: "Carbon Offset Programs",
    description: "Develop and implement effective carbon offset strategies to achieve carbon neutrality.",
    content: "Our carbon offset programs help organizations balance their carbon emissions through investment in environmental projects. We guide you through the process of measuring your carbon footprint, selecting appropriate offset projects, and verifying the impact of your investments.",
    importance: "Carbon offsetting allows businesses to take immediate action on their unavoidable emissions while working on long-term reduction strategies, contributing to global climate goals.",
    benefits: [
        "Carbon footprint assessment",
        "Offset strategy development",
        "Project selection guidance",
        "Verification and reporting",
        "Marketing and communication support"
    ],
    imageUrl: "/services/carbon-offset.jpg",
    icon: Recycle,
    color: "bg-purple-500",
},
{
    id: "waste-reduction-strategies",
    title: "Waste Reduction Strategies",
    description: "Comprehensive waste audit and management plans to minimize waste and increase recycling.",
    content: "Our waste reduction services help organizations minimize waste generation and maximize recycling efforts. We conduct detailed waste audits, identify reduction opportunities, design circular economy approaches, and implement effective waste management systems.",
    importance: "Reducing waste not only minimizes environmental impact but also often leads to significant cost savings and can enhance brand reputation among increasingly eco-conscious consumers.",
    benefits: [
        "Waste audit and analysis",
        "Reduction strategy development",
        "Recycling program implementation",
        "Staff training and education",
        "Progress tracking and reporting"
    ],
    imageUrl: "/services/waste-reduction.jpg",
    icon: Trash2,
    color: "bg-teal-500",
},
{
    id: "water-conservation",
    title: "Water Conservation",
    description: "Effective strategies to optimize water usage and reduce consumption across operations.",
    content: "We help businesses identify and implement water-saving opportunities throughout their operations. Our approach includes comprehensive water audits, fixture upgrades, process improvements, rainwater harvesting, and behavior change initiatives.",
    importance: "As water scarcity becomes more prevalent globally, improving water efficiency reduces environmental impact, ensures operational resilience, and often results in substantial cost savings.",
    benefits: [
        "Water usage audit",
        "Efficiency improvement plan",
        "Low-flow fixture recommendations",
        "Process water recycling solutions",
        "Employee awareness programs"
    ],
    imageUrl: "/services/water-conservation.jpg",
    icon: Droplet,
    color: "bg-sky-500",
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
            { label: 'Sustainability Audits', href: '/services/sustainability-audits' },
            { label: 'Green Building Consultation', href: '/services/green-building-consultation' },
            { label: 'Renewable Energy Implementation', href: '/services/renewable-energy-implementation' },
            { label: 'Carbon Offset Programs', href: '/services/carbon-offset-programs' },
            { label: 'Waste Reduction Strategies', href: '/services/waste-reduction-strategies' },
            { label: 'Water Conservation', href: '/services/water-conservation' },
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

export const dummyTestimonials: TestimonialType[] = [
    {
        id: 1,
        name: "Jane Smith",
        company: "GreenTech Solutions",
        position: "Sustainability Director",
        comment: "Working with your team transformed our sustainability initiatives. The energy audit saved us 30% on utility costs and helped us achieve our carbon reduction goals.",
        rating: 5,
        imageUrl: "/testimonials/jane-smith.jpg",
        featured: true,
        date: "2023-10-15"
    },
    {
        id: 2,
        name: "Michael Johnson",
        company: "Eco Builders",
        position: "CEO",
        comment: "Your waste reduction program helped us achieve zero waste certification for our construction sites. Excellent service and knowledge throughout the process.",
        rating: 4.5,
        imageUrl: "/testimonials/michael-johnson.jpg",
        featured: false,
        date: "2023-09-22"
    },
    {
        id: 3,
        name: "Sarah Williams",
        company: "Organic Foods Co-op",
        position: "Operations Manager",
        comment: "The sustainability audit provided clear, actionable steps that were easy to implement. We've seen immediate improvements in our energy usage and waste management.",
        rating: 5,
        imageUrl: "/testimonials/sarah-williams.jpg",
        featured: true,
        date: "2023-11-05"
    },
]

export const dummyBlog: BlogPostType[] = [
    {
        id: 1,
        title: "10 Ways to Reduce Your Carbon Footprint",
        excerpt: "Simple changes to your daily routine that can help reduce your environmental impact.",
        content: "Full content of the article...",
        category: "Tips & Tricks",
        tags: ["carbon footprint", "sustainable living", "climate action"],
        featuredImage: "/blog/carbon-footprint.jpg",
        status: "published",
        metaTitle: "Reduce Carbon Footprint: 10 Simple Daily Changes",
        metaDescription: "Learn 10 easy ways to reduce your carbon footprint and live more sustainably with these simple lifestyle changes.",
        author: "Jane Smith",
        authorImage: "/team/jane-smith.jpg",
        publishDate: "2023-10-15",
        readTime: "5 min",
        views: 1243,
        likes: 89,
        comments: 24
    },
    {
        id: 2,
        title: "The Business Case for Sustainability",
        excerpt: "How implementing sustainable practices can benefit your company's bottom line.",
        content: "Full content of the article...",
        category: "Business",
        tags: ["sustainable business", "green economy", "CSR"],
        featuredImage: "/blog/business-sustainability.jpg",
        status: "published",
        metaTitle: "Business Sustainability: The Economic Benefits Explained",
        metaDescription: "Discover how sustainability initiatives can improve your business operations and increase profitability.",
        author: "John Davis",
        authorImage: "/team/john-davis.jpg",
        publishDate: "2023-09-28",
        readTime: "8 min",
        views: 856,
        likes: 62,
        comments: 17
    },
    {
        id: 3,
        title: "Understanding Carbon Offset Programs",
        excerpt: "A comprehensive guide to carbon offset programs and how they work.",
        content: "Full content of the article...",
        category: "Guides",
        tags: ["carbon offsets", "emissions", "climate change"],
        featuredImage: "/blog/carbon-offset.jpg",
        status: "draft",
        metaTitle: "Carbon Offset Programs Explained: A Complete Guide",
        metaDescription: "Everything you need to know about carbon offset programs, their effectiveness, and how to choose the right one.",
        author: "Jane Smith",
        authorImage: "/team/jane-smith.jpg",
        publishDate: "",
        readTime: "12 min",
        views: 0,
        likes: 0,
        comments: 0
    },
]

export const dummyCategories: CategoryType[] = [
    { id: 1, name: "Tips & Tricks", postCount: 14 },
    { id: 2, name: "Business", postCount: 9 },
    { id: 3, name: "Guides", postCount: 8 },
    { id: 4, name: "News", postCount: 12 },
    { id: 5, name: "Case Studies", postCount: 6 },
]