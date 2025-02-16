'use client';

import { motion } from "framer-motion";
import ContactForm from "@/components/contactForm";

export default function Contact() {

  return (
    <div className="min-h-screen bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 pt-20 pb-4 text-center"
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
