"use client"
import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ResultData } from '../../types/result';

const CGPA = ({ dataOfStudent }: { dataOfStudent: ResultData }) => {
    // Transform semester results into chart data
    const data = dataOfStudent.semesterResults
        .sort((a, b) => a.semesterNumber - b.semesterNumber)
        .map(result => ({
            name: `SEM ${result.semesterNumber}`,
            CGPA: result.cgpa,
            credits: result.credits
        }));

    // Calculate min CGPA for Y-axis domain
    const minCGPA = Math.floor(Math.min(...data.map(item => item.CGPA)));

    return (
        <div className='border w-max mx-auto shadow-md py-4 rounded-md relative'>
            <p className='absolute top-4 right-4 border rounded-full bg-blue-100 font-semibold text-center flex justify-center shadow items-center text-xs w-[60px] h-[60px]'>
                {dataOfStudent.aggregatedCgpa.toFixed(2)} CGPA
            </p>

            <ResponsiveContainer width={350} height={350}>
                <LineChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 40,
                        left: 0,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis
                        domain={[minCGPA, 10]}
                        ticks={Array.from({ length: 10 - minCGPA + 1 }, (_, i) => minCGPA + i)}
                    />
                    <Tooltip
                        formatter={(value, name) => [Number(value).toFixed(2), name]}
                        labelStyle={{ fontWeight: 'bold' }}
                    />
                    <Legend align="center" />
                    <Line
                        type="monotone"
                        dataKey="CGPA"
                        stroke="#4fd172"
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                        dot={{ r: 4 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default CGPA