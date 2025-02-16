import { Leaf, Droplet, Sun, Building } from "lucide-react";

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

export const services = [
    {
        title: "Carbon Footprint Analysis",
        description: "Measure and reduce your carbon footprint with our expert solutions.",
        icon: Leaf,
        color: "bg-emerald-100",
    },
    {
        title: "Water Footprint Reduction",
        description: "Optimize water consumption and reduce waste effectively.",
        icon: Droplet,
        color: "bg-blue-100",
    },
    {
        title: "Sustainable Energy Consulting",
        description: "Transition to renewable energy sources with our tailored strategies.",
        icon: Sun,
        color: "bg-yellow-100",
    },
    {
        title: "Corporate Sustainability Strategies",
        description: "Develop long-term sustainability plans for your business.",
        icon: Building,
        color: "bg-purple-100",
    },
];

export const sections = [
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
    }
]

export   const navItems = [
    {
      label: 'Services',
      children: [
        { label: 'Carbon Analysis', href: '/services/carbon' },
        { label: 'Water Management', href: '/services/water' },
        { label: 'Energy Consulting', href: '/services/energy' },
        { label: 'Corporate Strategy', href: '/services/corporate' },
      ],
    },
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ];