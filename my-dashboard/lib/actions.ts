'use server';

import { signIn, auth, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { productSchema } from "@/lib/validations";
import { z } from 'zod';
import bcrypt from "bcryptjs";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
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

const createAdminSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["ADMIN", "SUPER_ADMIN"]),
});

export async function createAdmin(formData: FormData) {
  const session = await auth();
  
  if ((session?.user as any).role !== "SUPER_ADMIN") {
    console.error("Unauthorized Access Attempt");
    return { error: "Unauthorized. Only Super Admins can perform this action." };
  }

  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
  };

  const validatedData = createAdminSchema.safeParse(rawData);

  if (!validatedData.success) {
    console.error("Validation Error:", validatedData.error);
    return { error: "Invalid input data." };
  }

  const { email, password, role } = validatedData.data;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "User with this email already exists." };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: role as "ADMIN" | "SUPER_ADMIN", 
      },
    });

    console.log(`New Admin created: ${email}`);

  } catch (error) {
    console.error("Database Error:", error);
    return { error: "Failed to create admin." };
  }

  revalidatePath("/dashboard/admins");
  redirect("/dashboard/admins");
}

export async function registerUser(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Please fill in all fields." };
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return { error: "Email already in use." };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role: 'USER', 
    },
  });

  return { success: true };
}

export async function placeOrder(productId: string, quantity: number, price: number) {
  const session = await auth();
  const userEmail = session?.user?.email || "guest@example.com";

  const order = await prisma.order.create({
    data: {
      customerEmail: userEmail,
      total: price * quantity,
      status: "COMPLETED", 
      items: {
        create: {
          productId,
          quantity,
          price,
        }
      }
    }
  });

  await prisma.product.update({
    where: { id: productId },
    data: {
      stock: { decrement: quantity }
    }
  });

  redirect(`/orders?success=true`);
}