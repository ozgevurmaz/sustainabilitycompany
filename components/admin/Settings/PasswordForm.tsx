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
import { Loader2, Save, CheckCircle2, Lock, AlertCircle } from "lucide-react";

interface PasswordData {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

interface PasswordFormProps {
    passwordData: PasswordData;
    onPasswordChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onSave: () => void;
    isSaving: boolean;
    saveSuccess: boolean;
    error: string;
}

export default function PasswordForm({
    passwordData,
    onPasswordChange,
    onSave,
    isSaving,
    saveSuccess,
    error,
}: PasswordFormProps) {
    return (
        <Card className="shadow-sm hover:shadow transition-shadow duration-200">
            <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-lg sm:text-xl">
                    <Lock className="h-5 w-5 mr-2 text-purple-500" />
                    Password Settings
                </CardTitle>
                <CardDescription>
                    Update your account password
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input
                            id="currentPassword"
                            type="password"
                            name="currentPassword"
                            value={passwordData.currentPassword}
                            onChange={onPasswordChange}
                            autoComplete="off"
                            placeholder="Enter your current password"
                            className="focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                            id="newPassword"
                            type="password"
                            name="newPassword"
                            value={passwordData.newPassword}
                            onChange={onPasswordChange}
                            placeholder="Enter your new password"
                            className="focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            name="confirmPassword"
                            value={passwordData.confirmPassword}
                            onChange={onPasswordChange}
                            placeholder="Confirm your new password"
                            className="focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    {error && (
                        <div className="text-sm text-red-500 flex items-center mt-2">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {error}
                        </div>
                    )}
                </div>
            </CardContent>
            <CardFooter>
                <Button
                    onClick={onSave}
                    disabled={isSaving}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                    {isSaving ? (
                        <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        <>
                            <Save className="h-4 w-4 mr-2" />
                            Update Password
                        </>
                    )}
                </Button>
                {saveSuccess && (
                    <div className="ml-4 text-sm text-green-600 flex items-center">
                        <CheckCircle2 className="h-4 w-4 mr-1" />
                        Password updated
                    </div>
                )}
            </CardFooter>
        </Card>
    );
}