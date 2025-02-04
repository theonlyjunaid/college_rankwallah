import React from 'react'
import Header from '@/components/utils/Header';
import Footer from '@/components/utils/Footer';
import Result from '../[slug]/Result';



const Page = () => {
    return (
        <div className=' '>
            <Header />
            <Result roll_number={"2k21-mc-79"} />
            <Footer />
        </div>
    )
}

export default Page