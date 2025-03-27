import { ComponentType } from "react";
import { LucideIcon } from "lucide-react";

export type HeroSectionType = {
    title: string;
    subtitle: string;
    image: string;
}

export type FormTypes = {
    name: string;
    email: string;
    title: string;
    message: string;
}

export type ServicesType = {
    id: string;
    title: string;
    description: string;
    content: string;
    importance: string;
    benefits: string[];
    imageUrl: string;
    icon: LucideIcon;
    color: string;
}