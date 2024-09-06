import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/db_client"; // Make sure this path is correct for your Prisma client

export async function GET(request: NextRequest) {
    try {
        // Fetch all menu items from the database
        const menuItems = await prisma.menu.findMany();

        // Return the menu items as a JSON response
        return NextResponse.json({ menuItems }, { status: 200 });
    } catch (error) {
        console.error("Failed to fetch menu items:", error);
        return NextResponse.json(
            { error: "An error occurred while fetching menu items" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, description, price, category } = body;

        // Create a new menu item
        const newMenuItem = await prisma.menu.create({
            data: {
                name,
                description,
                price,
                category,
            },
        });

        return NextResponse.json({ menuItem: newMenuItem }, { status: 201 });
    } catch (error) {
        console.error("Failed to create menu item:", error);
        return NextResponse.json(
            { error: "An error occurred while creating the menu item" },
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

        // Delete the menu item
        await prisma.menu.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Menu item deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Failed to delete menu item:", error);
        return NextResponse.json(
            { error: "An error occurred while deleting the menu item" },
            { status: 500 }
        );
    }
}