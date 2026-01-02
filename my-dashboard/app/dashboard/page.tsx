import { prisma } from "@/lib/prisma";
import { RevenueChart } from "@/components/RevenueChart";
import { CategoryPieChart } from "@/components/CategoryPieChart";
import { Package, Users, Activity, IndianRupee, TrendingUp, ShoppingBag } from "lucide-react";

export default async function DashboardPage() {
  // 1. Fetch Real Data in Parallel
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
    <div className="space-y-8 p-8 bg-slate-50/50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h1>
          <p className="mt-1 text-slate-500">Overview of your store's performance.</p>
        </div>
        <div className="hidden md:flex items-center gap-2 rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 shadow-sm">
           <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
           Live Data
        </div>
      </div>
      
      {/* --- KPI CARDS --- */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        
        {/* Total Revenue */}
        <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
          <div className="flex items-center justify-between pb-4">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total Revenue</h3>
            <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <IndianRupee className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-slate-900">
            ₹{totalRevenue.toLocaleString('en-IN')}
          </div>
          <div className="mt-2 flex items-center text-sm font-medium text-green-600">
             <TrendingUp className="mr-1 h-4 w-4" />
             <span>+12.5%</span>
             <span className="ml-2 font-normal text-slate-400">from last month</span>
          </div>
        </div>

        {/* Products in Stock */}
        <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
          <div className="flex items-center justify-between pb-4">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Products</h3>
            <div className="rounded-xl bg-purple-50 p-2.5 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <Package className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-slate-900">{productCount}</div>
          <p className="mt-2 text-sm text-slate-400">Items in inventory</p>
        </div>

        {/* Active Categories */}
        <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
          <div className="flex items-center justify-between pb-4">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Categories</h3>
            <div className="rounded-xl bg-amber-50 p-2.5 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <Activity className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-slate-900">{categoryCount}</div>
          <p className="mt-2 text-sm text-slate-400">Active categories</p>
        </div>

        {/* Total Customers */}
        <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
          <div className="flex items-center justify-between pb-4">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total Customers</h3>
            <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <Users className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-slate-900">{userCount}</div>
          <p className="mt-2 text-sm text-slate-400">Registered users</p>
        </div>
      </div>

      {/* --- CHARTS SECTION --- */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        
        {/* Main Revenue Chart */}
        <div className="col-span-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Revenue Overview</h3>
              <p className="text-sm text-slate-500">Monthly revenue analytics</p>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <RevenueChart />
          </div>
        </div>
        
        {/* Category Pie Chart */}
        <div className="col-span-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
           <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-900">Sales by Category</h3>
            <p className="text-sm text-slate-500">Distribution across top categories</p>
          </div>
           <div className="h-[300px] w-full flex items-center justify-center">
             <CategoryPieChart />
           </div>
        </div>
      </div>
    </div>
  );
}