import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
const faqs = [
    {
        question: "How accurate is the CGPA Analysis?",
        answer: "Our CGPA analysis system uses advanced algorithms and historical data with 98% accuracy.",
    },
    {
        question: "Can I track my progress over multiple semesters?",
        answer: "Yes, Rankwallah provides comprehensive tracking and visualization of your academic performance across all semesters.",
    },
    {
        question: "How does Rankwallah work?",
        answer: "Rankwallah uses your result data to analyze your performance and provide you with a detailed CGPA analysis.",
    },
]

export default function FAQSection() {
    return (
        <section id="faq" className="container px-4 py-16 md:py-24">
            <div className="mx-auto max-w-[800px] text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
                    Frequently Asked Questions
                </h2>
                <p className="text-gray-500 md:text-lg">
                    Everything you need to know about Rankwallah
                </p>
            </div>
            <div className="mx-auto max-w-[800px]">
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                            <AccordionContent>{faq.answer}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    )
}