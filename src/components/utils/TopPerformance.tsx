import React from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
import { Trophy, Medal } from "lucide-react";

const topPerformers = {
    "2021": [
        { name: "MADHUR AGARWAL", rollNumber: "2K21/EE/175", cgpa: 9.89, major: "EE", collegeRank: 1 },
        { name: "SANYA KHURANA", rollNumber: "2K21/CO/419", cgpa: 9.89, major: "CO", collegeRank: 2 },
        { name: "SIYA MITTAL", rollNumber: "2K21/CO/468", cgpa: 9.85, major: "CO", collegeRank: 3 },
    ],
    "2022": [
        { name: "NIKHIL SHARMA", rollNumber: "2K22/IT/114", cgpa: 9.98, major: "IT", collegeRank: 1 },
        { name: "LAVYA THAPAR", rollNumber: "2K22/IT/95", cgpa: 9.95, major: "IT", collegeRank: 2 },
        { name: "ANMOL AHSAAS SHARAN", rollNumber: "2K22/SE/26", cgpa: 9.93, major: "SE", collegeRank: 3 },
    ],
    "2023": [
        { name: "ASHMIT JAKHWAL", rollNumber: "2K23/ME/323", cgpa: 9.95, major: "ME", collegeRank: 1 },
        { name: "SPARSH JAIN", rollNumber: "2K23/AE/113", cgpa: 9.95, major: "AE", collegeRank: 2 },
        { name: "DIVYANSH AGARWAL", rollNumber: "2K23/SE/060", cgpa: 9.90, major: "SE", collegeRank: 3 },
    ],


}

const TopPerformance = () => {
    return (
        <section id="top-performers" className="container px-4 py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white rounded-3xl border border-gray-200 ">
            <div className="mx-auto max-w-[800px] text-center mb-8 sm:mb-12">
                <div className="inline-flex items-center justify-center mb-4 sm:mb-6">
                    <Trophy className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-gray-500 mr-3" />
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-800">
                        Top Performers
                    </h2>
                </div>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
                    Meet our academic achievers who consistently demonstrate excellence and set new standards
                </p>
            </div>

            <Tabs defaultValue="2021" className="w-full md:px-10">
                <div className="flex justify-center mb-6 sm:mb-8 overflow-x-auto">
                    <TabsList className="inline-flex h-12 sm:h-14 items-center justify-center rounded-xl bg-gray-100/80 p-1">
                        {Object.keys(topPerformers).map((year) => (
                            <TabsTrigger
                                key={year}
                                value={year}
                                className="rounded-lg px-4 sm:px-6 md:px-8 py-2 sm:py-3 text-sm sm:text-base font-semibold transition-all hover:bg-white/80 data-[state=active]:bg-white data-[state=active]:shadow-md"
                            >
                                {year} Batch
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </div>

                {Object.entries(topPerformers).map(([year, performers]) => (
                    <TabsContent key={year} value={year} className="mt-4">
                        <Card className="border border-gray-200 shadow-sm overflow-hidden">
                            <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 py-6 sm:py-8">
                                <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 flex items-center justify-center">
                                    <Medal className="h-6 w-6 sm:h-8 sm:w-8 text-gray-500 mr-3" />
                                    Top Performers of {year} Batch
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="bg-gray-50 hover:bg-gray-50">
                                                <TableHead className="w-[80px] sm:w-[120px] font-bold text-gray-700">Rank</TableHead>
                                                <TableHead className="font-bold text-gray-700">Name</TableHead>
                                                <TableHead className="font-bold text-gray-700 hidden md:table-cell">Roll Number</TableHead>
                                                <TableHead className="font-bold text-gray-700">Branch</TableHead>
                                                <TableHead className="text-center font-bold text-gray-700">CGPA</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {performers.map((performer, index) => (
                                                <TableRow
                                                    key={index}
                                                    className={`
                                                        hover:bg-gray-50 transition-colors
                                                        ${index === 0 ? 'bg-gray-100' : ''}
                                                        ${index === 1 ? 'bg-gray-50' : ''}
                                                        ${index === 2 ? 'bg-gray-100' : ''}
                                                    `}
                                                >
                                                    <TableCell className="font-bold text-base sm:text-lg">
                                                        <span className={`
                                                            inline-flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full
                                                            ${index === 0 ? 'bg-gray-200 text-gray-800' : ''}
                                                            ${index === 1 ? 'bg-gray-100 text-gray-700' : ''}
                                                            ${index === 2 ? 'bg-gray-200 text-gray-800' : ''}
                                                        `}>
                                                            {performer.collegeRank}
                                                        </span>
                                                    </TableCell>
                                                    <TableCell className="font-semibold text-sm sm:text-base">{performer.name}</TableCell>
                                                    <TableCell className="hidden md:table-cell text-gray-600 text-sm sm:text-base">{performer.rollNumber}</TableCell>
                                                    <TableCell className="font-medium text-sm sm:text-base">{performer.major}</TableCell>
                                                    <TableCell className="text-center font-bold text-gray-800 text-sm sm:text-base">{performer.cgpa}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                ))}
            </Tabs>
        </section>
    )
}

export default TopPerformance