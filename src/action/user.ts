"use server"
import prisma from "@/lib/db_client";


async function getUser (){
    return await prisma.user.findMany()
}

async function createUser (user: { name: string; email: string; password: string; phoneNo: string }){
    return await prisma.user.create({data:user})
}

async function deleteUser (id:string){
    return await prisma.user.delete({where:{id}})
}

async function updateUser (id:string,email:string){
    return await prisma.user.update({data:{email:email},where:{id:id}})
}

export {createUser, getUser, updateUser}
