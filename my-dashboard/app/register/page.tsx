'use client';

import { useFormStatus } from 'react-dom';
import { useActionState } from 'react';
import { registerUser } from '@/lib/actions';
import Link from 'next/link';
import { ArrowLeft, Mail, Lock, Loader2, CheckCircle, Star, UserPlus, Layers } from 'lucide-react';
import Image from "next/image";

export default function RegisterPage() {
  const [state, dispatch] = useActionState(registerUser, undefined);

  const inputClass = "w-full rounded-xl bg-gray-50 border-none px-4 py-3.5 pl-11 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-violet-500 transition-all";
  const iconClass = "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400";

  return (
    <div className="w-full h-screen lg:grid lg:grid-cols-2 overflow-hidden font-sans">
      
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white relative">
        
        <div className="absolute top-8 left-8 z-10">
          <Link 
            href="/" 
            className="group flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-gray-500 transition-all hover:bg-gray-50 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Store
          </Link>
        </div>

        <div className="mx-auto w-full max-w-sm space-y-8">
          
          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
              Join AethelNova
            </h1>
            <p className="text-gray-500 font-medium">
              Create your account to unlock exclusive features.
            </p>
          </div>

          {state?.success ? (
            <div className="rounded-2xl bg-emerald-50 p-8 border border-emerald-100 shadow-lg shadow-emerald-100/50 animate-in fade-in zoom-in-95 duration-500">
              <div className="flex flex-col items-center text-center gap-4 mb-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 ring-4 ring-white">
                  <CheckCircle className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Welcome Aboard!</h3>
                  <p className="text-sm font-medium text-emerald-700">Your account has been successfully created.</p>
                </div>
              </div>
              <Link 
                href="/login" 
                className="inline-flex w-full items-center justify-center rounded-xl bg-emerald-600 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-200 transition-all hover:bg-emerald-700 hover:shadow-emerald-300 active:scale-[0.98]"
              >
                Login to Start Shopping
              </Link>
            </div>
          ) : (
            <form action={dispatch} className="space-y-6">
              
              <div className="space-y-4">
                <div className="space-y-1.5">
                    <label className="ml-1 text-xs font-bold uppercase tracking-wider text-gray-400" htmlFor="email">
                        Email Address
                    </label>
                    <div className="relative">
                        <div className={iconClass}>
                            <Mail className="h-5 w-5" />
                        </div>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="name@example.com"
                            required
                            className={inputClass}
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="ml-1 text-xs font-bold uppercase tracking-wider text-gray-400" htmlFor="password">
                        Password
                    </label>
                    <div className="relative">
                        <div className={iconClass}>
                            <Lock className="h-5 w-5" />
                        </div>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Create a strong password"
                            required
                            className={inputClass}
                        />
                    </div>
                </div>
              </div>

              {state?.error && (
                <div className="rounded-xl bg-red-50 p-4 text-sm font-medium text-red-600 border border-red-100 flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100">
                        <span className="h-2 w-2 rounded-full bg-red-600" />
                    </div>
                    {state.error}
                </div>
              )}

              <SubmitButton />
              
            </form>
          )}

          {!state?.success && (
            <div className="text-center text-sm font-medium text-gray-500">
              Already have an account?{" "}
              <Link href="/login" className="font-bold text-violet-600 hover:text-violet-700 hover:underline">
                Sign in instead
              </Link>
            </div>
          )}
          
          <p className="px-4 text-center text-xs font-medium text-gray-400">
            By creating an account, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>

      <div className="hidden lg:flex lg:flex-col lg:justify-between p-12 relative overflow-hidden bg-violet-600">
        
        <div className="absolute inset-0 bg-gradient-to-bl from-violet-600 to-indigo-900 opacity-90" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light" />
        
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-violet-400 opacity-20 blur-3xl animate-pulse" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-indigo-400 opacity-20 blur-3xl animate-pulse" />

        <div className="relative z-10 flex items-center gap-3 text-white">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md shadow-inner">
             <Image src="/logo.png" alt="Logo" fill className="object-cover" />
             <Layers className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">AethelNova</span>
        </div>

        <div className="relative z-10 max-w-md">
          <div className="flex gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          
          <div className="rounded-3xl bg-white/10 p-8 backdrop-blur-xl border border-white/10 shadow-2xl">
            <blockquote className="space-y-4">
                <p className="text-xl font-medium text-white leading-relaxed">
                &ldquo;I found exactly what I was looking for. The checkout was smooth and delivery was super fast. Highly recommended!&rdquo;
                </p>
                <footer className="text-sm font-bold text-violet-200">
                — Alex M., Verified Buyer
                </footer>
            </blockquote>
          </div>
        </div>
      </div>

    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="group relative w-full flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3.5 text-sm font-bold text-white shadow-xl shadow-violet-200 transition-all hover:bg-violet-700 hover:shadow-violet-300 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {pending ? (
        <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Creating Account...
        </>
      ) : (
        <>
            <span>Create Account</span>
            <UserPlus className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </>
      )}
    </button>
  );
}