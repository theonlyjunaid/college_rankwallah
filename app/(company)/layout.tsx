import Footer from '@/components/utils/Footer'
import Header from '@/components/utils/Header'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='min-h-screen flex flex-col justify-between '>
            <Header />
            {children}
            <Footer />
        </div>
    )
}

export default layout