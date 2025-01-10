"use client"
import React, { useState } from 'react'
import { ResultData } from '../../types/result';

const CGPACARD = ({ dataOfStudent }: { dataOfStudent: ResultData }) => {
    // Calculate total credits from semester results
    const totalCredits = dataOfStudent.semesterResults.reduce((sum, sem) => sum + sem.credits, 0);

    // Get next semester number
    const nextSemNumber = dataOfStudent.semesterResults.length + 1;

    // State for credits
    const [credits1, setCredits1] = useState(26);
    const [credits2, setCredits2] = useState(26);
    const [targetCGPA, setTargetCGPA] = useState(dataOfStudent.updatedCGPA);

    // Calculate current total points
    const currentPoints = dataOfStudent.semesterResults.reduce((sum, sem) => sum + (sem.cgpa * sem.credits), 0);

    // Calculate required CGPA for both semesters
    const calculateRequiredCGPA = () => {
        const totalNewCredits = credits1 + credits2;
        const targetPoints = targetCGPA * (totalCredits + totalNewCredits);
        const remainingPoints = targetPoints - currentPoints;

        // Assuming equal CGPA needed in both semesters
        return remainingPoints / totalNewCredits;
    }

    const requiredCGPA = calculateRequiredCGPA();

    // Get semester labels based on next semester
    const getSemesterLabels = () => {
        if (nextSemNumber === 3) return ["3rd", "4th"];
        if (nextSemNumber === 5) return ["5th", "6th"];
        if (nextSemNumber === 7) return ["7th", "8th"];
        return [];
    }

    const semLabels = getSemesterLabels();

    return (
        <div className='border w-max mx-auto shadow-md flex justify-center items-center rounded-md p-6'>
            {dataOfStudent.updatedCGPA <= 10 && semLabels.length > 0 && (
                <div className='flex w-[350px] flex-col justify-center items-center gap-6'>
                    <div className='w-full'>
                        <div className='flex justify-between items-center mb-4'>
                            <label className='font-medium'>Target CGPA:</label>
                            <input
                                type="number"
                                value={targetCGPA}
                                onChange={(e) => setTargetCGPA(Number(e.target.value))}
                                className='border rounded px-2 py-1 w-24'
                                step="0.1"
                                min="0"
                                max="10"
                            />
                        </div>

                        <div className='flex justify-between items-center mb-4'>
                            <label className='font-medium'>{semLabels[0]} Sem Credits:</label>
                            <input
                                type="number"
                                value={credits1}
                                onChange={(e) => setCredits1(Number(e.target.value))}
                                className='border rounded px-2 py-1 w-24'
                                min="0"
                            />
                        </div>

                        <div className='flex justify-between items-center mb-4'>
                            <label className='font-medium'>{semLabels[1]} Sem Credits:</label>
                            <input
                                type="number"
                                value={credits2}
                                onChange={(e) => setCredits2(Number(e.target.value))}
                                className='border rounded px-2 py-1 w-24'
                                min="0"
                            />
                        </div>
                    </div>

                    {requiredCGPA < 10 && (
                        <div className="text-center bg-gray-50 p-4 rounded-lg w-full">
                            <p>To achieve <span className="font-bold">{targetCGPA} CGPA</span></p>
                            <p>You need to score approximately</p>
                            <p className="font-bold text-lg text-green-600 my-2">
                                {requiredCGPA.toFixed(2)} CGPA
                            </p>
                            <p>in both {semLabels[0]} & {semLabels[1]} semesters</p>
                            <p className="text-sm text-gray-600 mt-2">
                                Total credits: {credits1 + credits2}
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default CGPACARD