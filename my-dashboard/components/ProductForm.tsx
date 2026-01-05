"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProduct, updateProduct } from "@/lib/actions";
import { productSchema } from "@/lib/validations";
import { ImageUpload } from "@/components/ImageUpload";
import { useState, useTransition } from "react";
import { ImageIcon, Save, AlertCircle, Tag, FileText, Package, IndianRupee } from "lucide-react";

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
      price: "", 
      stock: "",
      categoryId: "",
    },
  });

  const onSubmit = handleSubmit((data) => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", String(data.price));
      formData.append("stock", String(data.stock));
      formData.append("categoryId", data.categoryId);
      
      images.forEach((url) => formData.append("images", url));

      if (initialData) {
        await updateProduct(initialData.id, formData);
      } else {
        await createProduct(formData);
      }
    });
  });

  const inputClass = "w-full rounded-xl bg-gray-50 border-none px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-violet-500 transition-all";
  const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500 ml-1";

  return (
    <form onSubmit={onSubmit} className="space-y-10">
      
      <div>
        <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                <ImageIcon className="h-5 w-5" />
            </div>
            <div>
                <h3 className="text-lg font-bold text-gray-900">Product Visuals</h3>
                <p className="text-sm text-gray-500">Upload product shots to showcase your item.</p>
            </div>
        </div>

        <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50/50 p-6">
            <ImageUpload
            value={images}
            onChange={(url) => setImages((prev) => [...prev, url])}
            onRemove={(url) => setImages((prev) => prev.filter((i) => i !== url))}
            />
        </div>
      </div>

      <div className="h-px w-full bg-gray-100" />

      <div>
        <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900">General Information</h3>
            <p className="text-sm text-gray-500">Basic details about your product.</p>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
          
          <div className="col-span-2">
            <label className={labelClass}>Product Name</label>
            <div className="relative">
                <input
                {...register("name")}
                className={inputClass}
                placeholder="e.g. Ergonomic Office Chair"
                />
            </div>
            {errors.name && (
              <p className="mt-2 flex items-center gap-1 text-xs font-medium text-red-500">
                <AlertCircle className="h-3 w-3" /> {String(errors.name.message)}
              </p>
            )}
          </div>

          <div className="col-span-2 md:col-span-1">
            <label className={labelClass}>Category</label>
            <div className="relative">
                <select {...register("categoryId")} className={`${inputClass} appearance-none`}>
                <option value="">Select Category</option>
                {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                    {cat.name}
                    </option>
                ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500">
                    <Tag className="h-4 w-4" />
                </div>
            </div>
            {errors.categoryId && (
              <p className="mt-2 flex items-center gap-1 text-xs font-medium text-red-500">
                <AlertCircle className="h-3 w-3" /> {String(errors.categoryId.message)}
              </p>
            )}
          </div>

          {/* Stock */}
          <div className="col-span-2 md:col-span-1">
            <label className={labelClass}>Stock Level</label>
            <div className="relative">
                <input
                type="number"
                {...register("stock", { valueAsNumber: true })}
                className={inputClass}
                placeholder="0"
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500">
                    <Package className="h-4 w-4" />
                </div>
            </div>
            {errors.stock && (
              <p className="mt-2 flex items-center gap-1 text-xs font-medium text-red-500">
                <AlertCircle className="h-3 w-3" /> {String(errors.stock.message)}
              </p>
            )}
          </div>

          <div className="col-span-2 md:col-span-1">
            <label className={labelClass}>Base Price</label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
                <IndianRupee className="h-4 w-4" />
              </div>
              <input
                type="number"
                step="0.01"
                {...register("price", { valueAsNumber: true })}
                className={`${inputClass} pl-10`} 
                placeholder="0.00"
              />
            </div>
            {errors.price && (
              <p className="mt-2 flex items-center gap-1 text-xs font-medium text-red-500">
                <AlertCircle className="h-3 w-3" /> {String(errors.price.message)}
              </p>
            )}
          </div>

          <div className="col-span-2">
            <label className={labelClass}>Description</label>
            <div className="relative">
                <textarea
                {...register("description")}
                rows={4}
                className={`${inputClass} min-h-[120px] resize-y`}
                placeholder="Write a compelling description..."
                />
                <div className="pointer-events-none absolute right-4 top-4 text-gray-400">
                    <FileText className="h-4 w-4" />
                </div>
            </div>
            {errors.description && (
              <p className="mt-2 flex items-center gap-1 text-xs font-medium text-red-500">
                <AlertCircle className="h-3 w-3" /> {String(errors.description.message)}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 border-t border-gray-100 pt-6">
        <button
            type="button"
            className="rounded-xl px-6 py-3 text-sm font-semibold text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
        >
            Cancel
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-2 rounded-xl bg-violet-600 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-violet-200 transition-all hover:bg-violet-700 hover:shadow-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 active:scale-95"
        >
          {isPending ? (
            <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span>Processing...</span>
            </div>
          ) : (
            <>
              <Save className="h-4 w-4" />
              {initialData ? "Save Changes" : "Publish Product"}
            </>
          )}
        </button>
      </div>
    </form>
  );
}