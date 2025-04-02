import React from 'react'
import { Star } from 'lucide-react'
import { Card, CardContent } from '../ui/card'
import Image from 'next/image'

import {dummyTestimonials} from "@/lib/constant/index"


const Testimonial = () => {
  return (
    <section className="py-20 bg-green-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">What Our Clients Say</h2>
          
          <div className="grid grid-rows-1 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dummyTestimonials.map((testimonial) => (
              <Card key={testimonial.id} className={`border-none shadow-lg bg-white transition-all duration-300`}>
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(Math.floor(testimonial.rating))].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                    {testimonial.rating % 1 !== 0 && (
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 opacity-50" />
                    )}
                  </div>
                  
                  <p className="text-gray-700 italic mb-6">"{testimonial.comment}"</p>
                  
                  <div className="flex items-center">
                  
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.position}, {testimonial.company}</p>
                    </div>
                  </div>
                  
                  {testimonial.featured && (
                    <div className="mt-4 inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      Featured Testimonial
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          
        </div>
      </section>
  )
}

export default Testimonial