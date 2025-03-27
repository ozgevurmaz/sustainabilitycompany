import React from 'react'
import { Card, CardContent } from '../ui/card'
import { usePathname, useRouter } from 'next/navigation'
import { ServicesType } from '@/lib/types/types'

interface ServicesSectionProps {
    services: ServicesType[];
  }

const ServicesSection: React.FC<ServicesSectionProps> = ({ services }) => {
    const pathname = usePathname();
    const router = useRouter();

    const isServicesPage = pathname === "/services"
    return (
        <section className={`${isServicesPage ? "bg-transparent py-10" : "bg-green-100 py-20"}`}>
            <div className="container mx-auto px-4">
                <h2 className={`text-3xl md:text-4xl font-bold "text-gray-900"  text-center mb-12`}>Our Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services && services.map((service, index) => (
                        <Card
                            key={index}
                            className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 hover:scale-[102%]"
                            onClick={()=>router.push(`/services/${service.id}`)}
                        >
                            <CardContent className="p-6">
                                <div style={{ backgroundColor: service.color }} className="w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                    <service.icon className="w-6 h-6 text-gray-700" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                                <p className="text-gray-600">{service.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ServicesSection