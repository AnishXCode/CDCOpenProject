import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { createAdmin } from "@/lib/actions"; 
import { 
  Shield, 
  ShieldAlert, 
  UserPlus, 
  Mail, 
  Lock, 
  Calendar,
  Crown
} from "lucide-react";

export default async function AdminsPage() {
  const session = await auth();
  
  // Strict Role Check
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

  // Consistent Input Class
  const inputClass = "flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all";

  return (
    <div className="space-y-8 p-8 bg-slate-50/50 min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Admin Management</h1>
          <p className="text-sm text-slate-500">Manage access and permissions for store administrators.</p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-700 border border-purple-200 shadow-sm">
          <Crown className="h-3.5 w-3.5" />
          Super Admin Area
        </div>
      </div>

      {/* Create Admin Card */}
      <div className="rounded-xl border border-purple-100 bg-white p-6 shadow-sm shadow-purple-100/50">
        <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
            <UserPlus className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-900">Invite New Admin</h2>
            <p className="text-xs text-slate-500">Grant system access to a new team member.</p>
          </div>
        </div>
        
        <form action={handleCreateAdmin} className="grid grid-cols-1 gap-6 md:grid-cols-12 items-end">
          
          {/* Email */}
          <div className="md:col-span-4 space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Email Address</label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Mail className="h-4 w-4" />
              </div>
              <input 
                name="email" 
                type="email" 
                placeholder="admin@company.com" 
                required 
                className={`${inputClass} pl-9`} 
              />
            </div>
          </div>

          {/* Password */}
          <div className="md:col-span-3 space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Password</label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Lock className="h-4 w-4" />
              </div>
              <input 
                name="password" 
                type="text" 
                placeholder="Min 6 chars" 
                required 
                minLength={6} 
                className={`${inputClass} pl-9`} 
              />
            </div>
          </div>

          {/* Role Select */}
          <div className="md:col-span-3 space-y-1.5">
             <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Role</label>
             <div className="relative">
               <select name="role" className={inputClass}>
                 <option value="ADMIN">Admin</option>
                 <option value="SUPER_ADMIN">Super Admin</option>
               </select>
             </div>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button 
              type="submit" 
              className="flex w-full items-center justify-center rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all active:scale-95"
            >
              Create User
            </button>
          </div>
        </form>
      </div>

      {/* Admin List Table */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-xs">User</th>
                <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-xs">Role</th>
                <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-xs">Date Joined</th>
                <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-xs text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((user) => (
                <tr key={user.id} className="group transition-colors hover:bg-slate-50/60">
                  
                  {/* Email */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                        user.role === 'SUPER_ADMIN' 
                          ? 'bg-purple-100 text-purple-700' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {user.email.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-medium text-slate-900">{user.email}</span>
                    </div>
                  </td>
                  
                  {/* Role Badge */}
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${
                      user.role === 'SUPER_ADMIN' 
                        ? 'bg-purple-50 text-purple-700 border-purple-200' 
                        : 'bg-blue-50 text-blue-700 border-blue-200'
                    }`}>
                      {user.role === 'SUPER_ADMIN' 
                        ? <ShieldAlert className="h-3.5 w-3.5" /> 
                        : <Shield className="h-3.5 w-3.5" />
                      }
                      {user.role.replace('_', ' ')}
                    </span>
                  </td>
                  
                  {/* Date */}
                  <td className="px-6 py-4 text-slate-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5 text-slate-400" />
                      {new Date(user.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </div>
                  </td>

                  {/* Status (Mock) */}
                  <td className="px-6 py-4 text-right">
                    <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-200"></span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}