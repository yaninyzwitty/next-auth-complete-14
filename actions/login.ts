"use server"
import prisma from "@/lib/prisma";
import { LoginSchema } from "@/schemas";
import { z } from "zod";

export const loginWithValues = async (data: z.infer<typeof LoginSchema>) => {
   try {
    const validatedFields = LoginSchema.safeParse(data);
    if(!validatedFields.success) return {
        error: "Invalid fields"
    }

    const { email, password  } = validatedFields.data;

    const existingUser = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if(!existingUser || !existingUser.password) return {
        
        error: "Invalid email or password"
    }


    return {
        success: {
            email,
            password,
            
            

        }
    }




   
    

   } catch (error) {
    console.log('Error logging in: ' , error)

    return {
        error: "Something went wrong!"
    }
    
   }
}