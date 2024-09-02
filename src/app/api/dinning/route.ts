import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db_client"; // Ensure this path is correct for your Prisma client

export async function GET(request: NextRequest) {
    try {
        // Fetch all dining tables from the database
        const diningTables = await prisma.diningTable.findMany();

        // Return the dining tables as a JSON response
        return NextResponse.json({ diningTables }, { status: 200 });
    } catch (error) {
        console.error("Failed to fetch dining tables:", error);
        return NextResponse.json(
            { error: "An error occurred while fetching dining tables" },
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