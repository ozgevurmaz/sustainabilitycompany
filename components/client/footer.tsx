'use client';

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  MapPin, 
  Phone,
  ArrowRight,
  Leaf
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Subscription logic here
    console.log('Subscribe form submitted');
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <Leaf className="h-8 w-8 text-green-400 mr-2" />
              <h3 className="text-2xl font-bold">FutureFootprint</h3>
            </div>
            <p className="text-gray-300 mb-6">
              Helping individuals and businesses reduce their environmental impact through 
              innovative solutions and data-driven strategies.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-6 border-b border-gray-700 pb-2">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-300 hover:text-green-400 transition-colors flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" /> Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-green-400 transition-colors flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" /> About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-green-400 transition-colors flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" /> Our Services
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-green-400 transition-colors flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" /> Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-green-400 transition-colors flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" /> Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-semibold mb-6 border-b border-gray-700 pb-2">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-green-400 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-300">
                  123 Eco Street, Green Building
                  <br />
                  Sustainability City, 10001
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                <span className="text-gray-300">(555) 555-5555</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                <a href="mailto:info@futurefootprint.com" className="text-gray-300 hover:text-green-400 transition-colors">
                  info@futurefootprint.com
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xl font-semibold mb-6 border-b border-gray-700 pb-2">Newsletter</h4>
            <p className="text-gray-300 mb-4">
              Stay updated with our latest insights and sustainable solutions.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <Input
                type="email"
                placeholder="Your email address"
                required
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Copyright and Footer Links */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} FutureFootprint. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/" className="text-gray-400 hover:text-white text-sm">
              Privacy Policy
            </Link>
            <Link href="/" className="text-gray-400 hover:text-white text-sm">
              Terms of Service
            </Link>
            <Link href="/" className="text-gray-400 hover:text-white text-sm">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;