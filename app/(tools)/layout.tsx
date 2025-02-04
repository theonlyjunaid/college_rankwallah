import React from 'react'
import Header from '@/components/utils/Header';
import Footer from '@/components/utils/Footer';

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    )
}

export default layout