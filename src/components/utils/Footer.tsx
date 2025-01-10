import { GraduationCap } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (

        <footer className="bg-gray-900 py-12 text-white">
            <div className="container px-4">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <div className="flex items-center space-x-2">
                            <GraduationCap className="h-8 w-8 text-gray-400" />
                            <span className="text-2xl font-bold text-gray-400">DTU Rankwallah</span>
                        </div>
                        <p className="mt-4 text-gray-400">
                            Helping DTU students make better academic decisions through data-driven insights.
                        </p>
                    </div>
                    {[
                        { title: "Product", links: ["Features", "How it works", "Pricing", "FAQ"] },
                        { title: "Company", links: ["About", "Contact", "Privacy Policy", "Terms"] },
                        { title: "Connect", links: ["Twitter", "LinkedIn", "Instagram"] }
                    ].map((column, index) => (
                        <div key={index}>
                            <h3 className="font-semibold text-gray-400">{column.title}</h3>
                            <ul className="mt-4 space-y-2">
                                {column.links.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                        <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="mt-12 border-t border-gray-800 pt-8">
                    <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row">
                        <div className="flex items-center space-x-1 text-sm text-gray-400">
                            <span>Made with ❤️ by</span>
                            <Link href="#" className="hover:text-white transition-colors">
                                Junaid Malik
                            </Link>
                        </div>
                        <p className="text-sm text-gray-400">
                            © {new Date().getFullYear()} DTU Rankwallah. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
