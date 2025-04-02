import { ArrowRight, LucideIcon } from 'lucide-react'
import Link from 'next/link';
import React from 'react'

const InformationCards = ({ icon, title, desc, className, href }: { icon: LucideIcon, title: string, desc: string, className: string, href?:string }) => {
    const Icon = icon;
    return (
        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all">
            <div className={` w-14 h-14 flex items-center justify-center mb-4 ${className}`}>
                <Icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
            <p className="text-gray-700">{desc}</p>
            {href && <Link href={href} className="flex items-center text-green-600 font-medium opacity-0 transform -translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
              Learn more <ArrowRight className="ml-1 h-4 w-4" />
            </Link>}
        </div>
    )
}

export default InformationCards