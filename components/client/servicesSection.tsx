"use client"

import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { usePathname, useRouter } from 'next/navigation';
import { ServicesType } from '@/lib/types/types';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ServiceCard from './Home/ServiceCard';
import { toast } from '@/hooks/use-toast';
import LoadingPage from '../LoadingPage';
import { fetchServices } from '@/lib/actions';

interface ServicesSectionProps {
  title?: string;
  subtitle?: string;
  filter?: string;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({
  title = "Our Services",
  subtitle = "Explore our range of professional services tailored to meet your needs",
  filter
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [services, setServices] = useState<ServicesType[]>([])
  const isServicesPage = pathname === "/services";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  useEffect(() => {
    const loadServices = async () => {
      setIsLoading(true);
      try {
        const data = await fetchServices(filter);
        setServices(data)
      } catch (err) {
        toast({
          title: "Error",
          description: "Failed to load services. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }

    loadServices();
  }, [filter])


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

  if (isLoading) {
    return <LoadingPage />
  }

  return (
    <section
      className={`${isServicesPage ? "bg-transparent py-10" : "bg-white py-20 px-4 md:px-16"}`}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
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
                onClick={() => router.push(`/services/${service.slug}`)}
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
                  onClick={() => router.push(`/services/${service.slug}`)}
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