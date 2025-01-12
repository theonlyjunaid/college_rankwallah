"use client"

import React, { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Heart, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const RedirectContent = () => {
    const [countdown, setCountdown] = useState(20)
    const router = useRouter()
    const searchParams = useSearchParams()
    const redirectUrl = searchParams.get('redirect_url')

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => prev - 1)
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    useEffect(() => {
        if (countdown === 0 && redirectUrl) {
            router.push(redirectUrl)
        }
    }, [countdown, redirectUrl, router])

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col items-center justify-center p-2 sm:p-4 md:p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-[95%] sm:max-w-[90%] md:max-w-2xl bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-10  border-gray-100  border-2"
            >
                <motion.div
                    className="flex items-center justify-center mb-4 sm:mb-6 md:mb-8"
                >

                    <Image src="/nocage-logo.png" alt="NoCage" width={300} height={100} className='  invert' />
                </motion.div>

                <div className="text-center mb-6 sm:mb-8 md:mb-10">
                    <p className="text-gray-700 text-base sm:text-lg md:text-xl font-medium">
                        You will be redirected to your results in {countdown} seconds
                    </p>
                </div>

                <motion.div
                    className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 border border-orange-100 shadow-inner"
                >
                    <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                        <Heart className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-orange-500" />
                        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
                            Support NoCage on Product Hunt! 🙏
                        </h2>
                        <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-amber-500" />
                    </div>
                    <p className="text-gray-700 text-center text-sm sm:text-base md:text-lg mb-6 sm:mb-8 px-2 sm:px-4">
                        I didn&apos;t take a placement because I have complete faith in <Link href={"https://nocage.in"} className="font-semibold text-orange-600">NoCage.in</Link>.
                        This is the biggest decision of my career.
                        Would you support NoCage on Product Hunt?
                        Your upvote will help me live my dream 💫
                    </p>
                    <div className="flex justify-center items-center">
                        <motion.a
                            href="https://www.producthunt.com/posts/nocage?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-nocage"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="transform transition-all w-[250px]"
                        >
                            <img
                                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=775417&theme=light&t=1736661783186"
                                alt="NOCAGE - Startup Networking: Find Co-Founders, Grants & Funding! | Product Hunt"
                                className="w-full h-auto hover:opacity-90 transition-opacity rounded-lg shadow-md"
                            />
                        </motion.a>
                    </div>
                </motion.div>

            </motion.div>
        </div>
    )
}

const RedirectPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <RedirectContent />
        </Suspense>
    )
}

export default RedirectPage