import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

const Footer = () => {
const router = useRouter();

  return (
    <footer className="bg-gray-900 text-white py-12">
    <div className="container mx-auto px-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Future Footprint</h2>
        <p className="text-gray-400 mb-6">Building a sustainable future, together.</p>
        <div className="flex justify-center space-x-6">
          <Button variant="outline" className="border-white text-black hover:bg-white" onClick={()=>router.push("/contact")}>
            Contact Us
          </Button>
          <Button variant="outline" className="border-white text-black hover:bg-white" onClick={()=>router.push("/blog")}>
            Newsletter
          </Button>
        </div>
        <div className="mt-8 text-gray-400">
          &copy; {new Date().getFullYear()} Future Footprint. All rights reserved.
        </div>
      </div>
    </div>
  </footer>
  )
}

export default Footer