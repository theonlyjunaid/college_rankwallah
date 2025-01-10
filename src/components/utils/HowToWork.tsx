import React from 'react'
const steps = [
    {
        title: "Enter Your Roll Number",
        description: "Simply input your DTU roll number to get started with the analysis.",
    },
    {
        title: "View Analysis",
        description: "Get instant access to comprehensive analysis of your academic performance.",
    },
    {
        title: "Make Better Decisions",
        description: "Use the insights to make informed decisions about your academic future.",
    },
]


const HowToWork = () => {
    return (
        <section id="how-it-works" className="container px-4 py-16 md:py-24">
            <div className="mx-auto max-w-[800px] text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
                    How Rankwallah Works
                </h2>
                <p className="text-gray-500 md:text-lg">
                    Get started in minutes with these simple steps
                </p>
            </div>
            <div className="relative">
                <div className="absolute left-1/2 h-full w-1 -translate-x-1/2 transform bg-gray-200" />
                <div className="space-y-16">
                    {steps.map((step, index) => (
                        <div key={index} className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center`}>
                            <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                <p className="text-gray-500">{step.description}</p>
                            </div>
                            <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 text-white">
                                {index + 1}
                            </div>
                            <div className="w-1/2" />
                        </div>
                    ))}
                </div>
            </div>
        </section>)
}

export default HowToWork