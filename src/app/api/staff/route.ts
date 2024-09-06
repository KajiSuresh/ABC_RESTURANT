import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/db_client"; // Make sure this path is correct for your Prisma client

export async function GET(request: NextRequest) {
    try {
        // Fetch all staff members from the database
        const staff = await prisma.staffType.findMany({
            select: {
                id: true,
                staffname: true,
                email: true,
                phone: true,
                position: true,
                createdAt: true,
                updatedAt: true,
                // Note: We're not selecting the password field for security reasons
            }
        });

        // Return the staff members as a JSON response
        return NextResponse.json({ staff }, { status: 200 });
    } catch (error) {
        console.error("Failed to fetch staff:", error);
        return NextResponse.json(
            { error: "An error occurred while fetching staff" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { staffname, email, phone, password, position } = body;

        // Create a new staff member
        const newStaff = await prisma.staffType.create({
            data: {
                staffname,
                email,
                phone,
                password, // Note: storing password as plain text
                position,
            },
        });

        // Return the new staff member without the password
        const { password: _, ...staffWithoutPassword } = newStaff;
        return NextResponse.json({ staff: staffWithoutPassword }, { status: 201 });
    } catch (error) {
        console.error("Failed to create staff:", error);
        return NextResponse.json(
            { error: "An error occurred while creating the staff member" },
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

        // Delete the staff member
        await prisma.staffType.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Staff member deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Failed to delete staff:", error);
        return NextResponse.json(
            { error: "An error occurred while deleting the staff member" },
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
        const { staffname, email, phone, password, position } = body;

        // Update the staff member
        const updatedStaff = await prisma.staffType.update({
            where: { id },
            data: {
                staffname,
                email,
                phone,
                password, // Note: updating password as plain text
                position,
            },
        });

        // Return the updated staff member without the password
        const { password: _, ...staffWithoutPassword } = updatedStaff;
        return NextResponse.json({ staff: staffWithoutPassword }, { status: 200 });
    } catch (error) {
        console.error("Failed to update staff:", error);
        return NextResponse.json(
            { error: "An error occurred while updating the staff member" },
            { status: 500 }
        );
    }
}