"use client"

import React from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { CloudUpload, X } from "lucide-react";
import Image from "next/image";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  onRemove: () => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ value, onChange, onRemove }) => {

  const onUpload = (result: any) => {

    if (result.info && result.info.secure_url) {
      onChange(result.info.secure_url);
    }
  };

  return (
    <div className="relative">
      {value && (
        <div className="relative mb-4 w-[200px] h-[150px] overflow-hidden rounded-md">
          <Image src={value} alt="Uploaded" fill className="object-cover" />
          <Button onClick={onRemove} className="absolute top-2 right-2 bg-red-600 rounded-full text-white p-1">
            <X />
          </Button>
        </div>
      )}

      <div className="relative">
        <CldUploadWidget
          uploadPreset="fxoxzzan"
          onSuccess={(result) => onUpload(result)}
          options={{
            maxFiles: 1,
            cloudName: 'dybcjpr1u',
            sources: ['local', 'url', 'camera'  ],
            multiple: false,
            styles: {
              palette: {
                window: "#FFFFFF",
                windowBorder: "#90A0B3",
                tabIcon: "#0078FF",
                menuIcons: "#5A616A",
                textDark: "#000000",
                textLight: "#FFFFFF",
                link: "#0078FF",
                action: "#FF620C",
                inactiveTabIcon: "#0E2F5A",
                error: "#F44235",
                inProgress: "#0078FF",
                complete: "#20B832",
                sourceBg: "#E4EBF1"
              },
              fonts: {
                default: null,
                "'IBM Plex Sans', sans-serif": {
                  url: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap",
                  active: true
                }
              }
            }
          }}
        >
          {({ open }) => (
            <Button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (open) {
                  open();
                }
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2"
            >
              <CloudUpload className="h-4 w-4" />
              {value ? "Change Image" : "Upload Image"}
            </Button>
          )}
        </CldUploadWidget>
      </div>
    </div>
  );
};

export default ImageUploader;
