import React from 'react'
import Result from './Result'

type PageProps = {
    params: Promise<{
        slug: string;
    }>;
}

async function Page({ params }: PageProps) {
    const { slug } = await params;
    return (
        <div>
            <Result roll_number={slug} />
        </div>
    )
}

export default Page