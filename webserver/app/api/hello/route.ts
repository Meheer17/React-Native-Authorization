import { NextResponse } from "next/server";

export async function GET() {
    const message = "Hello World!";
    return NextResponse.json({ message: message});
}