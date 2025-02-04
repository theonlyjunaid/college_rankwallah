import { NextResponse } from "next/server";
import { Result } from "../../../../lib/models/result.model";
import { connectToDB } from "../../../../lib/mongodb";

export async function GET(req: Request) {
    try {
        await connectToDB();

        // Only fetch roll numbers, excluding _id field
        const results = await Result.find(
            {},
            { rollNumber: 1, _id: 0 }
        ).lean();

        // Transform roll numbers to use hyphens instead of slashes
        const sanitizedResults = results.map(({ rollNumber }) => (
            rollNumber.split('/').join('-')
        ));

        // Cache the response for 1 hour
        const response = NextResponse.json(sanitizedResults);
        response.headers.set('Cache-Control', 'public, max-age=3600');

        return response;

    } catch (error: any) {
        console.error('Error fetching roll numbers:', error);
        return NextResponse.json(
            { error: 'Failed to fetch roll numbers' },
            { status: 500 }
        );
    }
}
