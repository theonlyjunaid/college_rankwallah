import { NextResponse } from "next/server";
import { connectToDB } from "../../../../lib/mongodb";
import User from "../../../../lib/models/user.model";

export async function POST(req: Request) {
    try {
        await connectToDB();

        const body = await req.json();
        const { clerkId, name, email } = body;

        // Validate required fields
        if (!clerkId || !name || !email) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        // Check if user already exists
        const existingUser = await User.findOne({
            clerkId: clerkId
        });

        if (existingUser) {
            return new NextResponse("User already exists", { status: 400 });
        }

        // Create new user
        const user = await User.create({
            clerkId: clerkId,
            name: name,
            email: email,
            role: 'USER',
            onboarded: true
        });

        return NextResponse.json(user);

    } catch (error) {
        console.log("[USER_CREATE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
