import { NextResponse } from 'next/server';
import { account } from '@/lib/appwrite';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(12),
});

export async function POST(req: Request) {
  try {
    const { email, password } = schema.parse(await req.json());

    // Appwrite Auth
    const session = await account.createEmailPasswordSession(email, password);
    const user = await account.get();

    // Custom user doc in DB
    const { $id, email: userEmail, labels } = user;
    const role = labels.includes('admin') ? 'ADMIN' : 'USER';

    const accessToken = jwt.sign({ sub: $id, email: userEmail, role }, process.env.JWT_SECRET!, { expiresIn: '15m' });

    const response = NextResponse.json({ accessToken, user: { id: $id, email: userEmail, role } });
    response.cookies.set('session', session.$id, { httpOnly: true, secure: true, sameSite: 'strict' });

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
}