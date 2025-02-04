"use client"
import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useRouter } from 'next/navigation'

const Page = () => {
    const [rollNumber, setRollNumber] = useState("")
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (rollNumber) {
            setIsLoading(true)
            let processedRollNumber = rollNumber

            // Check if roll number starts with 2k23
            if (rollNumber.toLowerCase().startsWith('2k23')) {
                const parts = rollNumber.split('/')
                if (parts.length > 0) {
                    const lastPart = parts[parts.length - 1]
                    // If last part is a number less than 100 and doesn't start with 0
                    const num = parseInt(lastPart)
                    if (num < 100 && !lastPart.startsWith('0')) {
                        // Pad with leading zeros to make it 3 digits
                        const paddedNum = lastPart.padStart(3, '0')
                        parts[parts.length - 1] = paddedNum
                        processedRollNumber = parts.join('/')
                    }
                }
            }

            const rollNumberWithoutSlash = processedRollNumber.split("/").join("-")
            router.push(`/${rollNumberWithoutSlash}`)
        }
        setIsLoading(false)
    }

    return (
        <div className="container px-4 py-12 max-w-6xl mx-auto">
            <section className="space-y-12">
                <div className="text-center max-w-4xl mx-auto">
                    <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                        DTU Result Analysis & Placements Opportunities Information
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Welcome to Delhi Technological University&apos;s comprehensive result analysis platform. Our advanced analytics tool provides in-depth insights into your academic journey, helping you make informed decisions about your educational path.
                    </p>
                    <div className="flex justify-center gap-8 text-center">
                        {[
                            { number: "50K+", label: "Results Analyzed" },
                            { number: "98%", label: "Accuracy Rate" },
                            { number: "24/7", label: "Available" }
                        ].map((stat, index) => (
                            <div key={index} className="bg-white p-4 rounded-lg ">
                                <div className="text-3xl font-bold text-gray-800">{stat.number}</div>
                                <div className="text-sm text-gray-600">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-8 rounded-xl  border ">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800">Access Your Academic Analytics</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Input
                                type="text"
                                placeholder="Enter Roll Number (e.g., 2k21/mc/79)"
                                className="flex-1 text-lg py-6"
                                value={rollNumber}
                                onChange={(e) => setRollNumber(e.target.value)}
                            />
                            <Button
                                type="submit"
                                className="bg-gray-800 hover:bg-gray-900 text-white text-lg py-6 px-8"
                                disabled={isLoading}
                            >
                                {isLoading ? "Processing..." : "Analyze My Result"}
                                <ArrowRight className="ml-2 h-6 w-6" />
                            </Button>
                        </div>
                    </form>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mt-12">
                    <div className="bg-gray-50 p-8 rounded-xl">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">How Our Analysis Works</h2>
                        <ol className="list-decimal list-inside space-y-4 text-gray-700">
                            <li className="p-3 bg-white rounded-lg ">Enter your DTU roll number following the standard format (2KXX/BRANCH/NUMBER)</li>
                            <li className="p-3 bg-white rounded-lg ">Our system processes your academic records and generates comprehensive analytics</li>
                            <li className="p-3 bg-white rounded-lg ">View detailed semester-wise performance breakdowns and trends</li>
                            <li className="p-3 bg-white rounded-lg ">Access personalized insights about your academic standing and potential improvements</li>
                        </ol>
                    </div>

                    <div className="bg-gray-50 p-8 rounded-xl">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">Key Features & Benefits</h2>
                        <ul className="space-y-4 text-gray-700">
                            <li className="flex items-center p-3 bg-white rounded-lg ">
                                <span className="mr-2">📊</span> Comprehensive CGPA tracking and prediction
                            </li>
                            <li className="flex items-center p-3 bg-white rounded-lg ">
                                <span className="mr-2">📈</span> Semester-wise performance analysis
                            </li>
                            <li className="flex items-center p-3 bg-white rounded-lg ">
                                <span className="mr-2">🎯</span> Subject-wise strength assessment
                            </li>
                            <li className="flex items-center p-3 bg-white rounded-lg ">
                                <span className="mr-2">📋</span> Detailed academic progress reports
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="bg-gray-900 text-white p-8 rounded-xl mt-8">
                    <h2 className="text-2xl font-bold mb-4">Why Use Our Result Analysis Tool?</h2>
                    <p className="text-gray-300 mb-6">
                        Our platform offers the most comprehensive and accurate analysis of DTU academic results. Whether you&apos;re a first-year student trying to understand your academic standing or a final-year student preparing for placements, our tool provides valuable insights to help you succeed in your academic journey.
                    </p>
                    <p className="text-gray-300">
                        With features like performance tracking, CGPA prediction, and comparative analysis, you&apos;ll have all the information you need to make informed decisions about your academic future. Join thousands of DTU students who are already benefiting from our advanced analytics platform.
                    </p>
                </div>
            </section>
        </div>
    )
}

export default Page