import { prisma } from "@/lib/prisma";
import { ProductForm } from "@/components/ProductForm";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Pencil } from "lucide-react";

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
    <div className="min-h-screen bg-gray-50 p-8 font-sans text-gray-900">
      
      <div className="mx-auto max-w-3xl">
        
        <div className="mb-8">
            <Link
              href="/dashboard/products"
              className="mb-6 inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-medium text-gray-500 shadow-sm ring-1 ring-gray-200 transition-all hover:text-violet-600 hover:ring-violet-200"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Inventory
            </Link>

            <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-xl shadow-violet-200">
                    <Pencil className="h-6 w-6" />
                </div>
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                        Edit Product
                    </h1>
                    <p className="mt-1 text-sm font-medium text-gray-500">
                        Updating details for <span className="font-bold text-violet-600">“{product.name}”</span>
                    </p>
                </div>
            </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl shadow-gray-200/50">
            <div className="p-8">
                <ProductForm categories={categories} initialData={product} />
            </div>
        </div>
      </div>
    </div>
  );
}