import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { 
  Save, 
  Store, 
  Mail, 
  Bell, 
  Globe, 
  Shield, 
  CreditCard 
} from "lucide-react";

export default async function SettingsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  // Common input style
  const inputClass = "flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all";
  const labelClass = "block text-sm font-medium text-slate-700 mb-1.5";
  const sectionClass = "rounded-xl border border-slate-200 bg-white p-6 shadow-sm";

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-8 bg-slate-50/50 min-h-screen">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Settings</h1>
        <p className="text-sm text-slate-500">Manage your store preferences and account details.</p>
      </div>

      <form className="space-y-8">
        
        {/* Section 1: Store General Info */}
        <div className={sectionClass}>
          <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Store className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900">Store Profile</h2>
              <p className="text-xs text-slate-500">General information visible to your customers.</p>
            </div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="col-span-2 md:col-span-1">
              <label className={labelClass}>Store Name</label>
              <input type="text" defaultValue="AethelNova Store" className={inputClass} />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className={labelClass}>Support Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                <input type="email" defaultValue="support@aethelnova.com" className={`${inputClass} pl-10`} />
              </div>
            </div>
            <div className="col-span-2">
              <label className={labelClass}>Store Description</label>
              <textarea rows={3} className={`${inputClass} h-auto`} placeholder="Brief description of your store..." />
            </div>
          </div>
        </div>

        {/* Section 2: Regional & Currency */}
        <div className={sectionClass}>
          <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <Globe className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900">Regional Settings</h2>
              <p className="text-xs text-slate-500">Currency and localization preferences.</p>
            </div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className={labelClass}>Currency</label>
              <select className={inputClass} disabled>
                <option>Indian Rupee (INR)</option>
              </select>
              <p className="mt-1 text-xs text-slate-500">Currency is locked to your region.</p>
            </div>
            <div>
              <label className={labelClass}>Timezone</label>
              <select className={inputClass}>
                <option>(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 3: Notifications */}
        <div className={sectionClass}>
          <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
              <Bell className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900">Notifications</h2>
              <p className="text-xs text-slate-500">Manage how you receive alerts.</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border border-slate-100 p-4">
              <div className="flex items-center gap-3">
                 <div className="rounded-full bg-slate-100 p-2 text-slate-600">
                    <CreditCard className="h-4 w-4" />
                 </div>
                 <div>
                   <p className="text-sm font-medium text-slate-900">New Order Alerts</p>
                   <p className="text-xs text-slate-500">Get notified when a customer places an order.</p>
                 </div>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input type="checkbox" defaultChecked className="peer sr-only" />
                <div className="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white focus:outline-none focus:ring-4 focus:ring-blue-300"></div>
              </label>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-slate-100 p-4">
              <div className="flex items-center gap-3">
                 <div className="rounded-full bg-slate-100 p-2 text-slate-600">
                    <Shield className="h-4 w-4" />
                 </div>
                 <div>
                   <p className="text-sm font-medium text-slate-900">Security Alerts</p>
                   <p className="text-xs text-slate-500">Notify me about suspicious login attempts.</p>
                 </div>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input type="checkbox" defaultChecked className="peer sr-only" />
                <div className="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white focus:outline-none focus:ring-4 focus:ring-blue-300"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4">
          <button type="button" className="text-sm font-medium text-slate-600 hover:text-slate-900">Cancel</button>
          <button 
            type="submit" 
            className="flex items-center gap-2 rounded-lg bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-slate-800 hover:shadow-lg active:scale-95"
          >
            <Save className="h-4 w-4" />
            Save Changes
          </button>
        </div>

      </form>
    </div>
  );
}