'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { productSchema } from "@/lib/validations";
import { signOut } from "@/auth";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirectTo: '/dashboard',
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function handleLogout() {
  await signOut({ redirectTo: "/login" });
}

export async function deleteProduct(formData: FormData) {
  const id = formData.get("id") as string;
  if (!id) return;

  try {
    await prisma.product.delete({
      where: { id },
    });
    revalidatePath("/dashboard/products");
  } catch (error) {
    console.error("Failed to delete product:", error);
  }
}

export async function createProduct(formData: FormData) {
  const rawData = {
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    stock: formData.get("stock"),
    categoryId: formData.get("categoryId"),
    images: formData.getAll("images") as string[], 
  };

  const validatedData = productSchema.safeParse(rawData);

  if (!validatedData.success) {
    console.error(validatedData.error);
    return;
  }

  try {
    await prisma.product.create({
      data: {
        ...validatedData.data,
        images: validatedData.data.images || [], 
      },
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to create product.");
  }

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
}

export async function updateProduct(id: string, formData: FormData) {
  const rawData = {
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    stock: formData.get("stock"),
    categoryId: formData.get("categoryId"),
    images: formData.getAll("images") as string[],
  };

  const validatedData = productSchema.safeParse(rawData);

  if (!validatedData.success) {
    console.error("Validation Failed:", validatedData.error);
    return;
  }

  try {
    await prisma.product.update({
      where: { id },
      data: {
        ...validatedData.data,
        images: validatedData.data.images || [],
      },
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to update product.");
  }

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
}