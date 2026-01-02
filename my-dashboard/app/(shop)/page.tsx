import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function ShopPage() {
  const products = await prisma.product.findMany({
    where: { stock: { gt: 0 } }, 
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          New Arrivals
        </h1>
        <p className="mt-4 text-gray-500">
          Check out our latest collection of premium products.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <Link 
            key={product.id} 
            href={`/product/${product.id}`}
            className="group"
          >
            <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100 relative">
              {product.images[0] ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-gray-300">
                  No Image
                </div>
              )}
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700 font-medium">
                  {product.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Available
                </p>
              </div>
              <p className="text-sm font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}