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
import { Loader2, Save, CheckCircle2, Mail } from "lucide-react";

interface EmailFormProps {
  email: string;
  onEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  isSaving: boolean;
  saveSuccess: boolean;
}

export default function EmailForm({
  email,
  onEmailChange,
  onSave,
  isSaving,
  saveSuccess,
}: EmailFormProps) {
  return (
    <Card className="shadow-sm hover:shadow transition-shadow duration-200">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center text-lg sm:text-xl">
          <Mail className="h-5 w-5 mr-2 text-blue-500" />
          Email Settings
        </CardTitle>
        <CardDescription>
          Update your email address
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              name="email"
              autoComplete="off"
              value={email}
              onChange={onEmailChange}
              className="focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs sm:text-sm text-gray-500">
              This email will be used for account notifications and login
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={onSave} 
          disabled={isSaving}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isSaving ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
        {saveSuccess && (
          <div className="ml-4 text-sm text-green-600 flex items-center">
            <CheckCircle2 className="h-4 w-4 mr-1" />
            Email updated
          </div>
        )}
      </CardFooter>
    </Card>
  );
}