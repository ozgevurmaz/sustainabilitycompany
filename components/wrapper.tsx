'use client';

import { ReactNode } from "react";
import Footer from "./footer";
import Navbar from "./navbar";


export default function Wrapper({children}: {children : ReactNode}) {

    return (
        <div>
            <Navbar />
            <div className="min-h-screen">
                {children}
            </div>
            <Footer />
        </div>
    );
}