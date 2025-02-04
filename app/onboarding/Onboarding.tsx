"use client"
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const OnboardingPage = () => {
    const { user, isLoaded } = useUser();
    const [rollNumber, setRollNumber] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const [error, setError] = useState('');

    if (!isLoaded) {
        return null;
    }

    if (!user) {
        router.push('/');
    }

    const userEmail = user?.emailAddresses[0]?.emailAddress;
    const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(' ');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    clerkId: user?.id,
                    name: fullName,
                    email: userEmail,
                    rollNumber: rollNumber.toUpperCase()
                })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Something went wrong');
            }

            const data = await response.json();
            if (data.clerkId) {
                router.push('/dashboard');
            }
        } catch (error: any) {
            setError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold">Welcome to Onboarding</h1>
                    <p className="text-xl mt-2">
                        Hello {user?.firstName}, let's get you started!
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={fullName}
                            disabled
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50"
                        />
                    </div>

                    <div>
                        <label htmlFor="rollNumber" className="block text-sm font-medium text-gray-700">
                            Roll Number
                        </label>
                        <input
                            type="text"
                            id="rollNumber"
                            value={rollNumber}
                            onChange={(e) => setRollNumber(e.target.value)}
                            placeholder="Enter your roll number"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm mt-2">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                    >
                        {isSubmitting ? 'Submitting...' : 'Complete Onboarding'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default OnboardingPage;