import React from 'react'
import OnboardingPage from './Onboarding'
import { currentUser } from '@clerk/nextjs/server';

const Page = async () => {
    try {
        const user = await currentUser();
        if (!user) {
            return <div>User not found</div>;
        }
        return (
            <div>
                <OnboardingPage />
            </div>
        )
    } catch (error) {
        console.log(error);
        return <div>Error</div>;
    }
}

export default Page