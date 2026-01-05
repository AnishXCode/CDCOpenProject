'use client';

import Link from "next/link";
import { authenticate } from '@/lib/actions';
import { useActionState } from 'react';
import { ArrowLeft, Mail, Lock, Loader2, LogIn, Layers } from 'lucide-react';
import Image from "next/image";

export default function LoginPage() {
  const [errorMessage, dispatch, isPending] = useActionState(authenticate, undefined);

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
              Welcome back
            </h1>
            <p className="text-gray-500 font-medium">
              Enter your credentials to access your account.
            </p>
          </div>

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
                            required
                            placeholder="name@company.com"
                            className={inputClass}
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                        <label className="ml-1 text-xs font-bold uppercase tracking-wider text-gray-400" htmlFor="password">
                            Password
                        </label>
                    </div>
                    <div className="relative">
                        <div className={iconClass}>
                            <Lock className="h-5 w-5" />
                        </div>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            placeholder="••••••••"
                            className={inputClass}
                        />
                    </div>
                </div>
            </div>

            {errorMessage && (
              <div className="rounded-xl bg-red-50 p-4 text-sm font-medium text-red-600 border border-red-100 flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100">
                    <span className="h-2 w-2 rounded-full bg-red-600" />
                </div>
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="group relative w-full flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3.5 text-sm font-bold text-white shadow-xl shadow-violet-200 transition-all hover:bg-violet-700 hover:shadow-violet-300 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <LogIn className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>

          </form>

          <div className="text-center text-sm font-medium text-gray-500">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-bold text-violet-600 hover:text-violet-700 hover:underline">
              Create an account
            </Link>
          </div>
          
        </div>
      </div>

      <div className="hidden lg:flex lg:flex-col lg:justify-between p-12 relative overflow-hidden bg-violet-600">
        
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-indigo-900 opacity-90" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light" />
        
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-violet-400 opacity-20 blur-3xl animate-pulse" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-indigo-400 opacity-20 blur-3xl animate-pulse" />

        <div className="relative z-10 flex items-center gap-3 text-white">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md shadow-inner">
             <Image src="/logo.png" alt="Logo" fill className="object-cover" />
             <Layers className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">AethelNova</span>
        </div>

        <div className="relative z-10 max-w-md rounded-3xl bg-white/10 p-8 backdrop-blur-xl border border-white/10 shadow-2xl">
          <blockquote className="space-y-6">
            <p className="text-xl font-medium text-white leading-relaxed">
              &ldquo;The platform has completely transformed how we manage our inventory. It's intuitive, fast, and simply beautiful.&rdquo;
            </p>
            <footer className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-violet-300 to-white" />
                <div>
                    <div className="font-bold text-white">Alex Morgan</div>
                    <div className="text-sm text-violet-200">Head of Operations</div>
                </div>
            </footer>
          </blockquote>
        </div>
      </div>

    </div>
  );
}