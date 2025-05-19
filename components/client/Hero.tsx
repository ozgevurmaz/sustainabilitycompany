"use client";

import React, { useCallback } from "react";
import { motion } from "framer-motion";
import { sections } from "@/lib/constant";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface HeroSectionProps {
  index: number;
}

const HeroSection: React.FC<HeroSectionProps> = ({ index }) => {
  const router = useRouter();
  const section = sections[index];

  const handleGetStarted = useCallback(() => {
    router.push("/contact");
  }, [router]);

  // Animation variants for consistent animations
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.2, duration: 0.5 }
    })
  };

  return (
    <div
      className={`relative ${index === 0 ? "h-[70vh]" : "h-[50vh]"} w-full overflow-hidden`}
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="absolute inset-0 bg-green-900/40 z-20" />
        <Image
          src={section.image}
          alt={section.title}
          fill
          priority={index === 0}
          sizes="100vw"
          className="object-cover object-center"
          quality={90}
        />
      </div>

      {/* Content */}
      <div className="relative z-30 h-full w-full flex items-center justify-center">
        <div className="container mx-auto px-4 pt-20 md:pt-24">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial="hidden"
              animate="visible"
              custom={0}
              variants={fadeInUp}
              className={`${index === 0 ? "text-4xl md:text-5xl" : "text-2xl md:text-4xl"} xl:text-5xl font-bold bg-gradient-to-r from-green-200 to-white bg-clip-text text-transparent mb-6 md:mb-8 leading-tight`}
            >
              {section.title}
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="visible"
              custom={1}
              variants={fadeInUp}
              className="text-md md:text-xl text-gray-100 mb-8 max-w-3xl mx-auto"
            >
              {section.subtitle}
            </motion.p>

            {index === 0 && (
              <motion.button
                initial="hidden"
                animate="visible"
                custom={2}
                variants={fadeInUp}
                onClick={handleGetStarted}
                className="bg-green-700 hover:bg-green-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center mx-auto gap-2 font-medium shadow-lg"
                aria-label="Get Started"
              >
                Get Started <ChevronRight className="h-5 w-5" />
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;