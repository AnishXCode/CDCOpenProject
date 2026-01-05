import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { createAdmin } from "@/lib/actions"; 
import { 
  Shield, 
  ShieldCheck, 
  UserPlus, 
  Mail, 
  Lock, 
  Calendar,
  MoreVertical,
  CheckCircle2
} from "lucide-react";

export default async function AdminsPage() {
  const session = await auth();
  
  if ((session?.user as any)?.role !== "SUPER_ADMIN") {
    redirect("/dashboard");
  }

  const users = await prisma.user.findMany({
    where: {
        role: {
            in: ["ADMIN", "SUPER_ADMIN"],
        },
    },
    orderBy: { createdAt: "desc" },
  });

  async function handleCreateAdmin(formData: FormData) {
    "use server";
    await createAdmin(formData);
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans text-gray-900">
      
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
            Team Management
        </h1>
        <p className="mt-2 text-sm font-medium text-gray-500">
            Control access, manage roles, and oversee administrator accounts.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        
        <div className="lg:col-span-2 space-y-6">
            
            <div className="flex items-center justify-between px-2">
                <h2 className="text-lg font-bold text-gray-900">Active Administrators</h2>
                <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-700">
                    {users.length} Users
                </span>
            </div>

            <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
                <table className="w-full text-left text-sm">
                    <thead>
                    <tr className="border-b border-gray-100 bg-gray-50/50">
                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400">User Details</th>
                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400">Access Level</th>
                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400">Joined</th>
                        <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-400">Action</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                    {users.map((user) => (
                        <tr key={user.id} className="group transition-colors hover:bg-gray-50">
                        
                        <td className="px-6 py-5">
                            <div className="flex items-center gap-4">
                                <div className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold shadow-sm ${
                                    user.role === 'SUPER_ADMIN' 
                                    ? 'bg-violet-600 text-white' 
                                    : 'bg-white border border-gray-200 text-gray-700'
                                }`}>
                                    {user.email.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-semibold text-gray-900">{user.email.split('@')[0]}</span>
                                    <span className="text-xs text-gray-400">{user.email}</span>
                                </div>
                            </div>
                        </td>
                        
                        <td className="px-6 py-5">
                            <div className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium ${
                                user.role === 'SUPER_ADMIN' 
                                ? 'bg-violet-50 text-violet-700' 
                                : 'bg-blue-50 text-blue-700'
                            }`}>
                                {user.role === 'SUPER_ADMIN' 
                                    ? <ShieldCheck className="h-3.5 w-3.5" /> 
                                    : <Shield className="h-3.5 w-3.5" />
                                }
                                {user.role.replace('_', ' ')}
                            </div>
                        </td>
                        
                        <td className="px-6 py-5 text-gray-500">
                            <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-300" />
                            {new Date(user.createdAt).toLocaleDateString('en-IN', {
                                month: 'short', day: 'numeric', year: 'numeric'
                            })}
                            </div>
                        </td>

                        <td className="px-6 py-5 text-right">
                            <button className="rounded-full p-2 text-gray-400 hover:bg-white hover:text-gray-900 hover:shadow-sm">
                                <MoreVertical className="h-4 w-4" />
                            </button>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>

        <div className="lg:col-span-1">
            <div className="sticky top-8 rounded-3xl bg-gray-900 p-6 text-white shadow-xl shadow-gray-200">
                
                <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                        <UserPlus className="h-6 w-6 text-violet-300" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold">Invite Admin</h2>
                        <p className="text-sm text-gray-400">Add a new member</p>
                    </div>
                </div>

                <form action={handleCreateAdmin} className="space-y-4">
                    
                    <div className="space-y-1.5">
                        <label className="ml-1 text-xs font-semibold uppercase tracking-wider text-gray-400">Email Address</label>
                        <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
                                <Mail className="h-4 w-4" />
                            </div>
                            <input 
                                name="email" 
                                type="email" 
                                placeholder="name@company.com" 
                                required 
                                className="w-full rounded-xl bg-gray-800 py-3 pl-10 pr-4 text-sm text-white placeholder:text-gray-600 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all border-none" 
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="ml-1 text-xs font-semibold uppercase tracking-wider text-gray-400">Temp Password</label>
                        <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
                                <Lock className="h-4 w-4" />
                            </div>
                            <input 
                                name="password" 
                                type="text" 
                                placeholder="Min 6 characters" 
                                required 
                                minLength={6} 
                                className="w-full rounded-xl bg-gray-800 py-3 pl-10 pr-4 text-sm text-white placeholder:text-gray-600 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all border-none" 
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="ml-1 text-xs font-semibold uppercase tracking-wider text-gray-400">Assign Role</label>
                        <div className="relative">
                            <select 
                                name="role" 
                                className="w-full appearance-none rounded-xl bg-gray-800 py-3 pl-4 pr-10 text-sm text-white focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all border-none"
                            >
                                <option value="ADMIN">Admin (Standard)</option>
                                <option value="SUPER_ADMIN">Super Admin (Full Access)</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500">
                                <CheckCircle2 className="h-4 w-4" />
                            </div>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        className="mt-4 w-full rounded-xl bg-violet-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-900/20 transition-all hover:bg-violet-500 hover:shadow-violet-900/40 active:scale-[0.98]"
                    >
                        Create User
                    </button>
                    
                    <p className="text-center text-[10px] text-gray-500 pt-2">
                        The user will be able to log in immediately.
                    </p>
                </form>
            </div>
        </div>

      </div>
    </div>
  );
}