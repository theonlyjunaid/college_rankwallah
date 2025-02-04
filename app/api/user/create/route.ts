import { NextResponse } from "next/server";
import { connectToDB } from "../../../../lib/mongodb";
import User from "../../../../lib/models/user.model";

export async function POST(req: Request) {
    try {
        await connectToDB();

        const body = await req.json();
        const { clerkId, name, email, rollNumber } = body;

        // Validate required fields
        if (!clerkId || !name || !email || !rollNumber) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        // Check if user already exists
        const existingUser = await User.findOne({
            clerkId: clerkId
        });

        if (existingUser) {
            await User.updateOne(
                {
                    clerkId: clerkId,
                },
                {
                    $set: {
                        name: name,
                        email: email,
                        role: 'USER',
                        rollNumber: rollNumber,
                        onboarded: true
                    }
                }
            );

            return NextResponse.json({ clerkId: clerkId, name: name, email: email, rollNumber: rollNumber });
        }

        // Create new user
        await User.create({
            clerkId: clerkId,
            name: name,
            email: email,
            role: 'USER',
            rollNumber: rollNumber,
            onboarded: true
        });

        return NextResponse.json({ clerkId: clerkId, name: name, email: email, rollNumber: rollNumber });

    } catch (error) {
        console.log("[USER_CREATE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
