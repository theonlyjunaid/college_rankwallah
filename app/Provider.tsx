"use client"

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const Provider = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <ProgressBar
                height="4px"
                color="#000"
                options={{ showSpinner: false }}
                shallowRouting
            />
            {children}
        </>
    )
}

export default Provider