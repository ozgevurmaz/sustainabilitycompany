"use client";

import React from "react";
import { motion } from "framer-motion";
import { sections } from "@/lib/constant/pages";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

const HeroSection = ({ index }: { index: number }) => {
  const router = useRouter();

  const imageUrl = sections[index].image;

  return (
    <div
      className={`relative ${index === 0 ? "h-[70vh]" : "h-[40vh]"} flex items-center`}
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div className="container mx-auto px-4 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-200 to-white bg-clip-text text-transparent mb-8"
          >
            {sections[index].title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-2xl text-white mb-8"
          >
            {sections[index].subtitle}
          </motion.p>
          {
          index === 0 &&
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              onClick={() => router.push("/contact")}
              className="bg-green-700 text-white px-8 py-4 rounded-lg hover:bg-green-400 hover:text-gray-900 transition-all duration-300 flex mx-auto">
              Get Started <ChevronRight />
            </motion.button>
            }
        </div>

      </div>
    </div>
  );
};

export default HeroSection;
