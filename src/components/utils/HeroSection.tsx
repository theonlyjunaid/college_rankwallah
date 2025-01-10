"use client"
import React, { useState } from 'react'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from 'next/navigation';

const HeroSection = () => {
    const [rollNumber, setRollNumber] = useState("");
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (rollNumber) {
            setIsLoading(true);
            let processedRollNumber = rollNumber;

            // Check if roll number starts with 2k23
            if (rollNumber.toLowerCase().startsWith('2k23')) {
                const parts = rollNumber.split('/');
                if (parts.length > 0) {
                    const lastPart = parts[parts.length - 1];
                    // If last part is a number less than 100 and doesn't start with 0
                    const num = parseInt(lastPart);
                    if (num < 100 && !lastPart.startsWith('0')) {
                        // Pad with leading zeros to make it 3 digits
                        const paddedNum = lastPart.padStart(3, '0');
                        parts[parts.length - 1] = paddedNum;
                        processedRollNumber = parts.join('/');
                    }
                }
            }

            const rollNumberWithoutSlash = processedRollNumber.split("/").join("-");
            router.push(`/redirect?redirect_url=${rollNumberWithoutSlash}`);
        }
        setIsLoading(false);
    };

    return (
        <section className="container px-4 py-16 md:py-24 lg:py-32">
            <div className="mx-auto max-w-[800px] space-y-8 text-center">
                <div className="inline-flex items-center rounded-full bg-gray-100 px-4 py-1.5 text-sm font-medium text-gray-700">
                    <span className="relative flex h-2 w-2 mr-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gray-400 opacity-75"></span>
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-gray-500"></span>
                    </span>
                    Your DTU Journey, Optimized
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                    Analyse your DTU result{" "}
                    <span className="bg-gradient-to-r from-gray-600 to-gray-900 bg-clip-text text-transparent">
                        Like never before
                    </span>
                </h1>
                <p className="mx-auto max-w-[600px] text-gray-600 md:text-xl lg:text-2xl">
                    Make data-driven decisions about your academic future with our advanced
                    result analysis and CGPA prediction tools.
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center  lg:scale-125">
                    <Input
                        type="text"
                        placeholder="Enter your roll number"
                        className="max-w-xs"
                        value={rollNumber}
                        onChange={(e) => setRollNumber(e.target.value)}
                    />

                    <Button type="submit" className=" min-w-[200px]  bg-gray-800 hover:bg-gray-900 text-white" disabled={isLoading}>
                        {isLoading ? "Analyzing..." : "Analyse Result"}
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </form>
                <div className="pt-8">
                    <p className="text-sm font-medium text-gray-500 mb-4">Trusted by thousands of DTU students</p>
                    <div className="flex justify-center gap-8">
                        {[
                            { number: "10K+", label: "Active Users" },
                            { number: "500K+", label: "Times Results Analyzed" },
                            { number: "98%", label: "Accuracy" }
                        ].map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-3xl font-bold text-gray-800">{stat.number}</div>
                                <div className="text-sm text-gray-500">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection