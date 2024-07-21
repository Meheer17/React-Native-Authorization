import { JWTVerify } from "@/utility/jwtverify";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const data = await JWTVerify(req)

    if (!data) {
        return NextResponse.json('Unauthorized', { status: 401 });
    }

    return NextResponse.json('Authorized', { status: 200 });
}