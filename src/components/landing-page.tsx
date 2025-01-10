'use client'

import * as React from "react"
import Head from "next/head"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, ChartBar, TrendingUp, Award, Users, BookOpen } from "lucide-react"
import Header from "./utils/Header"
import Footer from "./utils/Footer"

export function LandingPageComponent() {
  const [rollNumber, setRollNumber] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
  }

  return (
    <>
      <Head>
        <title>DTU Result Analysis | Comprehensive Academic Performance Analytics</title>
        <meta name="description" content="Get in-depth analysis of your DTU academic performance with advanced analytics, personalized insights, and semester-wise breakdown. Join 10,000+ successful students." />
        <meta name="keywords" content="DTU result analysis, Delhi Technological University, academic performance tracking, CGPA calculator, semester analysis, student analytics, academic insights, DTU grades" />
        <meta property="og:title" content="DTU Result Analysis | Comprehensive Academic Performance Analytics" />
        <meta property="og:description" content="Transform your academic journey with detailed performance analytics, personalized insights, and semester-wise progress tracking. Join 10,000+ DTU students making data-driven decisions." />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:url" content="https://www.dturesultanalysis.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="DTU Result Analysis | Comprehensive Academic Performance Analytics" />
        <meta name="twitter:description" content="Transform your academic journey with detailed performance analytics, personalized insights, and semester-wise progress tracking." />
        <link rel="canonical" href="https://www.dturesultanalysis.com" />
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
        <Header />
        <main className="container mx-auto px-4 pt-24 pb-16">
          <HeroSection rollNumber={rollNumber} setRollNumber={setRollNumber} isLoading={isLoading} handleSubmit={handleSubmit} />

          <section className="mt-24 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <TrendingUp className="h-8 w-8" />,
                title: "Performance Tracking",
                description: "Track your academic progress with detailed semester-wise analysis. Get insights into your performance trends, identify areas of improvement, and monitor your growth over time."
              },
              {
                icon: <Award className="h-8 w-8" />,
                title: "CGPA Insights",
                description: "Get comprehensive CGPA breakdown and improvement suggestions. Understand your grade distribution, predict future outcomes, and receive personalized recommendations for better results."
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Peer Comparison",
                description: "Compare your performance with branch toppers and class average. Benchmark your results against peers, understand your standing, and set realistic goals for improvement."
              },
              {
                icon: <BookOpen className="h-8 w-8" />,
                title: "Subject Analysis",
                description: "Deep dive into subject-wise performance and patterns. Analyze your strengths and weaknesses, get subject-specific study strategies, and optimize your learning approach."
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700"
              >
                <div className="text-blue-600 dark:text-blue-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            ))}
          </section>

          <section className="mt-24">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Result Analysis Platform?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-semibold mb-4">Advanced Analytics Engine</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Our platform uses cutting-edge algorithms to analyze your academic performance from multiple angles. Get detailed insights into your strengths, weaknesses, and potential areas for improvement.
                </p>
                <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                  <li>• Comprehensive grade analysis</li>
                  <li>• Performance prediction models</li>
                  <li>• Personalized improvement roadmap</li>
                  <li>• Regular progress tracking</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-semibold mb-4">Expert Recommendations</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Receive tailored advice from our academic experts based on your performance data. Our recommendations are designed to help you achieve your academic goals effectively.
                </p>
                <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                  <li>• Subject-specific study strategies</li>
                  <li>• Time management tips</li>
                  <li>• Resource recommendations</li>
                  <li>• Career guidance based on performance</li>
                </ul>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}

function HeroSection({ rollNumber, setRollNumber, isLoading, handleSubmit }: {
  rollNumber: string,
  setRollNumber: React.Dispatch<React.SetStateAction<string>>,
  isLoading: boolean,
  handleSubmit: (e: React.FormEvent) => void
}) {
  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div className="relative z-10">
        <Badge className="mb-4 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 px-4 py-1.5 text-sm rounded-full">
          <Search className="w-4 h-4 inline mr-2" />
          Instant Result Analysis
        </Badge>
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
          Transform Your Academic Journey
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
          Get comprehensive insights into your academic performance with advanced analytics, personalized recommendations, and detailed progress tracking. Join thousands of successful students who have improved their academic performance with our platform.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          <Input
            placeholder="Enter Your DTU Roll Number"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            className="h-14 text-lg border-2 border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 rounded-xl shadow-sm"
          />
          <Button
            className="w-full h-14 text-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-xl transition-colors duration-200"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing Results...
              </span>
            ) : (
              "Get Free Analysis"
            )}
          </Button>
        </form>
        <div className="mt-8 flex items-center space-x-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map((i) => (
              <Avatar key={i} className="border-4 border-white dark:border-gray-800 w-12 h-12">
                <AvatarImage src={`/students/student-${i}.jpg`} alt={`Student ${i}`} />
                <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200">S{i}</AvatarFallback>
              </Avatar>
            ))}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Trusted by <span className="text-blue-600 dark:text-blue-400 font-bold">10,000+</span> DTU students
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Join your peers in making data-driven decisions</p>
          </div>
        </div>
      </div>
      <div className="relative hidden lg:block">
        <div className="relative aspect-square rounded-2xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 p-8 shadow-xl">
          <ChartBar className="h-full w-full text-blue-600 dark:text-blue-400 opacity-10" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Advanced Analytics</h3>
              <p className="text-lg text-gray-600 dark:text-gray-400">Powered by intelligent algorithms</p>
              <div className="flex justify-center space-x-4">
                <Badge variant="secondary" className="px-4 py-2">AI-Powered</Badge>
                <Badge variant="secondary" className="px-4 py-2">Real-time</Badge>
                <Badge variant="secondary" className="px-4 py-2">Accurate</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
