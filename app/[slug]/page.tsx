import React from 'react'
import Result from './Result'
import Header from '@/components/utils/Header';
import Footer from '@/components/utils/Footer';

type PageProps = {
    params: Promise<{
        slug: string;
    }>;
}

async function Page({ params }: PageProps) {
    const { slug } = await params;
    return (
        <div className=' '>
            <Header />
            <Result roll_number={slug} />
            <Footer />
        </div>
    )
}

export default Page