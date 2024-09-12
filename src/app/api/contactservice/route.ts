import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/db_client"; 

export async function GET(request: NextRequest) {
    try {
       
        const contacts = await prisma.contact.findMany();

       
        return NextResponse.json({ contacts }, { status: 200 });
    } catch (error) {
        console.error("Failed to fetch contacts:", error);
        return NextResponse.json(
            { error: "An error occurred while fetching contacts" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { customerName, email, message } = body;

        // Create a new contact
        const newContact = await prisma.contact.create({
            data: {
                customerName,
                email,
                message,
            },
        });

        return NextResponse.json({ contact: newContact }, { status: 201 });
    } catch (error) {
        console.error("Failed to create contact:", error);
        return NextResponse.json(
            { error: "An error occurred while creating the contact" },
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

        // Delete the contact
        await prisma.contact.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Contact deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Failed to delete contact:", error);
        return NextResponse.json(
            { error: "An error occurred while deleting the contact" },
            { status: 500 }
        );
    }
}