import { prisma } from "@/lib/prisma";
import { ProductForm } from "@/components/ProductForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function CreateProductPage() {
  // Fetch categories for the dropdown
  const categories = await prisma.category.findMany();

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-8 bg-slate-50/50 min-h-screen">
      
      {/* Header Section */}
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/products"
          className="group flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition-all hover:border-slate-300 hover:shadow-md"
        >
          <ArrowLeft className="h-4 w-4 text-slate-500 transition-colors group-hover:text-slate-900" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Add New Product
          </h1>
          <p className="text-sm text-slate-500">
            Create a new item in your inventory.
          </p>
        </div>
      </div>

      {/* Form Component */}
      <ProductForm categories={categories} />
    </div>
  );
}