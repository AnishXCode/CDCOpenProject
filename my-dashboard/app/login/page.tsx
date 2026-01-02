'use client';
import Link from "next/link";

import { authenticate } from '@/lib/actions';
import { useActionState } from 'react';

export default function LoginPage() {
  const [errorMessage, dispatch] = useActionState(authenticate, undefined);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="absolute top-4 left-4">
        <Link 
          href="/" 
          className="flex items-center text-sm text-gray-600 hover:text-black transition-colors"
        >
          <span className="mr-2 text-lg">&#8592;</span> 
          Back to Home
        </Link>
      </div>
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-10 shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Sign in to Admin
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Use <strong>admin@demo.com</strong> and <strong>admin123</strong>
          </p>
        </div>

        <form action={dispatch} className="mt-8 space-y-6">
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 px-3"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 px-3"
                placeholder="Password"
              />
            </div>
          </div>

          {errorMessage && (
            <div className="text-sm text-red-500 font-medium text-center">
              {errorMessage}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Sign in
            </button>
          </div>

          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link 
                href="/register" 
                className="text-blue-600 hover:underline font-bold"
              >
                Register here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}