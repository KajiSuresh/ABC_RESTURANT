import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/db_client";

export async function GET(request: NextRequest) {
  try {
    
    const reservations = await prisma.reservation.findMany();

    
    return NextResponse.json({ reservations }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch reservations:", error);
    return NextResponse.json(
      { error: "Failed to fetch reservations" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const newReservation = await prisma.reservation.create({
      data: {
        date: new Date(data.date),
        time: new Date(data.time),
        person: data.person,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        description: data.description,
      },
    });
    return NextResponse.json({ reservation: newReservation }, { status: 201 });
  } catch (error) {
    console.error("Failed to create reservation:", error);
    return NextResponse.json(
      { error: "Failed to create reservation" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "Reservation ID is required" },
        { status: 400 }
      );
    }
    await prisma.reservation.delete({ where: { id } });
    return NextResponse.json({ message: "Reservation deleted" }, { status: 200 });
  } catch (error) {
    console.error("Failed to delete reservation:", error);
    return NextResponse.json(
      { error: "Failed to delete reservation" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "Reservation ID is required" },
        { status: 400 }
      );
    }
    const data = await request.json();
    const updatedReservation = await prisma.reservation.update({
      where: { id },
      data: {
        date: data.date ? new Date(data.date) : undefined,
        time: data.time ? new Date(data.time) : undefined,
        person: data.person,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        description: data.description,
      },
    });
    return NextResponse.json({ reservation: updatedReservation }, { status: 200 });
  } catch (error) {
    console.error("Failed to update reservation:", error);
    return NextResponse.json(
      { error: "Failed to update reservation" },
      { status: 500 }
    );
  }
}