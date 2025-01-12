
import React from 'react'

const Page = () => {
    return (
        <div className=' md:my-20 my-10  flex flex-col justify-between '>


            <div className=" max-w-2xl text-center mx-auto p-6 text-black">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-4">About Us!</h2>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Welcome To <span id="W_Name1" className="text-blue-600">DTU Rankwallah</span>
                </h2>
                <p className="text-left text-gray-700 leading-relaxed mb-4">
                    <span id="W_Name2" className="font-bold">DTU Rankwallah</span> is a result analytics website featuring highly appealing charts and visuals. We offer a suite of helpful tools to enhance your experience. Our platform is committed to providing top-tier analytics, focusing on reliability and precision. We aim to turn our passion for data into a thriving resource for our users. We hope you enjoy our services as much as we enjoy providing them.
                </p>

                <p className="font-bold text-center text-gray-800">
                    Thank you for visiting our site!<br /><br />
                    <span className="text-blue-600 text-lg font-bold">Have a great day!</span>
                </p>
            </div>

        </div>
    )
}

export default Page
