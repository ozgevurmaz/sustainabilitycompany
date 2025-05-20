"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { AdminLinksType } from "@/lib/types/types";
import { toast } from "@/hooks/use-toast";

import EmailForm from "@/components/admin/Settings/EmailForm";
import PasswordForm from "@/components/admin/Settings/PasswordForm";
import SocialLinksForm from "@/components/admin/Settings/LinksForm";
import { setCachedActivities } from "@/lib/cache";

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const DEFAULT_PASS: PasswordData = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export default function AdminSettings() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<{
    email: boolean;
    password: boolean;
    links: boolean;
  }>({
    email: false,
    password: false,
    links: false,
  });
  const [saveSuccess, setSaveSuccess] = useState<{
    email: boolean;
    password: boolean;
    links: boolean;
  }>({
    email: false,
    password: false,
    links: false,
  });

  const [email, setEmail] = useState<string>("");
  const [links, setLinks] = useState<AdminLinksType>({
    facebookUrl: "",
    twitterUrl: "",
    instagramUrl: "",
    linkedinUrl: ""
  });
  const [passData, setPassData] = useState<PasswordData>(DEFAULT_PASS);
  const [passwordError, setPasswordError] = useState<string>("");

  useEffect(() => {
    if (status === "authenticated") {
      if (session?.user?.role !== "admin") {
        router.push("/admin/login");
      } else {
        loadUserData();
      }
    } else if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [session, status, router]);

  // Load user data
  const loadUserData = async () => {
    try {
      const res = await fetch("/api/admin/links");
      if (!res.ok) {
        throw new Error("Error fetching data");
      }

      const data = await res.json();
      setEmail(data.email || "");
      setLinks({
        facebookUrl: data.facebook || "",
        twitterUrl: data.twitter || "",
        instagramUrl: data.instagram || "",
        linkedinUrl: data.linkedin || ""
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load settings data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);

    if (saveSuccess.email) {
      setSaveSuccess(prev => ({ ...prev, email: false }));
    }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPassData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (passwordError) {
      setPasswordError("");
    }

    if (saveSuccess.password) {
      setSaveSuccess(prev => ({ ...prev, password: false }));
    }
  };

  const handleLinksChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLinks((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (saveSuccess.links) {
      setSaveSuccess(prev => ({ ...prev, links: false }));
    }
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (): boolean => {
    if (!passData.currentPassword) {
      setPasswordError("Current password is required");
      return false;
    }

    if (passData.newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters");
      return false;
    }

    if (passData.newPassword !== passData.confirmPassword) {
      setPasswordError("New passwords do not match");
      return false;
    }

    return true;
  };

  const isValidUrl = (url: string): boolean => {
    if (!url) return true;

    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const validateLinks = (): boolean => {
    const urlsToValidate = [
      { name: 'LinkedIn', url: links.linkedinUrl },
      { name: 'Facebook', url: links.facebookUrl },
      { name: 'Twitter', url: links.twitterUrl },
      { name: 'Instagram', url: links.instagramUrl }
    ];

    for (const item of urlsToValidate) {
      if (item.url && !isValidUrl(item.url)) {
        toast({
          title: "Invalid URL",
          description: `Please enter a valid URL for ${item.name}`,
          variant: "destructive",
        });
        return false;
      }
    }

    return true;
  };

  // Handle save functions

  const handleSaveEmail = async () => {
    if (!validateEmail(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(prev => ({ ...prev, email: true }));

    try {
      const response = await fetch("/api/admin/email", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newEmail: email })
      });

      if (!response.ok) {
        throw new Error("Failed to update email");
      }

      toast({
        title: "Email Updated",
        description: "Your email has been updated successfully.",
      });

      setSaveSuccess(prev => ({ ...prev, email: true }));

      setTimeout(() => {
        setSaveSuccess(prev => ({ ...prev, email: false }));
      }, 3000);

    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update email",
        variant: "destructive",
      });
    } finally {
      setCachedActivities(null);
      setIsSaving(prev => ({ ...prev, email: false }));
    }
  };

  const handleSavePassword = async () => {
    if (!validatePassword()) {
      return;
    }

    setIsSaving(prev => ({ ...prev, password: true }));

    try {
      const response = await fetch("/api/admin/password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: passData.currentPassword,
          newPassword: passData.newPassword
        })
      });

      if (!response.ok) {
        const data = await response.json();
        if (data.message) {
          setPasswordError(data.message);
          throw new Error(data.message);
        } else {
          throw new Error("Failed to update password");
        }
      }

      toast({
        title: "Password Updated",
        description: "Your password has been updated successfully.",
      });

      setPassData(DEFAULT_PASS);
      setSaveSuccess(prev => ({ ...prev, password: true }));

      setTimeout(() => {
        setSaveSuccess(prev => ({ ...prev, password: false }));
      }, 3000);

    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update password",
        variant: "destructive",
      });
    } finally {
      setCachedActivities(null);
      setIsSaving(prev => ({ ...prev, password: false }));
    }
  };

  const handleSaveLinks = async () => {
    if (!validateLinks()) {
      return;
    }

    setIsSaving(prev => ({ ...prev, links: true }));

    try {
      const response = await fetch("/api/admin/links", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          linkedin: links.linkedinUrl,
          facebook: links.facebookUrl,
          twitter: links.twitterUrl,
          instagram: links.instagramUrl
        })
      });

      if (!response.ok) {
        throw new Error("Failed to update social media links");
      }

      toast({
        title: "Links Updated",
        description: "Your social media links have been updated successfully.",
      });

      setSaveSuccess(prev => ({ ...prev, links: true }));

      setTimeout(() => {
        setSaveSuccess(prev => ({ ...prev, links: false }));
      }, 3000);

    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update social media links",
        variant: "destructive",
      });
    } finally {
      setCachedActivities(null);
      setIsSaving(prev => ({ ...prev, links: false }));
    }
  };


  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-6 sm:py-8 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8">
          <div className="flex items-start mb-4 sm:mb-0">
            <Link href="/admin" className="mr-2">
              <Button variant="ghost" className="px-2 h-9">
                <ArrowLeft className="h-4 w-4 mr-1" />
                <span className="text-sm">Back</span>
              </Button>
            </Link>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Account Settings</h2>
              <p className="text-sm text-gray-600">
                Update your account information and social media links
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6 md:space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">

            <EmailForm
              email={email}
              onEmailChange={handleEmailChange}
              onSave={handleSaveEmail}
              isSaving={isSaving.email}
              saveSuccess={saveSuccess.email}
            />

            <PasswordForm
              passwordData={passData}
              onPasswordChange={handlePasswordChange}
              onSave={handleSavePassword}
              isSaving={isSaving.password}
              saveSuccess={saveSuccess.password}
              error={passwordError}
            />
          </div>

          <SocialLinksForm
            links={links}
            onLinksChange={handleLinksChange}
            onSave={handleSaveLinks}
            isSaving={isSaving.links}
            saveSuccess={saveSuccess.links}
          />

        </div>
      </main>
    </div>
  );
}