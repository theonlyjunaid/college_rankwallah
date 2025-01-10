import React from 'react'
import { BarChart, Target, Users } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const features = [
    {
        icon: BarChart,
        title: "Result Analysis",
        description: "Get detailed insights into your academic performance with our advanced analysis tools.",
    },
    {
        icon: Target,
        title: "CGPA Prediction",
        description: "Predict your future CGPA based on expected marks and historical data.",
    },

    {
        icon: Users,
        title: "Peer Comparison",
        description: "Compare your performance with your peers and understand where you stand.",
    },

]

const Features = () => {
    return (
        <section id="features" className="container px-4 py-16 md:py-24 bg-white rounded-3xl ">
            <div className="mx-auto max-w-[800px] text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
                    Everything you need to excel
                </h2>
                <p className="text-gray-500 md:text-lg">
                    Comprehensive tools and insights to help you make the most of your academic journey
                </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {features.map((feature, index) => (
                    <Card key={index} className="transition-all hover:shadow-md hover:-translate-y-1">
                        <CardHeader>
                            <feature.icon className="h-12 w-12 text-gray-800 mb-4" />
                            <CardTitle>{feature.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-500">{feature.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>)
}

export default Features