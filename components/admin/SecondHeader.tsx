import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { ArrowLeft, Plus } from 'lucide-react'

const SecondHeader = ({ dialogOpen, pageTitle }: { dialogOpen?: () => void, pageTitle: string }) => {
    return (
        <header className="bg-white shadow">
            <div className="container mx-auto px-4 py-3 sm:py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
                <div className="flex items-center w-full sm:w-auto">
                    <Link href="/admin" className="mr-2 sm:mr-4">
                        <Button variant="ghost" className="px-2 sm:px-4 h-9">
                            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                            <span className="text-sm sm:text-base">Back</span>
                        </Button>
                    </Link>
                    <h1 className="text-lg sm:text-xl font-bold text-green-700 truncate">
                        Manage {pageTitle}
                    </h1>
                </div>
                {dialogOpen &&
                    <Button
                        onClick={() => dialogOpen()}
                        className="w-full sm:w-auto"
                    >
                        <Plus className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                        Add New <span className="ml-1">{pageTitle}</span>
                    </Button>}
            </div>
        </header>
    )
}

export default SecondHeader