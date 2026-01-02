import { auth } from "@/auth"; 
import { redirect } from "next/navigation";
import DashboardLayoutClient from "./DashboardLayoutClient"; 

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  
  if (!session?.user) {
    redirect("/login");
  }

  const userRole = (session.user as any).role;

  if (userRole !== "ADMIN" && userRole !== "SUPER_ADMIN") {
    redirect("/"); 
  }

  return (
    <DashboardLayoutClient userRole={userRole}>
      {children}
    </DashboardLayoutClient>
  );
}