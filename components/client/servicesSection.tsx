import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { usePathname, useRouter } from 'next/navigation';
import { ServicesType } from '@/lib/types/types';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ServiceCard from './Home/ServiceCard';

interface ServicesSectionProps {
  services: ServicesType[];
  title?: string;
  subtitle?: string;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  title = "Our Services",
  subtitle = "Explore our range of professional services tailored to meet your needs"
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const isServicesPage = pathname === "/services";

  const gridCols = isServicesPage
    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6";

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section
      className={`${isServicesPage ? "bg-transparent py-10" : "bg-white py-20"}`}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600">
            {subtitle}
          </p>
        </div>

        {isServicesPage ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {services && services.map((service, index) => (
              <ServiceCard
                key={index}
                service={service}
                onClick={() => router.push(`/services/${service.id}`)}
                variants={itemVariants}
              />
            ))}
          </motion.div>
        ) : (
          <>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {services && services.slice(0, 3).map((service, index) => (
                <ServiceCard
                  key={index}
                  service={service}
                  onClick={() => router.push(`/services/${service.id}`)}
                  variants={itemVariants}
                />
              ))}
            </motion.div>

            <div className="mt-12 text-center">
              <Button
                onClick={() => router.push('/services')}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center mx-auto"
              >
                View All Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ServicesSection; 