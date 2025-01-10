import { NextResponse } from "next/server";
import { Result } from "../../../../lib/models/result.model";
import { connectToDB } from "../../../../lib/mongodb";

export async function POST(req: Request) {
    try {
        await connectToDB();

        const input = await req.json();
        const alreadyExists: string[] = [];

        // Process each result
        for (const resultInput of input) {
            // Check if result already exists
            const resultAlreadyExists = await Result.findOne({
                rollNumber: resultInput.ROLL_NO
            });

            if (resultAlreadyExists) {
                alreadyExists.push(resultInput.ROLL_NO);
                continue;
            }

            // Calculate aggregated CGPA
            let sumCGPAXCREDITS = 0;
            let sumCREDITS = 0;
            for (const sem of resultInput.SEMESTERS_RESULT) {
                sumCGPAXCREDITS += sem.SEM_CGPA * sem.SEM_CREDITS;
                sumCREDITS += sem.SEM_CREDITS;
            }

            // Create new result
            await Result.create({
                name: resultInput.NAME,
                rollNumber: resultInput.ROLL_NO,
                admissionYear: resultInput.ADMITTED_YEAR,
                graduationYear: resultInput.GRADUATING_YEAR,
                discipline: resultInput.DISCIPLINE,
                major: resultInput.MAJOR,
                course: resultInput.COURSE,
                college: resultInput.COLLEGE,
                university: resultInput.COLLEGE, // Using college as university
                aggregatedCgpa: sumCGPAXCREDITS === 0 ? 0 : (sumCGPAXCREDITS / sumCREDITS),
                semesterResults: resultInput.SEMESTERS_RESULT.map((sem: any) => ({
                    semesterNumber: sem.SEM_NO,
                    credits: sem.SEM_CREDITS,
                    cgpa: sem.SEM_CGPA
                }))
            });
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
        const uniSorted = sortStudents(allResults);
        for (let i = 0; i < uniSorted.length; i++) {
            uniSorted[i].universityRank = i + 1;
        }

        // Calculate college ranks
        const collegeGroups = new Map();
        uniSorted.forEach(result => {
            if (!collegeGroups.has(result.college)) {
                collegeGroups.set(result.college, []);
            }
            collegeGroups.get(result.college).push(result);
        });

        collegeGroups.forEach(group => {
            const sorted = sortStudents(group);
            sorted.forEach((result: any, index: number) => {
                result.collegeRank = index + 1;
            });
        });

        // Calculate course ranks
        const courseGroups = new Map();
        uniSorted.forEach(result => {
            if (!courseGroups.has(result.course)) {
                courseGroups.set(result.course, []);
            }
            courseGroups.get(result.course).push(result);
        });

        courseGroups.forEach(group => {
            const sorted = sortStudents(group);
            sorted.forEach((result: any, index: number) => {
                result.courseRank = index + 1;
            });
        });

        // Calculate major ranks
        const majorGroups = new Map();
        uniSorted.forEach(result => {
            if (!majorGroups.has(result.major)) {
                majorGroups.set(result.major, []);
            }
            majorGroups.get(result.major).push(result);
        });

        majorGroups.forEach(group => {
            const sorted = sortStudents(group);
            sorted.forEach((result: any, index: number) => {
                result.majorRank = index + 1;
            });
        });

        // Calculate semester-wise ranks
        courseGroups.forEach(group => {
            const maxSemesters = Math.max(...group.map((r: any) => r.semesterResults.length));

            for (let sem = 0; sem < maxSemesters; sem++) {
                const sortedBySemester = group.sort((a: any, b: any) => {
                    const semA = a.semesterResults[sem];
                    const semB = b.semesterResults[sem];
                    if (!semA || !semB) return 0;
                    if (semB.cgpa !== semA.cgpa) {
                        return semB.cgpa - semA.cgpa;
                    }
                    return a.name.localeCompare(b.name);
                });

                sortedBySemester.forEach((result: any, index: number) => {
                    if (result.semesterResults[sem]) {
                        result.semesterResults[sem].courseRank = index + 1;
                    }
                });
            }
        });

        majorGroups.forEach(group => {
            const maxSemesters = Math.max(...group.map((r: any) => r.semesterResults.length));

            for (let sem = 0; sem < maxSemesters; sem++) {
                const sortedBySemester = group.sort((a: any, b: any) => {
                    const semA = a.semesterResults[sem];
                    const semB = b.semesterResults[sem];
                    if (!semA || !semB) return 0;
                    if (semB.cgpa !== semA.cgpa) {
                        return semB.cgpa - semA.cgpa;
                    }
                    return a.name.localeCompare(b.name);
                });

                sortedBySemester.forEach((result: any, index: number) => {
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
            alreadyExists
        });

    } catch (error: any) {
        console.error(error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
