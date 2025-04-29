'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from 'lucide-react';
import { fetchServices } from '@/lib/actions';

const navItems = [
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

interface ServiceItemTypes {
  label: string,
  href: string
}
const Navbar = ({ isBg }: { isBg?: boolean }) => {

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [serviceItems, setServiceItems] = useState<ServiceItemTypes[]>([]);
  const [servicesLoaded, setServicesLoaded] = useState(false);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await fetchServices();
        const formatted = data.map((item: any) => ({
          label: item.title,
          href: `/services/${item.slug}`,
        }));
        setServiceItems(formatted);
        setServicesLoaded(true);
      } catch (error) {
        console.log("Failed to load services", error);
      }
    };

    loadServices();
  }, []);


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 text-white ${isBg || isScrolled
        ? "bg-green-700 backdrop-blur-md shadow-md"
        : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">FF</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <div key={index} className="relative group">
                {item.children ? (
                  <div className="flex items-center cursor-pointer hover:text-green-300">
                    <span>{item.label}</span>
                    <ChevronDown className="ml-1 h-4 w-4" />

                    {/* Dropdown */}
                    <div
                      className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300"
                    >
                      <div className="py-2">
                        {(item.label === "Services" ? serviceItems : item.children)?.map((child, childIndex) => (
                          <Link
                            key={childIndex}
                            href={child.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`text-white hover:text-green-300 transition-colors duration-300 ${item.label === "Contact" ? "border rounded-full border-white px-4 py-2 hover:border-green-300" : ""}`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 bg-green-700/90">
            {navItems.map((item, index) => (
              <div key={index} className="py-2">
                {item.children ? (
                  <div>
                    <div className="flex items-center px-4 py-2 text-white">
                      <span>{item.label}</span>
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </div>
                    <div className="pl-8">
                      {(item.label === "Services" ? serviceItems : item.children)?.map((child, childIndex) => (
                        <Link
                          key={childIndex}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-white hover:text-green-600"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="block px-4 py-2 text-white hover:text-green-600"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="px-4 py-2">
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;