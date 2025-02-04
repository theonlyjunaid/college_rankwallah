import Footer from '@/components/utils/Footer';
import Header from '@/components/utils/Header';
import { useUser } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import React from 'react'

const page = async () => {
    const user = await auth();
    return (
        <div>
            <Header />
            <h1>Welcome {user?.userId}</h1>
            <Footer />
        </div>
    )
}

export default page