"use client"
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const testimonials = [
    {
        content: "Rankwallah helped me understand my academic standing and improve my CGPA significantly.",
        name: "Priya S.",
        title: "BTech, 3rd Year",
    },
    {
        content: "It helped me plan my semester better. So that i can be eligible for better companies.",
        name: "Rahul M.",
        title: "BTech, 4th Year",
    },
    {
        content: "The detailed result analysis helped me understand my performance trends and improve my academics.",
        name: "Amit K.",
        title: "BTech, 3rd Year",
    },
]


const Testinomials = () => {
    return (
        <section id="testimonials" className="container px-4 py-16 md:py-24 bg-gray-50 rounded-3xl">
            <div className="mx-auto max-w-[800px] text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
                    Loved by DTU Students
                </h2>
                <p className="text-gray-500 md:text-lg">
                    Here's what our users have to say about Rankwallah
                </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {testimonials.map((testimonial, index) => (
                    <Card key={index} className="bg-white">
                        <CardHeader>
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                                    <span className="text-2xl font-bold text-gray-800">{testimonial.name[0]}</span>
                                </div>
                                <div>
                                    <CardTitle>{testimonial.name}</CardTitle>
                                    <CardDescription>{testimonial.title}</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600">"{testimonial.content}"</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>)
}

export default Testinomials