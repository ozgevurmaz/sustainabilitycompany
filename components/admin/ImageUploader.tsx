"use client"

import React, { useState, useCallback, useEffect } from "react";
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = useCallback((result: any) => {
    console.log("Cloudinary Result:", result); // Debugging Log
    if (result.event === "success") {
      setLoading(false);
      setError("");
      onChange(result.info.secure_url); // This should trigger form state update
    } else {
      setLoading(false);
      setError("Image upload failed. Please try again.");
    }
  }, [onChange]);

  const openWidget = useCallback(() => {
    setLoading(true);
    setError("");
  }, []);

  useEffect(() => {
    console.log("ImageUploader Value:", value);
  }, [value]);
  

  return (
    <div>
      {/* Display Uploaded Image */}
      {value.length > 0 && (
        <div className="relative mb-4 w-full h-[200px] overflow-hidden rounded-md">
          <Image src={value} alt="Uploaded" layout="fill" className="object-cover" />
          <Button onClick={onRemove} className="absolute top-2 right-2 bg-red-600 rounded-full text-white p-1">
            <X />
          </Button>
        </div>
      )}

      {/* Image Upload Button */}
      <CldUploadWidget uploadPreset="fxoxzzan" onUpload={handleUpload}>
        {({ open }) => (
          <Button
            onClick={() => {
              open();
              openWidget();
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2"
          >
            <CloudUpload />
            {value.length > 0 ? "Change Image" : "Upload Image"}
          </Button>
        )}
      </CldUploadWidget>

      {/* Loading and Error States */}
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
};

export default ImageUploader;
