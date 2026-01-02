"use client";

import { CldUploadWidget } from "next-cloudinary";
import { ImagePlus, Trash2, X } from "lucide-react";
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
    // Ensure we get the secure url from Cloudinary response
    onChange(result.info.secure_url);
  };

  return (
    <div className="space-y-4">
      {/* Image Grid */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {value.map((url) => (
            <div 
              key={url} 
              className="group relative aspect-square overflow-hidden rounded-xl border border-slate-200 bg-slate-50"
            >
              {/* Delete Button (Visible on Hover) */}
              <div className="absolute right-2 top-2 z-10 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  type="button"
                  onClick={() => onRemove(url)}
                  className="rounded-lg bg-red-500/90 p-1.5 text-white backdrop-blur-sm transition-colors hover:bg-red-600 shadow-sm"
                  title="Remove Image"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              
              <Image 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-105" 
                alt="Product Image" 
                src={url} 
              />
            </div>
          ))}
        </div>
      )}
      
      {/* Upload Widget Button */}
      <CldUploadWidget 
        uploadPreset="SSRAdminDashboard" // Make sure this matches your Cloudinary settings
        onSuccess={onUpload}
        options={{
          maxFiles: 5,
          resourceType: "image"
        }}
      >
        {({ open }) => {
          return (
            <button
              type="button"
              onClick={() => open()}
              className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/50 py-8 text-sm font-medium text-slate-600 transition-all hover:border-blue-500 hover:bg-blue-50/50 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 mb-2 transition-colors group-hover:bg-blue-100">
                <ImagePlus className="h-5 w-5" />
              </div>
              <div className="text-center">
                <span className="font-semibold">Click to upload</span>
                <span className="block text-xs text-slate-400 font-normal mt-1">
                  SVG, PNG, JPG or GIF
                </span>
              </div>
            </button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}