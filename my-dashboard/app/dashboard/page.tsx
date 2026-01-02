import { prisma } from "@/lib/prisma";
import { RevenueChart } from "@/components/RevenueChart";
import { Package, Users, Activity, IndianRupee } from "lucide-react";

export default async function DashboardPage() {
  const productCount = await prisma.product.count();
  const categoryCount = await prisma.category.count();
  
  
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-gray-500">Total Revenue</h3>
            <IndianRupee className="h-4 w-4 text-gray-500" />
          </div>
          <div className="text-2xl font-bold">₹45,231.89</div>
          <p className="text-xs text-green-500 font-medium">+20.1% from last month</p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-gray-500">Products</h3>
            <Package className="h-4 w-4 text-gray-500" />
          </div>
          <div className="text-2xl font-bold">{productCount}</div>
          <p className="text-xs text-gray-500">Items currently in inventory</p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-gray-500">Categories</h3>
            <Activity className="h-4 w-4 text-gray-500" />
          </div>
          <div className="text-2xl font-bold">{categoryCount}</div>
          <p className="text-xs text-gray-500">Active product categories</p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-gray-500">Active Now</h3>
            <Users className="h-4 w-4 text-gray-500" />
          </div>
          <div className="text-2xl font-bold">+573</div>
          <p className="text-xs text-gray-500">+201 since last hour</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold mb-4">Revenue Overview</h3>
          <RevenueChart />
        </div>
        
        <div className="col-span-3 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
           <h3 className="text-lg font-bold mb-4">Recent Sales</h3>
           <p className="text-sm text-gray-500">You made 265 sales this month.</p>
           <div className="mt-8 space-y-4">
              <div className="flex items-center">
                 <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Olivia Martin</p>
                    <p className="text-sm text-gray-500">olivia.martin@email.com</p>
                 </div>
                 <div className="ml-auto font-medium">+₹1,999.00</div>
              </div>
              <div className="flex items-center">
                 <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Jackson Lee</p>
                    <p className="text-sm text-gray-500">jackson.lee@email.com</p>
                 </div>
                 <div className="ml-auto font-medium">+₹39.00</div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}