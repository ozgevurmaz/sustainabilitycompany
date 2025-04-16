import { Loader2 } from 'lucide-react'
import React from 'react'

const LoadingPage = () => {
  return (
    <div className="flex justify-center items-center h-64">
            <div className="flex flex-col items-center space-y-2">
              <Loader2 className="h-8 w-8 animate-spin text-green-600" />
              <p className="text-gray-500">Loading service data...</p>
            </div>
          </div>
  )
}

export default LoadingPage