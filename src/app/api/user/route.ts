import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/db_client"; 

export async function GET(request: NextRequest) {
    try {
        // Fetch all users from the database
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                phoneNo: true,
                name: true,
                createdAt: true,
                updatedAt: true,
               
            }
        });

      
        return NextResponse.json({ users }, { status: 200 });
    } catch (error) {
        console.error("Failed to fetch users:", error);
        return NextResponse.json(
            { error: "An error occurred while fetching users" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password, phoneNo, name } = body;

        // Create a new user
        const newUser = await prisma.user.create({
            data: {
                email,
                password, 
                phoneNo,
                name,
            },
        });

       
        const { password: _, ...userWithoutPassword } = newUser;
        return NextResponse.json({ user: userWithoutPassword }, { status: 201 });
    } catch (error) {
        console.error("Failed to create user:", error);
        return NextResponse.json(
            { error: "An error occurred while creating the user" },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        // Delete the user
        await prisma.user.delete({
            where: { id },
        });

        return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Failed to delete user:", error);
        return NextResponse.json(
            { error: "An error occurred while deleting the user" },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        const body = await request.json();
        const { email, password, phoneNo, name } = body;

        // Update the user
        const updatedUser = await prisma.user.update({
            where: { id },
            data: {
                email,
                password, 
                phoneNo,
                name,
            },
        });

      
        const { password: _, ...userWithoutPassword } = updatedUser;
        return NextResponse.json({ user: userWithoutPassword }, { status: 200 });
    } catch (error) {
        console.error("Failed to update user:", error);
        return NextResponse.json(
            { error: "An error occurred while updating the user" },
            { status: 500 }
        );
    }
}