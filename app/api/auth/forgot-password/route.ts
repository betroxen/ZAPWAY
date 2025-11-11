
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // TODO: Add your forgot password logic here
    // const { email } = await request.json();
    // console.log({ email });
    
    // Placeholder response
    return NextResponse.json({ message: 'Password reset email sent' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'An error occurred', error: (error as Error).message }, { status: 500 });
  }
}
