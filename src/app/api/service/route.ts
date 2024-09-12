import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/db_client"; 

export async function GET(request: NextRequest) {
    try {
        
        const serviceTypes = await prisma.serviceType.findMany();

        
        return NextResponse.json({ serviceTypes }, { status: 200 });
    } catch (error) {
        console.error("Failed to fetch service types:", error);
        return NextResponse.json(
            { error: "An error occurred while fetching service types" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { serviceName, serviceImage, description } = body;

        // Create a new service type
        const newServiceType = await prisma.serviceType.create({
            data: {
                serviceName,
                serviceImage,
                description,
            },
        });

        return NextResponse.json({ serviceType: newServiceType }, { status: 201 });
    } catch (error) {
        console.error("Failed to create service type:", error);
        return NextResponse.json(
            { error: "An error occurred while creating the service type" },
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
        const { serviceName, serviceImage, description } = body;

        // Update the service type
        const updatedServiceType = await prisma.serviceType.update({
            where: { id },
            data: {
                serviceName,
                serviceImage,
                description,
            },
        });

        return NextResponse.json({ serviceType: updatedServiceType }, { status: 200 });
    } catch (error) {
        console.error("Failed to update service type:", error);
        return NextResponse.json(
            { error: "An error occurred while updating the service type" },
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

        // Delete the service type
        await prisma.serviceType.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Service type deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Failed to delete service type:", error);
        return NextResponse.json(
            { error: "An error occurred while deleting the service type" },
            { status: 500 }
        );
    }
}