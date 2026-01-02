import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { placeOrder } from "@/lib/actions"; 

export default async function ProductPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params

  const product = await prisma.product.findUnique({
    where: { id: params.id },
  });

  if (!product) return notFound();

  async function buyNow(formData: FormData) {
    "use server";
    await placeOrder(product!.id, 1, product!.price);
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
          {product.images[0] && (
            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
          )}
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-2xl font-medium text-gray-900">${product.price.toFixed(2)}</p>
          
          <div className="prose prose-sm text-gray-500">
            <p>{product.description}</p>
          </div>

          <form action={buyNow}>
            <button 
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition"
            >
              Buy Now
            </button>
            <p className="text-xs text-center mt-2 text-gray-400">
              *For demo, this creates an instant order using your logged-in email.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}