import { Card, CardContent } from "@/components/ui/card";
import { ServicesFormType } from "@/lib/types/types";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const ServiceCard = ({ service, onClick, variants }:{service:ServicesFormType,onClick:()
    =>void,variants:{}}) => {
    return (
      <motion.div variants={variants}>
        <Card
          className="border-none h-full shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group"
          onClick={onClick}
        >
          <CardContent className="p-0 relative w-full h-full">
            <div className="p-6">
              <div 
                style={{ backgroundColor: service.color }} 
                className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
              >
                <service.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              
              <div className="flex items-center text-green-600 font-medium opacity-0 transform -translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                Learn more <ArrowRight className="ml-1 h-4 w-4" />
              </div>
            </div>
            
            <div 
              style={{ backgroundColor: service.color }} 
              className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500"
            ></div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };
  
  export default ServiceCard;