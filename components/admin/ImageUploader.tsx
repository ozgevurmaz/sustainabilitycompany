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
    console.log("Cloudinary Result:", result);
    if (result.event === "success" && result.info.secure_url) {
      onChange(result.info.secure_url);
    }
  };

  return (
    <div>
      {value && (
        <div className="relative mb-4 w-[300px] h-[200px] overflow-hidden rounded-md">
          <Image src={value} alt="Uploaded" layout="fill" className="object-cover" />
          <Button onClick={onRemove} className="absolute top-2 right-2 bg-red-600 rounded-full text-white p-1">
            <X />
          </Button>
        </div>
      )}

      <CldUploadWidget 
        uploadPreset="fxoxzzan"
        options={{ cloudName: 'dybcjpr1u'}} 
        onSuccess={(result: any) => onUpload(result)}
      >
        {({ open }) => (
          <Button
            onClick={() => open()}
            className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2"
          >
            <CloudUpload />
            {value ? "Change Image" : "Upload Image"}
          </Button>
        )}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUploader;
