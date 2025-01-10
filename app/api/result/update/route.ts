import { NextResponse } from "next/server";
import { Result } from "../../../../lib/models/result.model";
import { connectToDB } from "../../../../lib/mongodb";

export async function POST(req: Request) {
    try {
        await connectToDB();

        const input = await req.json();
        const notAlreadyExists: string[] = [];

        // Process each result
        for (const resultInput of input) {
            // Check if result exists
            const resultExists = await Result.findOne({
                rollNumber: resultInput.ROLL_NO
            }).populate('semesterResults');

            if (!resultExists) {
                notAlreadyExists.push(resultInput.ROLL_NO);
                continue;
            }

            // Update semester results
            for (const existingSem of resultExists.semesterResults) {
                for (const newSem of resultInput.SEMESTERS_RESULT) {
                    if (existingSem.semesterNumber === newSem.SEM_NO) {
                        existingSem.cgpa = newSem.SEM_CGPA;
                        existingSem.credits = newSem.SEM_CREDITS;
                    }
                }
            }

            // Recalculate aggregated CGPA
            let sumCGPAXCREDITS = 0;
            let sumCREDITS = 0;
            for (const sem of resultExists.semesterResults) {
                sumCGPAXCREDITS += sem.cgpa * sem.credits;
                sumCREDITS += sem.credits;
            }

            resultExists.aggregatedCgpa = sumCGPAXCREDITS === 0 ? 0 : (sumCGPAXCREDITS / sumCREDITS);
            await resultExists.save();
        }

        // Get all results for ranking calculations
        const allResults = await Result.find({
            graduationYear: input[0]?.GRADUATING_YEAR
        }).populate('semesterResults');

        // Sorting function
        const sortStudents = (results: any[]) => {
            return results.sort((a, b) => {
                if (b.aggregatedCgpa !== a.aggregatedCgpa) {
                    return b.aggregatedCgpa - a.aggregatedCgpa;
                }
                return a.name.localeCompare(b.name);
            });
        };

        // Calculate university ranks
        const uniSorted = sortStudents([...allResults]);
        uniSorted.forEach((result, index) => {
            result.universityRank = index + 1;
        });

        // Calculate college ranks
        const collegeGroups = uniSorted.reduce((groups: any, result) => {
            if (!groups[result.college]) {
                groups[result.college] = [];
            }
            groups[result.college].push(result);
            return groups;
        }, {});

        Object.values(collegeGroups).forEach((group: any) => {
            const sorted = sortStudents(group);
            sorted.forEach((result: any, index: number) => {
                result.collegeRank = index + 1;
            });
        });

        // Calculate course ranks
        const courseGroups = uniSorted.reduce((groups: any, result) => {
            if (!groups[result.course]) {
                groups[result.course] = [];
            }
            groups[result.course].push(result);
            return groups;
        }, {});

        Object.values(courseGroups).forEach((group: any) => {
            const sorted = sortStudents(group);
            sorted.forEach((result: any, index: number) => {
                result.courseRank = index + 1;
            });
        });

        // Calculate major ranks
        const majorGroups = uniSorted.reduce((groups: any, result) => {
            if (!groups[result.major]) {
                groups[result.major] = [];
            }
            groups[result.major].push(result);
            return groups;
        }, {});

        Object.values(majorGroups).forEach((group: any) => {
            const sorted = sortStudents(group);
            sorted.forEach((result: any, index: number) => {
                result.majorRank = index + 1;
            });
        });

        // Calculate semester-wise course ranks
        Object.values(courseGroups).forEach(group => {
            const maxSemesters = Math.max(...(group as any[]).map(r => r.semesterResults.length));

            for (let sem = 0; sem < maxSemesters; sem++) {
                const sortedBySemester = (group as any[]).sort((a, b) => {
                    const semA = a.semesterResults[sem];
                    const semB = b.semesterResults[sem];
                    if (!semA || !semB) return 0;
                    if (semB.cgpa !== semA.cgpa) {
                        return semB.cgpa - semA.cgpa;
                    }
                    return a.name.localeCompare(b.name);
                });

                sortedBySemester.forEach((result, index) => {
                    if (result.semesterResults[sem]) {
                        result.semesterResults[sem].courseRank = index + 1;
                    }
                });
            }
        });

        // Calculate semester-wise major ranks
        Object.values(majorGroups).forEach(group => {
            const maxSemesters = Math.max(...(group as any[]).map(r => r.semesterResults.length));

            for (let sem = 0; sem < maxSemesters; sem++) {
                const sortedBySemester = (group as any[]).sort((a, b) => {
                    const semA = a.semesterResults[sem];
                    const semB = b.semesterResults[sem];
                    if (!semA || !semB) return 0;
                    if (semB.cgpa !== semA.cgpa) {
                        return semB.cgpa - semA.cgpa;
                    }
                    return a.name.localeCompare(b.name);
                });

                sortedBySemester.forEach((result, index) => {
                    if (result.semesterResults[sem]) {
                        result.semesterResults[sem].majorRank = index + 1;
                    }
                });
            }
        });

        // Save all updates
        await Promise.all(uniSorted.map(result => result.save()));

        // Fetch updated results
        const updatedResults = await Result.find().populate('semesterResults');

        return NextResponse.json({
            updatedResults,
            notAlreadyExists
        });

    } catch (error: any) {
        console.error(error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
