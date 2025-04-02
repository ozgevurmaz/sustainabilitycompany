'use client';

import { motion } from "framer-motion";
import ContactForm from "@/components/client/contactForm";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";
import HeroSection from "@/components/client/Hero";

export default function Contact() {

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection index={4} />

      {/* Contact Methods */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-none shadow-md bg-green-50">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Email Us</h3>
                <p className="text-gray-600 mb-4">We'll respond within 24 hours</p>
                <a href="mailto:info@futurefootprint.com" className="text-green-600 font-medium hover:underline">
                  info@futurefootprint.com
                </a>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md bg-green-50">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Call Us</h3>
                <p className="text-gray-600 mb-4">Speak directly with our experts</p>
                <a href="tel:+15555555555" className="text-green-600 font-medium hover:underline">
                  +1 (555) 555-5555
                </a>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md bg-green-50">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
                <p className="text-gray-600 mb-4">Our eco-friendly office location</p>
                <address className="text-green-600 font-medium not-italic">
                  123 Eco Street, Green Building<br />
                  Sustainability City, 10001
                </address>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>


      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 pb-4 text-center"
      >
        <h1 className="text-6xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-6 mt-12">
          Contact Us
        </h1>
        <p className="text-xl text-gray-600 mb-8">We would love to hear from you! Reach out for any inquiries.</p>
      </motion.div>
      <ContactForm />
    </div>
  );
}
