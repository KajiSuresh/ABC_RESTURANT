"use server";

import prisma from "@/lib/db_client"; 
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

async function logInAdmin(admin: { email: string; password: string }) {
    console.log(admin);
    const cookieStore = cookies();
    const existingAdmin = await prisma.admin.findUnique({
        where: { email: admin.email },
    });

    console.log('existing admin :', existingAdmin);

    if (!existingAdmin) {
        throw new Error("Admin not found");
    }

    const isPasswordValid = await bcrypt.compare(admin.password, existingAdmin.password);

    if (!isPasswordValid) {
        throw new Error("Invalid password");
    }

    // Assuming you want to set some sort of authentication cookie
    cookieStore.set('login', JSON.stringify(existingAdmin));
    
    return existingAdmin;
}

export default logInAdmin;