import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TestimonialType } from '@/lib/types/types'
import { MessageSquare, Star, StarHalf, UserCircle2 } from 'lucide-react'
import React from 'react'

export const renderRatingStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
        stars.push(<Star key={`full-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
        stars.push(<StarHalf key="half" className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
    }

    return <div className="flex">{stars}</div>;
};

const TestimonialCard = ({testimonial}: { testimonial: TestimonialType }) => {

    return (
        <Card className="overflow-hidden">
            <CardHeader className="pb-0">
                <div className="flex justify-between items-start">
                    <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-3 overflow-hidden">
                            {testimonial.imageUrl ? (
                                <img src={testimonial.imageUrl} alt={testimonial.name} className="w-full h-full object-cover" />
                            ) : (
                                <UserCircle2 className="w-8 h-8 text-gray-400" />
                            )}
                        </div>
                        <div>
                            <CardTitle className="text-base">{testimonial.name}</CardTitle>
                            <CardDescription className="text-xs">
                                {testimonial.position} at {testimonial.company}
                            </CardDescription>
                        </div>
                    </div>
                    <div>
                        {renderRatingStars(testimonial.rating)}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pt-4">
                <div className="relative">
                    <MessageSquare className="absolute top-0 left-0 w-8 h-8 text-gray-200 -z-10" />
                    <p className="text-sm text-gray-700 pl-6 line-clamp-4">
                        "{testimonial.comment}"
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}

export default TestimonialCard