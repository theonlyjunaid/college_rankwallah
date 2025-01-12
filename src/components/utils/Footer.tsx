import React from 'react'
import Link from 'next/link'

const Footer = () => {
    return (
        <footer className="footer_bottom bg-gray-900 text-white p-4 text-center ">
            <div className='flex flex-col lg:flex-row gap-5 justify-between items-center'>
                <p> Made with ❤️ by   <Link href="https://www.linkedin.com/in/theonlyjunaid/" className='underline'>Junaid Malik</Link> </p>
                <div>
                    <Link href="/about">About</Link> | <Link href="/contact">Contact</Link> | <Link href="/privacy-policy">Privacy Policy</Link> | <Link href="/terms-and-conditions">Terms and conditions</Link>
                </div>

            </div>
            <div className='border-t-[1px] border-gray-600 w-[98%] mx-auto my-5' />
            <p className="text-[10px] text-center ">
                {" "}
                I am not responsible for any error in Analysis. If you noticed any incorrectness in result let me know on <Link href="https://www.linkedin.com/in/theonlyjunaid/">linkedin</Link>
            </p>
        </footer>
    )
}

export default Footer
