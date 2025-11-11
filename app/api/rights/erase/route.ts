
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // TODO: Add your data erasure logic here
    // const { userId } = await request.json();
    // console.log({ userId });
    
    // Placeholder response
    return NextResponse.json({ message: 'Data erasure successful' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'An error occurred', error: (error as Error).message }, { status: 500 });
  }
}
