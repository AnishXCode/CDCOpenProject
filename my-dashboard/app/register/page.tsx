'use client';

import { useFormState } from 'react-dom';
import { registerUser } from '@/lib/actions';
import Link from 'next/link';

export default function RegisterPage() {
  const [state, dispatch] = useFormState(registerUser, undefined);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">

        <div className="absolute top-4 left-4">
        <Link 
          href="/" 
          className="flex items-center text-sm text-gray-600 hover:text-black transition-colors"
        >
          {/* Simple HTML Arrow Entity */}
          <span className="mr-2 text-lg">&#8592;</span> 
          Back to Home
        </Link>
      </div>
      
      <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-xl shadow">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="mt-2 text-sm text-gray-600">Join our store today</p>
        </div>

        {state?.success ? (
          <div className="bg-green-100 p-4 rounded text-green-700 text-center">
            Account created! <Link href="/login" className="underline font-bold">Log in here</Link>
          </div>
        ) : (
          <form action={dispatch} className="mt-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input name="email" type="email" required className="mt-1 block w-full rounded border-gray-300 p-2 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input name="password" type="password" required className="mt-1 block w-full rounded border-gray-300 p-2 border" />
            </div>

            {state?.error && <p className="text-red-500 text-sm">{state.error}</p>}

            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Sign Up
            </button>
          </form>
        )}
        
        <p className="text-center text-sm">
          Already have an account? <Link href="/login" className="text-blue-600">Log in</Link>
        </p>
      </div>
    </div>
  );
}