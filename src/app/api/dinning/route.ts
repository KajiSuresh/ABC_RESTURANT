import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/db_client"; 

export async function GET(request: NextRequest) {
    try {
        // Count all users in the database
        const userCount = await prisma.user.count();

       
        return NextResponse.json({ count: userCount }, { status: 200 });
    } catch (error) {
        console.error("Failed to fetch user count:", error);
        return NextResponse.json(
            { error: "An error occurred while fetching user count" },
            { status: 500 }
        );
    }
}
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { diningName, diningImage } = body;

        // Create a new dining table
        const newDiningTable = await prisma.diningTable.create({
            data: {
                diningName,
                diningImage,
            },
        });

        return NextResponse.json({ diningTable: newDiningTable }, { status: 201 });
    } catch (error) {
        console.error("Failed to create dining table:", error);
        return NextResponse.json(
            { error: "An error occurred while creating the dining table" },
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

        // Delete the dining table
        await prisma.diningTable.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Dining table deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Failed to delete dining table:", error);
        return NextResponse.json(
            { error: "An error occurred while deleting the dining table" },
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
        console.log('Received update request:', { id, body });

        // Update the dining table
        const updatedDiningTable = await prisma.diningTable.update({
            where: { id },
            data: body,
        });

        console.log('Updated dining table:', updatedDiningTable);

        return NextResponse.json({ diningTable: updatedDiningTable }, { status: 200 });
    } catch (error) {
        console.error("Failed to update dining table:", error);
        return NextResponse.json(
            { error: "An error occurred while updating the dining table" },
            { status: 500 }
        );
    }
}

