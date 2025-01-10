"use client"
import { useState, useEffect } from 'react';
import Link from "next/link";
import { GraduationCap, Menu, X } from "lucide-react";
import { UserButton, SignInButton, SignedOut, SignedIn } from "@clerk/nextjs";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: "Features", href: "#features" },
        { name: "Top Performers", href: "#top-performers" },
        { name: "How It Works", href: "#how-it-works" },
        { name: "Testimonials", href: "#testimonials" },
        { name: "FAQ", href: "#faq" }
    ];

    return (
        <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'border-b shadow-sm bg-white/90 backdrop-blur-md' : 'bg-white/80 backdrop-blur-sm'
            }`}>
            <div className="container flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center space-x-2 group">
                    <GraduationCap className="h-8 w-8 text-gray-800 transition-transform group-hover:scale-110" />
                    <span className="text-2xl font-bold text-gray-800 group-hover:text-gray-900">DTU Rankwallah</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex gap-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:w-0 after:bg-gray-800 after:transition-all hover:after:w-full"
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* Mobile Navigation */}
                <button
                    className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {isMenuOpen && (
                    <div className="absolute top-16 left-0 right-0 bg-white border-b md:hidden">
                        <nav className="container px-4 py-4 flex flex-col gap-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </div>
                )}

                <div className="flex gap-4 items-center">
                    <SignedOut>
                        <SignInButton mode="modal" fallbackRedirectUrl="/dashboard" signUpFallbackRedirectUrl="/onboarding">
                            <button className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-900 transition-colors">
                                Sign In
                            </button>
                        </SignInButton>
                    </SignedOut>

                    <SignedIn>
                        <UserButton
                            afterSignOutUrl="/"
                            appearance={{
                                elements: {
                                    avatarBox: "w-8 h-8 rounded-full"
                                }
                            }}
                        />
                    </SignedIn>
                </div>
            </div>
        </header>
    );
}