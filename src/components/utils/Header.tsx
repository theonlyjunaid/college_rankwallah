"use client"
import { useState, useEffect, useCallback } from 'react';
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { GraduationCap, Menu, User, X, BarChart, Users } from "lucide-react";
import Script from 'next/script';
import { UserButton, SignInButton, SignedOut, SignedIn } from '@clerk/nextjs';

const navItems = [
    { name: "Features", href: "#features" },
    { name: "Top Performers", href: "#top-performers" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "FAQ", href: "#faq" }
] as const;

const AuthButton = () => {

    const router = useRouter();
    return (
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

                    appearance={{
                        elements: {
                            avatarBox: "w-8 h-8 rounded-full"
                        }
                    }}
                >
                    <UserButton.MenuItems>
                        <UserButton.Action
                            label="Dashboard"
                            labelIcon={<User size={16} />}
                            onClick={() => router.push('/dashboard')}
                        />
                        <UserButton.Action
                            label="Friends  "
                            labelIcon={<Users size={16} />}
                            onClick={() => router.push('/friends')}
                        />
                        <UserButton.Action
                            label="Your Results"
                            labelIcon={<BarChart size={16} />}
                            onClick={() => router.push('/result')}
                        />
                    </UserButton.MenuItems>

                </UserButton>
            </SignedIn>
        </div>
    );
};

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    const handleScroll = useCallback(() => {
        setIsScrolled(window.scrollY > 0);
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const toggleMenu = () => setIsMenuOpen(prev => !prev);

    const headerClasses = `header_navbar sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'border-b shadow-sm bg-white/90 backdrop-blur-md' : 'bg-white/80 backdrop-blur-sm'
        }`;

    const linkClasses = "text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:w-0 after:bg-gray-800 after:transition-all hover:after:w-full";

    return (
        <header className={headerClasses}>
            <Script id="google-analytics">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments)}
                    gtag('js', new Date());
                    gtag('config', 'G-GCKM20W05T');
                `}
            </Script>
            <Script src="https://www.googletagmanager.com/gtag/js?id=G-GCKM20W05T" strategy="afterInteractive" />
            <Script
                async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7529178369694237"
                crossOrigin="anonymous"
                strategy="lazyOnload"
            />

            <div className="container flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center space-x-2 group">
                    <GraduationCap className="h-8 w-8 text-gray-800 transition-transform group-hover:scale-110" />
                    <span className="text-2xl font-bold text-gray-800 group-hover:text-gray-900">DTU Rankwallah</span>
                </Link>

                {pathname !== "/" && (
                    <Link
                        href="/"
                        className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-100 flex items-center gap-2"
                    >
                        Search Result
                    </Link>
                )}

                {/* Desktop Navigation */}
                <nav className="hidden md:flex gap-8">
                    {navItems.map(item => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={linkClasses}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <AuthButton />

                {/* Mobile Navigation */}
                <button
                    className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
                    onClick={toggleMenu}
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {isMenuOpen && (
                    <div className="absolute top-16 left-0 right-0 bg-white border-b md:hidden">
                        <nav className="container px-4 py-4 flex flex-col gap-4">
                            {navItems.map(item => (
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
            </div>
        </header>
    );
}
