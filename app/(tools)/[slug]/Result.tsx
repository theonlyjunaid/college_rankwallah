"use client"
import { CompanyTierData, ResultData } from "../../../types/result";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Result({ roll_number }: {
    roll_number: string;
}) {
    const [user, setUser] = useState<ResultData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const rollNumber = roll_number.toUpperCase().split("-").join("/");
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
                const resultResponse = await fetch(`${apiUrl}/api/result/get?ROLL_NO=${rollNumber}`);

                if (!resultResponse.ok) {
                    throw new Error('Failed to fetch user data');
                }

                const userData = await resultResponse.json();
                setUser(userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Error loading user data. Please try again later..');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [roll_number]);

    const handlePrint = () => {
        window.print();
    };

    if (error) {
        return (
            <div className="flex min-h-[90vh] items-center justify-center p-4">
                <Alert variant="destructive" className="max-w-md animate-in fade-in duration-300">
                    <AlertCircle className="h-5 w-5" />
                    <AlertTitle className="text-lg">Error</AlertTitle>
                    <AlertDescription className="mt-2">{error}</AlertDescription>
                </Alert>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="p-4 sm:p-6 lg:p-8 max-w-[90rem] mx-auto space-y-6">
                <Skeleton className="h-[100px] w-full rounded-xl" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    <Skeleton className="h-[120px] rounded-xl" />
                    <Skeleton className="h-[120px] rounded-xl" />
                    <Skeleton className="h-[120px] rounded-xl" />
                </div>
                <Skeleton className="h-[400px] rounded-xl" />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex min-h-[90vh] items-center justify-center p-4">
                <Alert className="max-w-md animate-in fade-in duration-300">
                    <AlertCircle className="h-5 w-5" />
                    <AlertTitle className="text-lg">Not Found</AlertTitle>
                    <AlertDescription className="mt-2">No data found for this roll number.</AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <div className="max-w-[90rem] mx-auto p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 sm:mb-6">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Academic Report</h1>
                <Button
                    onClick={handlePrint}
                    className="print:hidden flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-all w-full sm:w-auto"
                >
                    <Printer className="h-5 w-5" />
                    Print Report
                </Button>
            </div>

            <div className="bg-white rounded-xl border p-4 sm:p-6 lg:p-8 transition-all ">
                <div className="flex flex-col sm:flex-row w-full justify-between mb-6 sm:mb-8">
                    <div className="flex items-center gap-3">
                        <div
                            className="flex aspect-square h-20 w-20 items-center justify-center rounded-full border text-4xl font-bold text-[#999] shadow"
                            style={{
                                backgroundImage: "linear-gradient(to right, #000, #999)",
                                WebkitBackgroundClip: "text",
                                backgroundClip: "text",
                                color: "transparent",
                            }}
                        >
                            {user.name.split(" ").length > 1
                                ? user.name?.split(" ")[0]?.split("")[0] +
                                "" +
                                user.name?.split(" ")[1]?.split("")[0]
                                : user.name?.split(" ")[0]?.split("")[0]}
                        </div>
                        <div className="w-max">
                            <div className="text-4xl font-bold">{user.name}</div>
                            <div className="flex w-full items-center gap-2 text-justify text-base text-gray-700">
                                <div>{user.rollNumber}</div> | <div>{user.course}</div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <div className="text-sm text-gray-700">ADMISSION YEAR</div>
                            <div className="text-4xl font-bold">{user.admissionYear}</div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-700">GRADUATION YEAR</div>
                            <div className="text-4xl font-bold">{user.graduationYear}</div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 sm:p-8 rounded-xl border transition-all transform hover:-translate-y-1">
                        <p className="text-gray-700 font-semibold text-base sm:text-lg">Aggregated CGPA</p>
                        <p className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">{user.aggregatedCgpa.toFixed(2)}</p>
                    </div>
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 sm:p-8 rounded-xl border transition-all transform hover:-translate-y-1">
                        <p className="text-gray-700 font-semibold text-base sm:text-lg">{user.course}&apos;s Rank</p>
                        <p className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">#{user.courseRank}</p>
                    </div>
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 sm:p-8 rounded-xl border transition-all transform hover:-translate-y-1">
                        <p className="text-gray-700 font-semibold text-base sm:text-lg">{user.discipline}&apos;s Rank</p>
                        <p className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">#{user.majorRank}</p>
                    </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-gray-200 ">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-100">
                                <TableHead className="font-bold text-gray-900 whitespace-nowrap">Semester</TableHead>
                                <TableHead className="font-bold text-gray-900 whitespace-nowrap">Credits</TableHead>
                                <TableHead className="font-bold text-gray-900 whitespace-nowrap">CGPA</TableHead>
                                <TableHead className="font-bold text-gray-900 whitespace-nowrap">{user.course}&apos;s Rank</TableHead>
                                <TableHead className="font-bold text-gray-900 whitespace-nowrap">{user.discipline}&apos;s Rank</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {user.semesterResults
                                .sort((a, b) => a.semesterNumber - b.semesterNumber)
                                .map((semester) => (
                                    <TableRow key={semester.semesterNumber} className="hover:bg-gray-50 transition-colors">
                                        <TableCell className="font-semibold text-gray-900 whitespace-nowrap">Semester {semester.semesterNumber}</TableCell>
                                        <TableCell>{semester.credits}</TableCell>
                                        <TableCell className="font-semibold text-gray-900">{semester.cgpa.toFixed(2)}</TableCell>
                                        <TableCell>#{semester.courseRank}</TableCell>
                                        <TableCell>#{semester.majorRank}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                <CGPACARD dataOfStudent={user} />
                <CGPA dataOfStudent={user} />
                {user.companiesData.map((company) => (
                    <CompanyData
                        key={company.title}
                        companyTierData={company}
                        updatedCGPA={user.updatedCGPA}
                        cgpa={user.aggregatedCgpa}
                    />
                ))}
                <CTC placement={user.placementType} />
            </div>

            <style jsx global>{`
                @media print {
                    body {
                        print-color-adjust: exact;
                        -webkit-print-color-adjust: exact;
                        width: 1400px !important;
                        margin: 0 auto;
                    }
                    .print\\:hidden {
                        display: none !important;
                    }
                    @page {
                        size: 1400px;
                        margin: 0;
                    }
                    .header_navbar {
                        display: none;
                    }
                    .footer_bottom {
                        display: none;
                    }
                }

                @media (max-width: 640px) {
                    .recharts-wrapper {
                        font-size: 12px;
                    }
                }
            `}</style>
        </div>
    );
}

export const CGPA = ({ dataOfStudent }: { dataOfStudent: ResultData }) => {
    const data = dataOfStudent.semesterResults
        .sort((a, b) => a.semesterNumber - b.semesterNumber)
        .map(result => ({
            name: `Sem ${result.semesterNumber}`,
            CGPA: result.cgpa,
        }));

    const minCGPA = Math.floor(Math.min(...data.map(item => item.CGPA)));

    return (
        <div className='bg-white rounded-xl border p-4 sm:p-6 lg:p-8 transition-all'>
            <h3 className='text-xl font-bold mb-4 sm:mb-6 text-gray-800'>CGPA Progression</h3>
            <div className="w-full h-[300px] sm:h-[350px]">
                <ResponsiveContainer>
                    <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="name" stroke="#6b7280" />
                        <YAxis domain={[minCGPA, 10]} stroke="#6b7280" />
                        <Tooltip contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                        <Line type="monotone" dataKey="CGPA" stroke="#4b5563" strokeWidth={2} dot={{ fill: '#4b5563', strokeWidth: 2 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export const CompanyData = ({ companyTierData, updatedCGPA, cgpa }: { companyTierData: CompanyTierData, updatedCGPA: number, cgpa: number }) => {
    const { allows, total, title, tiers } = companyTierData;

    const data = [
        { name: 'Eligible', value: allows, color: "#4b5563" },
        { name: "Not Eligible", value: total - allows, color: "#e5e7eb" },
    ];

    const tierData = [
        { label: "S+", value: tiers.sPlusTier },
        { label: "A+", value: tiers.aPlusTier },
        { label: "A", value: tiers.aTier },
        { label: "B", value: tiers.bTier },
        { label: "C", value: tiers.cTier }
    ];

    const displayCGPA = title.includes("Updated") ? updatedCGPA : cgpa;

    return (
        <div className='bg-white rounded-xl border p-4 sm:p-6 lg:p-8 transition-all'>
            <h3 className='text-xl font-bold mb-4 sm:mb-6 text-gray-800'>{title}</h3>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8'>
                <div className='bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 rounded-xl'>
                    <p className='text-gray-600 font-medium'>Eligible Companies</p>
                    <p className='text-xl sm:text-2xl font-bold text-gray-800 mt-2'>{allows}/{total}</p>
                </div>
                {!title.includes("branch") && <div className='bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 rounded-xl'>
                    <p className='text-gray-600 font-medium'>CGPA</p>
                    <p className='text-xl sm:text-2xl font-bold text-gray-800 mt-2'>{displayCGPA.toFixed(2)}</p>
                </div>}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                <div className="w-full h-[250px] sm:h-[300px]">
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                innerRadius={60}
                                label={({ name, value }) => ` ${value}`}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'white',
                                    borderRadius: '8px',
                                    border: 'none',
                                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                }}
                                formatter={(value, name) => [`${value} companies`, name]}
                            />
                            <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-800">Company Tiers</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3">
                        {tierData.map(({ label, value }) => (
                            <div key={label} className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                                <p className="text-gray-600 font-medium">{label}</p>
                                <p className="text-lg sm:text-xl font-bold text-gray-800 mt-1">{value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export const CGPACARD = ({ dataOfStudent }: { dataOfStudent: ResultData }) => {
    const [credits1, setCredits1] = useState(26);
    const [credits2, setCredits2] = useState(26);
    const [targetCGPA, setTargetCGPA] = useState(dataOfStudent.updatedCGPA);

    const totalCredits = dataOfStudent.semesterResults.reduce((sum, sem) => sum + sem.credits, 0);
    const currentPoints = dataOfStudent.semesterResults.reduce((sum, sem) => sum + (sem.cgpa * sem.credits), 0);
    const nextSemNumber = dataOfStudent.semesterResults.length + 1;

    const requiredCGPA = ((targetCGPA * (totalCredits + credits1 + credits2)) - currentPoints) / (credits1 + credits2);
    const semLabels = ["Next", "Final"];

    if (dataOfStudent.updatedCGPA > 10 || nextSemNumber > 7) return null;

    return (
        <div className='bg-white rounded-xl border p-4 sm:p-6 lg:p-8 transition-all'>
            <h3 className='text-xl font-bold mb-4 sm:mb-6 text-gray-800'>CGPA Calculator</h3>
            <div className='space-y-4 sm:space-y-6'>
                <div>
                    <label className='block text-gray-600 font-medium mb-2'>Target CGPA</label>
                    <input
                        type="number"
                        value={targetCGPA}
                        onChange={(e) => setTargetCGPA(Number(e.target.value))}
                        className='w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-200 outline-none transition-all'
                        step="0.1"
                        min="0"
                        max="10"
                    />
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6'>
                    {semLabels.map((label, i) => (
                        <div key={label}>
                            <label className='block text-gray-600 font-medium mb-2'>{label} Sem Credits</label>
                            <input
                                type="number"
                                value={i === 0 ? credits1 : credits2}
                                onChange={(e) => i === 0 ? setCredits1(Number(e.target.value)) : setCredits2(Number(e.target.value))}
                                className='w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-200 outline-none transition-all'
                                min="0"
                            />
                        </div>
                    ))}
                </div>
                {requiredCGPA < 10 && (
                    <div className='bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 rounded-xl text-center'>
                        <p className='text-gray-600 font-medium'>Required CGPA per semester</p>
                        <p className='text-2xl sm:text-3xl font-bold text-gray-800 mt-2'>{requiredCGPA.toFixed(2)}</p>
                        <p className='text-sm text-gray-500 mt-2'>To achieve {targetCGPA.toFixed(2)} final CGPA</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export const CTC = ({ placement }: { placement: 'intern' | 'fullTime' }) => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 lg:p-8">
            <h3 className="text-xl font-bold mb-4 sm:mb-6 text-gray-800">CTC Tiers</h3>
            <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-3 sm:p-4 rounded-lg">
                        <p className="text-gray-600 font-medium">S+ Tier</p>
                        <p className="text-xl sm:text-2xl font-bold text-gray-800 mt-2">
                            {placement === 'fullTime' ? '₹30+ LPA' : '₹1+ LPM'}
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-3 sm:p-4 rounded-lg">
                        <p className="text-gray-600 font-medium">A+ Tier</p>
                        <p className="text-xl sm:text-2xl font-bold text-gray-800 mt-2">
                            {placement === 'fullTime' ? '₹20-30 LPA' : '₹50K-1L PM'}
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-3 sm:p-4 rounded-lg">
                        <p className="text-gray-600 font-medium">A Tier</p>
                        <p className="text-xl sm:text-2xl font-bold text-gray-800 mt-2">
                            {placement === 'fullTime' ? '₹10-20 LPA' : '₹25-50K PM'}
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-3 sm:p-4 rounded-lg">
                        <p className="text-gray-600 font-medium">B Tier</p>
                        <p className="text-xl sm:text-2xl font-bold text-gray-800 mt-2">
                            {placement === 'fullTime' ? '₹5-10 LPA' : '₹10-25K PM'}
                        </p>
                    </div>
                </div>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-3 sm:p-4 rounded-lg">
                    <p className="text-gray-600 font-medium">C Tier</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-800 mt-2">
                        {placement === 'fullTime' ? 'Below ₹5 LPA' : 'Below ₹10K PM'}
                    </p>
                </div>
            </div>
        </div>
    )
}
