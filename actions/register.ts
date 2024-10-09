"use server";

import prisma from "@/lib/prisma";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs"
import { z } from "zod";

export const registerWithValues = async (data: z.infer<typeof RegisterSchema>) => {
try {
    const validatedFields = RegisterSchema.safeParse(data);
    if(!validatedFields.success) {
        return {
            error: "Invalid fields"
        
        }
    };

    const { email, name, password } = validatedFields.data;

    const existingUser = await prisma.user.findUnique({
        where: {
            email
        }

    }) ;

    if(existingUser) {
        return {
            error: "User already exists"
        }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
        data: {
            email,
            name,
            password: hashedPassword,
        }
    });




    
  
    
    return {
        success: "User registered successfully, You can now login!"
    }
    
} catch (error) {
    
    console.log('Error registering user', error)
    return {
        error: "Something went wrong"
    }
}
}