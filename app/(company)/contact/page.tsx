import React from 'react';

export default function Component() {
    return (
        <div className=' md:my-20 my-10  flex flex-col justify-between '>

            <div className="w-full max-w-4xl mx-auto ">
                <div className="space-y-6 text-center">
                    <h1 className="text-4xl font-bold tracking-tight">Get in Touch</h1>
                    <p className="text-muted-foreground text-lg max-w-[700px] mx-auto">
                        Have a question or need help? Don&apos;t hesitate to reach out.
                    </p>
                </div>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-gray-200 rounded-lg p-6 space-y-4">
                        <h3 className="text-xl font-semibold">Email</h3>
                        <div className="space-y-1">
                            <p>onlyjunaid2002@gmail.com</p>
                            <p className="text-muted-foreground">We are here to assist you.</p>
                        </div>
                    </div>
                    <div className="bg-gray-200 rounded-lg p-6 space-y-4">
                        <h3 className="text-xl font-semibold">Phone</h3>
                        <div className="space-y-1">
                            <p>+91 9069084506</p>
                            <p className="text-muted-foreground">Call us during regular business hours.</p>
                        </div>
                    </div>
                    <div className="bg-gray-200 rounded-lg p-6 space-y-4">
                        <h3 className="text-xl font-semibold">Address</h3>
                        <div className="space-y-1">
                            <p>DTU, Rohini, Delhi</p>
                            <p className="text-muted-foreground">
                                Visit our office during regular business hours.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}