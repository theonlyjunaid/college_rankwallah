import Header from "./utils/Header"
import Footer from "./utils/Footer"
import CTASection from "./utils/CTA"
import FAQSection from "./utils/FAQ"
import Testinomials from "./utils/Testinomials"
import HowToWork from "./utils/HowToWork"
import TopPerformance from "./utils/TopPerformance"
import Features from "./utils/Features"
import HeroSection from "./utils/HeroSection"

export default function LandingPage() {
    return (
        <div className="flex min-h-screen flex-col bg-gradient-to-b from-gray-50 to-white">
            <Header />

            <main className="flex-1">
                {/* Hero Section */}
                <HeroSection />

                {/* Features Section */}
                <Features />

                {/* Top Performers Section */}
                <TopPerformance />

                {/* How It Works */}
                <HowToWork />

                {/* Testimonials */}
                <Testinomials />

                {/* FAQ Section */}
                <FAQSection />

                {/* CTA Section */}
                <CTASection />

            </main>
            <Footer />
        </div>
    )
}



