'use client';

import { useFormStatus } from 'react-dom';
import { useActionState } from 'react';
import { registerUser } from '@/lib/actions';
import Link from 'next/link';
import { ArrowLeft, Mail, Lock, Loader2, CheckCircle, Star } from 'lucide-react';
import Image from "next/image";

export default function RegisterPage() {
  const [state, dispatch] = useActionState(registerUser, undefined);

  return (
    <div className="w-full h-screen lg:grid lg:grid-cols-2 overflow-hidden">
      
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white relative">
        
        <div className="absolute top-6 left-6 md:top-8 md:left-8 z-10">
          <Link 
            href="/" 
            className="group flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Shop
          </Link>
        </div>

        <div className="mx-auto w-full max-w-sm space-y-6">
          
          <div className="text-center lg:text-left space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Join our Store
            </h1>
            <p className="text-slate-500">
              Create an account to track orders and checkout faster.
            </p>
          </div>

          {state?.success ? (
            <div className="rounded-xl bg-green-50 p-6 border border-green-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-900">Welcome Aboard!</h3>
                  <p className="text-xs text-green-700">Your account is ready.</p>
                </div>
              </div>
              <Link 
                href="/login" 
                className="inline-flex w-full items-center justify-center rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 transition-all active:scale-[0.98]"
              >
                Login to Start Shopping
              </Link>
            </div>
          ) : (
            <form action={dispatch} className="space-y-4">
              
              <div className="space-y-1">
                <label className="text-sm font-medium leading-none text-slate-900" htmlFor="email">
                  Email address
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Mail className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    className="flex h-11 w-full rounded-md border border-slate-300 bg-transparent px-3 py-1 pl-10 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium leading-none text-slate-900" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Lock className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Create a strong password"
                    required
                    className="flex h-11 w-full rounded-md border border-slate-300 bg-transparent px-3 py-1 pl-10 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>

              {state?.error && (
                <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 border border-red-100 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                  {state.error}
                </div>
              )}

              <SubmitButton />
              
            </form>
          )}

          {!state?.success && (
            <div className="text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-500 underline underline-offset-4">
                Sign in
              </Link>
            </div>
          )}
          
          <p className="px-8 text-center text-xs text-slate-400">
            By joining, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>

      <div className="hidden bg-slate-900 lg:flex lg:flex-col lg:justify-between p-12 relative overflow-hidden">
        
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-indigo-500 rounded-full blur-[100px] opacity-20"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-500 rounded-full blur-[100px] opacity-20"></div>

        <div className="relative z-10 flex items-center gap-3 text-white font-bold text-xl tracking-wide">
          <div className="relative h-10 w-10 overflow-hidden rounded-lg shadow-lg shadow-blue-900/50">
             <Image 
               src="/logo.png" 
               alt="AethelNova Logo" 
               fill
               className="object-cover"
             />
          </div>
          AethelNova
        </div>

        <div className="relative z-10 max-w-md space-y-6">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <blockquote className="space-y-2">
            <p className="text-xl font-medium text-white leading-relaxed">
              &ldquo;I found exactly what I was looking for. The checkout was smooth and delivery was super fast. Highly recommended!&rdquo;
            </p>
            <footer className="text-sm font-medium text-slate-400">
              — Alex M., Verified Buyer
            </footer>
          </blockquote>
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
      className="inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition-all hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
    >
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      {pending ? "Creating account..." : "Create Account"}
    </button>
  );
}