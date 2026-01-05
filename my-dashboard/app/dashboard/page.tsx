import { prisma } from "@/lib/prisma";
import { RevenueChart } from "@/components/RevenueChart";
import { CategoryPieChart } from "@/components/CategoryPieChart";
import { 
  Package, 
  Users, 
  Activity, 
  IndianRupee, 
  TrendingUp, 
  ArrowUpRight,
  Calendar 
} from "lucide-react";

export default async function DashboardPage() {
  const [productCount, categoryCount, userCount, revenueData] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
    prisma.user.count({ where: { role: "USER" } }), 
    prisma.order.aggregate({
      _sum: { total: true },
      where: { status: "COMPLETED" }
    }),
  ]);

  const totalRevenue = revenueData._sum.total || 0;

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans text-gray-900">
      
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
            Overview
          </h1>
          <p className="mt-2 text-sm font-medium text-gray-500">
            Welcome back. Here is what is happening with your store today.
          </p>
        </div>
        
        <div className="flex items-center gap-3 rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm">
           <Calendar className="h-4 w-4 text-gray-400" />
           <span className="text-xs font-semibold text-gray-600">
             {new Date().toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric' })}
           </span>
           <div className="ml-2 h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" />
        </div>
      </div>
      
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        
        <div className="relative overflow-hidden rounded-3xl bg-violet-600 p-6 text-white shadow-xl shadow-violet-200 transition-transform hover:scale-[1.02]">
          <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/10 blur-3xl" />
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div className="flex items-start justify-between">
                <div className="rounded-xl bg-white/20 p-2 backdrop-blur-sm">
                    <IndianRupee className="h-5 w-5 text-white" />
                </div>
                <div className="flex items-center gap-1 rounded-full bg-green-400/20 px-2 py-1 text-[10px] font-bold text-green-100 backdrop-blur-md">
                    <TrendingUp className="h-3 w-3" /> +12.5%
                </div>
            </div>
            <div className="mt-6">
                <p className="text-sm font-medium text-violet-100 opacity-80">Total Revenue</p>
                <h3 className="mt-1 text-3xl font-bold tracking-tight">
                    ₹{(totalRevenue / 1000).toFixed(1)}k
                </h3>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:border-violet-100 hover:shadow-md">
           <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-400">Inventory</span>
              <Package className="h-5 w-5 text-gray-400" />
           </div>
           <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-gray-900">{productCount}</span>
              <span className="text-sm font-medium text-gray-500">Items</span>
           </div>
        </div>

        <div className="flex flex-col justify-between rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:border-violet-100 hover:shadow-md">
           <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-400">Structure</span>
              <Activity className="h-5 w-5 text-gray-400" />
           </div>
           <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-gray-900">{categoryCount}</span>
              <span className="text-sm font-medium text-gray-500">Categories</span>
           </div>
        </div>

        <div className="flex flex-col justify-between rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:border-violet-100 hover:shadow-md">
           <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-400">Audience</span>
              <Users className="h-5 w-5 text-gray-400" />
           </div>
           <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-gray-900">{userCount}</span>
              <span className="text-sm font-medium text-gray-500">Customers</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        
        <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm lg:col-span-2">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Performance</h3>
              <p className="text-sm text-gray-500">Revenue trajectory over time</p>
            </div>
            <button className="flex items-center gap-1 text-xs font-semibold text-violet-600 hover:text-violet-700">
                View Report <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>
          <div className="h-[350px] w-full">
            <RevenueChart />
          </div>
        </div>
        
        <div className="flex flex-col rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
           <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900">Categories</h3>
            <p className="text-sm text-gray-500">Top selling product types</p>
          </div>
           <div className="flex-1 flex items-center justify-center min-h-[300px]">
             <CategoryPieChart />
           </div>
        </div>
      </div>
    </div>
  );
}