"use client";

import { ChangeEvent } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Save, CheckCircle2, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

interface AdminLinksType {
    facebookUrl: string;
    twitterUrl: string;
    instagramUrl: string;
    linkedinUrl: string;
}

interface SocialLinksFormProps {
    links: AdminLinksType;
    onLinksChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onSave: () => void;
    isSaving: boolean;
    saveSuccess: boolean;
}

export default function SocialLinksForm({
    links,
    onLinksChange,
    onSave,
    isSaving,
    saveSuccess,
}: SocialLinksFormProps) {
    return (
        <Card className="shadow-sm hover:shadow transition-shadow duration-200">
            <CardHeader className="pb-4">
                <CardTitle className="text-lg sm:text-xl">Social Media Links</CardTitle>
                <CardDescription>
                    Update your social media profile URLs
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    <div className="space-y-2">
                        <div className="flex items-center mb-1">
                            <Linkedin className="h-5 w-5 mr-2 text-blue-600" />
                            <Label htmlFor="linkedinUrl">LinkedIn</Label>
                        </div>
                        <Input
                            id="linkedinUrl"
                            name="linkedinUrl"
                            value={links.linkedinUrl}
                            onChange={onLinksChange}
                            placeholder="https://linkedin.com/in/..."
                            className="focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center mb-1">
                            <Facebook className="h-5 w-5 mr-2 text-blue-600" />
                            <Label htmlFor="facebookUrl">Facebook</Label>
                        </div>
                        <Input
                            id="facebookUrl"
                            name="facebookUrl"
                            value={links.facebookUrl}
                            onChange={onLinksChange}
                            placeholder="https://facebook.com/..."
                            className="focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center mb-1">
                            <Twitter className="h-5 w-5 mr-2 text-blue-400" />
                            <Label htmlFor="twitterUrl">X / Twitter</Label>
                        </div>
                        <Input
                            id="twitterUrl"
                            name="twitterUrl"
                            value={links.twitterUrl}
                            onChange={onLinksChange}
                            placeholder="https://twitter.com/..."
                            className="focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center mb-1">
                            <Instagram className="h-5 w-5 mr-2 text-pink-500" />
                            <Label htmlFor="instagramUrl">Instagram</Label>
                        </div>
                        <Input
                            id="instagramUrl"
                            name="instagramUrl"
                            value={links.instagramUrl}
                            onChange={onLinksChange}
                            placeholder="https://instagram.com/..."
                            className="focus:ring-2 focus:ring-pink-500"
                        />
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button
                    onClick={onSave}
                    disabled={isSaving}
                    className="bg-green-600 hover:bg-green-700 text-white"
                >
                    {isSaving ? (
                        <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        <>
                            <Save className="h-4 w-4 mr-2" />
                            Save Social Links
                        </>
                    )}
                </Button>
                {saveSuccess && (
                    <div className="ml-4 text-sm text-green-600 flex items-center">
                        <CheckCircle2 className="h-4 w-4 mr-1" />
                        Social links updated
                    </div>
                )}
            </CardFooter>
        </Card>
    );
}