import { NextResponse } from "next/server";
import { Result } from "../../../../lib/models/result.model";
import { connectToDB } from "../../../../lib/mongodb";

export async function GET(req: Request) {
    try {
        await connectToDB();

        // Basic counts
        const totalStudents = await Result.countDocuments();

        // Get unique years
        const years = await Result.aggregate([
            {
                $group: {
                    _id: null,
                    admissionYears: { $addToSet: "$admissionYear" },
                    graduationYears: { $addToSet: "$graduationYear" }
                }
            }
        ]);

        // Get counts by college
        const collegeStats = await Result.aggregate([
            {
                $group: {
                    _id: "$college",
                    count: { $sum: 1 }
                }
            }
        ]);

        // Get counts by university
        const universityStats = await Result.aggregate([
            {
                $group: {
                    _id: "$university",
                    count: { $sum: 1 }
                }
            }
        ]);

        // Get counts by major
        const majorStats = await Result.aggregate([
            {
                $group: {
                    _id: "$major",
                    count: { $sum: 1 }
                }
            }
        ]);

        // Get counts by course
        const courseStats = await Result.aggregate([
            {
                $group: {
                    _id: "$course",
                    count: { $sum: 1 }
                }
            }
        ]);

        // Get CGPA stats
        const cgpaStats = await Result.aggregate([
            {
                $group: {
                    _id: null,
                    averageCGPA: { $avg: "$aggregatedCgpa" },
                    maxCGPA: { $max: "$aggregatedCgpa" },
                    minCGPA: { $min: "$aggregatedCgpa" }
                }
            }
        ]);

        return NextResponse.json({
            totalStudents,
            admissionYears: years[0]?.admissionYears.sort() || [],
            graduationYears: years[0]?.graduationYears.sort() || [],
            collegeWiseCount: Object.fromEntries(
                collegeStats.map(stat => [stat._id, stat.count])
            ),
            universityWiseCount: Object.fromEntries(
                universityStats.map(stat => [stat._id, stat.count])
            ),
            majorWiseCount: Object.fromEntries(
                majorStats.map(stat => [stat._id, stat.count])
            ),
            courseWiseCount: Object.fromEntries(
                courseStats.map(stat => [stat._id, stat.count])
            ),
            cgpaStats: {
                average: cgpaStats[0]?.averageCGPA || 0,
                highest: cgpaStats[0]?.maxCGPA || 0,
                lowest: cgpaStats[0]?.minCGPA || 0
            }
        });

    } catch (error: any) {
        console.error(error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
