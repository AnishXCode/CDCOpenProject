"use client";

import { CldUploadWidget } from "next-cloudinary";
import { Trash2, UploadCloud } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

export function ImageUpload({
  value,
  onChange,
  onRemove,
}: ImageUploadProps) {
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  return (
    <div className="space-y-6">
      
      {value.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {value.map((url) => (
            <div 
              key={url} 
              className="group relative aspect-square overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
            >
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <button
                  type="button"
                  onClick={() => onRemove(url)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-red-500 shadow-lg transition-transform hover:scale-110 hover:bg-red-50"
                  title="Remove Image"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
              
              <Image 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110" 
                alt="Uploaded image" 
                src={url} 
              />
            </div>
          ))}
        </div>
      )}
      
      <CldUploadWidget 
        uploadPreset="SSRAdminDashboard" 
        onSuccess={onUpload}
        options={{
          maxFiles: 5,
          resourceType: "image",
          sources: ["local", "url", "camera"]
        }}
      >
        {({ open }) => {
          return (
            <button
              type="button"
              onClick={() => open()}
              className="group relative flex w-full flex-col items-center justify-center gap-4 rounded-3xl border-2 border-dashed border-gray-200 bg-gray-50/50 py-12 transition-all hover:border-violet-400 hover:bg-violet-50/30 focus:outline-none focus:ring-4 focus:ring-violet-100"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-md group-hover:ring-violet-200">
                <UploadCloud className="h-8 w-8 text-gray-400 transition-colors group-hover:text-violet-600" />
              </div>
              
              <div className="text-center space-y-1">
                <p className="text-sm font-bold text-gray-900 group-hover:text-violet-700">
                  Click to upload media
                </p>
                <p className="text-xs font-medium text-gray-400">
                  SVG, PNG, JPG or GIF (max 5MB)
                </p>
              </div>
            </button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}