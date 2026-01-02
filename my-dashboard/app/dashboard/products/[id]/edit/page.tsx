import { prisma } from "@/lib/prisma";
import { ProductForm } from "@/components/ProductForm";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function EditProductPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;

  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id: params.id } }),
    prisma.category.findMany(),
  ]);

  if (!product) {
    notFound();
  }

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
            Edit Product
          </h1>
          <p className="text-sm text-slate-500">
            Update details for <span className="font-medium text-slate-700">{product.name}</span>
          </p>
        </div>
      </div>

      {/* Form Component */}
      <ProductForm categories={categories} initialData={product} />
    </div>
  );
}