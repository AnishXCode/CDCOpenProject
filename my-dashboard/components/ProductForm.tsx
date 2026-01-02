"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProduct, updateProduct } from "@/lib/actions";
import { productSchema } from "@/lib/validations";
import { ImageUpload } from "@/components/ImageUpload";
import { useState, useTransition } from "react";
import { ImageIcon, Save, AlertCircle } from "lucide-react";

interface ProductFormProps {
  categories: { id: string; name: string }[];
  initialData?: any;
}

export function ProductForm({ categories, initialData }: ProductFormProps) {
  const [images, setImages] = useState<string[]>(initialData?.images || []);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      price: "", // Initialize as empty string to avoid "0" showing up
      stock: "",
      categoryId: "",
    },
  });

  const onSubmit = handleSubmit((data) => {
    startTransition(async () => {
      // Create a FormData object to pass to the server action
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", String(data.price));
      formData.append("stock", String(data.stock));
      formData.append("categoryId", data.categoryId);
      
      // Append images individually
      images.forEach((url) => formData.append("images", url));

      if (initialData) {
        await updateProduct(initialData.id, formData);
      } else {
        await createProduct(formData);
      }
    });
  });

  // Reusable input class
  const inputClass = "mt-1.5 flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all";

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-4xl space-y-8">
      
      {/* Section 1: Media / Images */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2 border-b border-slate-100 pb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <ImageIcon className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-900">Product Images</h3>
            <p className="text-xs text-slate-500">Upload high quality images for your product.</p>
          </div>
        </div>

        <ImageUpload
          value={images}
          onChange={(url) => setImages((prev) => [...prev, url])}
          onRemove={(url) => setImages((prev) => prev.filter((i) => i !== url))}
        />
      </div>

      {/* Section 2: Product Details */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          
          {/* Name */}
          <div className="col-span-2 md:col-span-1">
            <label className="text-sm font-medium leading-none text-slate-700">Product Name</label>
            <input
              {...register("name")}
              className={inputClass}
              placeholder="e.g. Premium Wireless Headphones"
            />
            {errors.name && (
              <p className="mt-1 flex items-center gap-1 text-xs font-medium text-red-500">
                <AlertCircle className="h-3 w-3" /> {String(errors.name.message)}
              </p>
            )}
          </div>

          {/* Category */}
          <div className="col-span-2 md:col-span-1">
            <label className="text-sm font-medium leading-none text-slate-700">Category</label>
            <select
              {...register("categoryId")}
              className={inputClass}
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="mt-1 flex items-center gap-1 text-xs font-medium text-red-500">
                <AlertCircle className="h-3 w-3" /> {String(errors.categoryId.message)}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="col-span-2">
            <label className="text-sm font-medium leading-none text-slate-700">Description</label>
            <textarea
              {...register("description")}
              rows={4}
              className={`${inputClass} h-auto min-h-[100px] resize-y`}
              placeholder="Describe your product..."
            />
            {errors.description && (
              <p className="mt-1 flex items-center gap-1 text-xs font-medium text-red-500">
                <AlertCircle className="h-3 w-3" /> {String(errors.description.message)}
              </p>
            )}
          </div>

          <div className="col-span-2 h-px bg-slate-100 my-2" />

          {/* Price */}
          <div>
            <label className="text-sm font-medium leading-none text-slate-700">Price</label>
            <div className="relative mt-1.5">
              <span className="absolute left-3 top-2.5 text-slate-500 font-sans">₹</span>
              <input
                type="number"
                step="0.01"
                {...register("price", { valueAsNumber: true })}
                className={`${inputClass} pl-7`} 
                placeholder="0.00"
              />
            </div>
            {errors.price && (
              <p className="mt-1 flex items-center gap-1 text-xs font-medium text-red-500">
                <AlertCircle className="h-3 w-3" /> {String(errors.price.message)}
              </p>
            )}
          </div>

          {/* Stock */}
          <div>
            <label className="text-sm font-medium leading-none text-slate-700">Stock Inventory</label>
            <input
              type="number"
              {...register("stock", { valueAsNumber: true })}
              className={inputClass}
              placeholder="0"
            />
            {errors.stock && (
              <p className="mt-1 flex items-center gap-1 text-xs font-medium text-red-500">
                <AlertCircle className="h-3 w-3" /> {String(errors.stock.message)}
              </p>
            )}
          </div>

        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? (
            <>Saving...</>
          ) : (
            <>
              <Save className="h-4 w-4" />
              {initialData ? "Save Changes" : "Create Product"}
            </>
          )}
        </button>
      </div>
    </form>
  );
}