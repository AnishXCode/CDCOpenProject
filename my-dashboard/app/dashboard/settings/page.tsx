import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { 
  Save, 
  Store, 
  Mail, 
  Bell, 
  Globe, 
  Shield, 
  CreditCard,
  Settings,
  ToggleLeft
} from "lucide-react";

export default async function SettingsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const inputClass = "w-full rounded-xl bg-gray-50 border-none px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-violet-500 transition-all";
  const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500 ml-1";
  const cardClass = "overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md";

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans text-gray-900">
      
      <div className="mx-auto max-w-3xl space-y-8">
        
        <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-gray-900 shadow-sm border border-gray-100">
                <Settings className="h-7 w-7" />
            </div>
            <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                    Settings
                </h1>
                <p className="mt-1 text-sm font-medium text-gray-500">
                    Manage your store preferences and account configuration.
                </p>
            </div>
        </div>

        <form className="space-y-8">
            
            <div className={cardClass}>
                <div className="p-8">
                    <div className="mb-8 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                            <Store className="h-5 w-5" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">Store Profile</h2>
                            <p className="text-sm text-gray-500">Public information visible to customers.</p>
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
                                <input type="email" defaultValue="support@aethelnova.com" className={`${inputClass} pl-10`} />
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                                    <Mail className="h-4 w-4" />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-2">
                            <label className={labelClass}>Store Description</label>
                            <textarea rows={3} className={`${inputClass} min-h-[100px] resize-y`} placeholder="Brief description of your store..." />
                        </div>
                    </div>
                </div>
            </div>

            <div className={cardClass}>
                <div className="p-8">
                    <div className="mb-8 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-600">
                            <Globe className="h-5 w-5" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">Localization</h2>
                            <p className="text-sm text-gray-500">Regional formats and currency settings.</p>
                        </div>
                    </div>
                    
                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <label className={labelClass}>Primary Currency</label>
                            <select className={`${inputClass} opacity-70 cursor-not-allowed`} disabled>
                                <option>Indian Rupee (INR)</option>
                            </select>
                            <p className="mt-2 text-[10px] font-medium text-gray-400">
                                * Currency is locked to your billing region.
                            </p>
                        </div>
                        <div>
                            <label className={labelClass}>Timezone</label>
                            <select className={inputClass}>
                                <option>(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi</option>
                                <option>(GMT+00:00) UTC</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className={cardClass}>
                <div className="p-8">
                    <div className="mb-8 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                            <Bell className="h-5 w-5" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">Notifications</h2>
                            <p className="text-sm text-gray-500">Configure how you receive alerts.</p>
                        </div>
                    </div>
                    
                    <div className="space-y-6">
                        <div className="flex items-center justify-between rounded-2xl bg-gray-50 p-4">
                            <div className="flex items-center gap-4">
                                <div className="rounded-xl bg-white p-2.5 text-gray-600 shadow-sm">
                                    <CreditCard className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">New Orders</p>
                                    <p className="text-xs text-gray-500">Get notified immediately upon purchase.</p>
                                </div>
                            </div>
                            <label className="relative inline-flex cursor-pointer items-center">
                                <input type="checkbox" defaultChecked className="peer sr-only" />
                                <div className="peer h-7 w-12 rounded-full bg-gray-200 after:absolute after:left-[4px] after:top-[4px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-violet-600 peer-checked:after:translate-x-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-violet-300"></div>
                            </label>
                        </div>

                        <div className="flex items-center justify-between rounded-2xl bg-gray-50 p-4">
                            <div className="flex items-center gap-4">
                                <div className="rounded-xl bg-white p-2.5 text-gray-600 shadow-sm">
                                    <Shield className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">Security Alerts</p>
                                    <p className="text-xs text-gray-500">Suspicious login attempts and password changes.</p>
                                </div>
                            </div>
                            <label className="relative inline-flex cursor-pointer items-center">
                                <input type="checkbox" defaultChecked className="peer sr-only" />
                                <div className="peer h-7 w-12 rounded-full bg-gray-200 after:absolute after:left-[4px] after:top-[4px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-violet-600 peer-checked:after:translate-x-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-violet-300"></div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-end gap-4 border-t border-gray-100 pt-4">
                <button type="button" className="rounded-xl px-6 py-3 text-sm font-semibold text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900">
                    Cancel
                </button>
                <button 
                    type="submit" 
                    className="flex items-center gap-2 rounded-xl bg-violet-600 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-violet-200 transition-all hover:bg-violet-700 hover:shadow-violet-300 active:scale-95"
                >
                    <Save className="h-4 w-4" />
                    Save Changes
                </button>
            </div>

        </form>
      </div>
    </div>
  );
}