import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'
import User from '../../lib/models/user.model';
import { connectToDB } from '../../lib/mongodb';

const page = async () => {
    const user = await currentUser();
    if (!user) {
        return redirect('/');
    }

    await connectToDB();
    const userData = await User.findOne({ email: user.emailAddresses[0].emailAddress });
    if (userData?.onboarded) {
        return redirect('/dashboard');
    }
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/create`, {
        method: 'POST',
        body: JSON.stringify({
            clerkId: user.id,
            name: user.firstName + " " + user.lastName,
            email: user.emailAddresses[0].emailAddress
        })
    });
    return (
        <div>
            <h1>Onboarding</h1>
            {user?.firstName}
        </div>
    )
}

export default page