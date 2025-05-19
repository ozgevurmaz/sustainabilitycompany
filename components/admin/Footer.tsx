import React from "react";
import Link from "next/link";
import { LogOut, HelpCircle, Settings, Info, Coffee, Heart } from "lucide-react";

export default function AdminFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-gray-200">
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* First column - Links */}
                    <div>
                        <h4 className="text-sm font-semibold text-gray-600 mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/admin" className="text-sm text-gray-500 hover:text-green-600 flex items-center">
                                    <span>Dashboard</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/admin/settings" className="text-sm text-gray-500 hover:text-green-600 flex items-center">
                                    <Settings className="h-4 w-4 mr-2" />
                                    <span>Admin Settings</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/admin/help" className="text-sm text-gray-500 hover:text-green-600 flex items-center">
                                    <HelpCircle className="h-4 w-4 mr-2" />
                                    <span>Help Center</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/logout" className="text-sm text-gray-500 hover:text-green-600 flex items-center">
                                    <LogOut className="h-4 w-4 mr-2" />
                                    <span>Logout</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Second column - View site */}
                    <div>
                        <h4 className="text-sm font-semibold text-gray-600 mb-4">View Website</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-sm text-gray-500 hover:text-green-600">
                                    Homepage
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="text-sm text-gray-500 hover:text-green-600">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="/services" className="text-sm text-gray-500 hover:text-green-600">
                                    Services
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-sm text-gray-500 hover:text-green-600">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Third column - System info */}
                    <div>
                        <h4 className="text-sm font-semibold text-gray-600 mb-4">System Information</h4>
                        <div className="text-sm text-gray-500 flex items-center">
                            <Info className="h-4 w-4 mr-2" />
                            <span>Version: 1.2.4</span>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 pt-4 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-gray-500">
                        © {currentYear} FutureFootprint Admin Dashboard. All rights reserved.
                    </p>
                    <div className="mt-4 md:mt-0 flex items-center">
                        <p className="text-sm text-gray-500 flex items-center">
                            <span>Made with</span>
                            <Heart className="h-4 w-4 mx-1 text-red-500" />
                            <span>and</span>
                            <Coffee className="h-4 w-4 mx-1 text-amber-700" />
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}