import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db_client"; 

export async function GET(request: NextRequest) {
    try {
     
        const staff = await prisma.staffType.findMany({
            select: {
                id: true,
                staffname: true,
                email: true,
                phone: true,
                position: true,
                role: true,
                createdAt: true,
                updatedAt: true,
                
            }
        });

        
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
        const { staffname, email, phone, password, position, role } = body;

        // Create a new staff member
        const newStaff = await prisma.staffType.create({
            data: {
                staffname,
                email,
                phone,
                password, 
                position,
                role,
            },
        });

       
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
        const { staffname, email, phone, password, position,role } = body;

        // Update the staff member
        const updatedStaff = await prisma.staffType.update({
            where: { id },
            data: {
                staffname,
                email,
                phone,
                password, // Note: updating password as plain text
                position,
                role,
            },
        });

       
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