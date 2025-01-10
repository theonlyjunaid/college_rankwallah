"use client"
import React from 'react'
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { CompanyTierData } from '../../types/result';

interface CustomLabelProps {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
    index: number;
}

const CompanyData = ({ companyTierData }: { companyTierData: CompanyTierData }) => {
    console.log(companyTierData);
    const data = [
        {
            name: 'Companies That Allow You',
            value: companyTierData.allows,
            color: "#4fd172"
        },
        {
            name: "Companies That Don't Allow You",
            value: companyTierData.total - companyTierData.allows,
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

    const tiersList = [
        { label: 'S+ Tier', value: companyTierData.tiers.sPlusTier },
        { label: 'A+ Tier', value: companyTierData.tiers.aPlusTier },
        { label: 'A Tier', value: companyTierData.tiers.aTier },
        { label: 'B Tier', value: companyTierData.tiers.bTier },
        { label: 'C Tier', value: companyTierData.tiers.cTier }
    ];

    return (
        <div className='border w-max mx-auto relative shadow-md py-4 px-6 rounded-md'>
            <h3 className='text-lg font-semibold text-center mb-4'>{companyTierData.title}</h3>
            <div className='flex justify-between items-center mb-4'>
                <p className='border rounded-full bg-gray-50 text-[14px] text-center flex justify-center shadow items-center w-[65px] h-[60px]'>
                    {companyTierData.allows}/{companyTierData.total}
                </p>
                <div className='flex flex-col gap-2'>
                    {tiersList.map((tier, index) => (
                        <div key={index} className='flex items-center justify-between gap-4'>
                            <span className='font-medium'>{tier.label} Companies:</span>
                            <span className='bg-blue-50 px-3 py-1 rounded-full text-sm'>
                                {tier.value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
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
                            <Cell
                                key={`cell-${index}`}
                                fill={entry.color}
                            />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default CompanyData