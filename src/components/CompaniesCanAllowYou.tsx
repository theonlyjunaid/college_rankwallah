"use client"
import React from 'react'
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ResultData } from '../../types/result';

interface CustomLabelProps {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
    index: number;
}

const CompaniesCanAllowYou = ({ dataOfStudent }: { dataOfStudent: ResultData }) => {
    const data = [
        {
            name: 'Companies allowed you if you had this CGPA.',
            value: dataOfStudent.updatedCgpaCompanies,
            color: "#4fd172"
        },
        {
            name: "Companies didn't allow you after this CGPA.",
            value: dataOfStudent.eligibleCompanies - dataOfStudent.updatedCgpaCompanies,
            color: "#547ae3"
        },
    ];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: CustomLabelProps) => {
        if (!percent) return null;

        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor="middle"
                dominantBaseline="central"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div className='border w-max mx-auto relative shadow-md py-4 rounded-md'>
            <p className='absolute top-10 left-10 border rounded-full bg-gray-50 text-center text-[14px] flex justify-center shadow items-center w-[65px] h-[60px]'>
                {`${dataOfStudent.updatedCgpaCompanies}/${dataOfStudent.eligibleCompanies}`}
            </p>
            <p className='absolute top-10 right-10 border rounded-full bg-blue-100 font-semibold text-center flex justify-center shadow items-center text-xs w-[60px] h-[60px]'>
                {dataOfStudent.updatedCGPA.toFixed(2)} CGPA
            </p>
            <ResponsiveContainer width={350} height={350}>
                <PieChart>
                    <Pie
                        dataKey="value"
                        isAnimationActive={true}
                        data={data}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        labelLine={false}
                        label={renderCustomizedLabel}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value) => [value, 'Companies']} />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default CompaniesCanAllowYou