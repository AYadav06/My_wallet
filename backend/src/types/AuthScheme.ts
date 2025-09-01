import z from 'zod';

export const AuthSchema=z.object({
    firstName:z.string(),
    lastName:z.string(),
    email:z.email(),
    password:z.string()
});

export const signinSchema=z.object({
    email:z.string().email(),
    password:z.string()
})

export const updateUserSchema=z.object({
    password:z.string().optional(),
    firstName:z.string().optional(),
    lastName:z.string().optional()
});