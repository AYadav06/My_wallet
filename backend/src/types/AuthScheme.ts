import z, { email } from 'zod';

export const AuthSchema=z.object({
    firstName:z.string(),
    lastName:z.string(),
    email:z.email(),
    password:z.string()
});

export const signSchema=z.object({
    email:z.email(),
    password:z.string()
})