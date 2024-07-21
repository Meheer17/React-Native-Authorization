import { DeleteSalt, GetSalt } from "@/aws/AwsDB.RandomStrings";
import SearchUsers, { PutUser } from "@/aws/AwsDB.Users";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { name, password } = await req.json();
    if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    if (!password) return NextResponse.json({ error: 'Password is required' }, { status: 400 });

    {
        const { Items } = await SearchUsers(name);
        if (Items && Items.length > 0) {
            // If the user exists, return an error
            console.log("User already exists")
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }
    }

    const { Items } = await GetSalt(name)

    if (!Items || Items.length === 0 || !Items[0].randomString || !Items[0].randomString.S) {
        console.log("No salt found")
        return NextResponse.json({ error: 'Wrong Method to signup' }, { status: 400 });
    }

    const salt = Items[0].randomString.S;
    await PutUser(name, password, salt);
    await DeleteSalt(name);

    const response = await fetch(`${process.env.SERVER_URL}/api/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, password })
    });

    return NextResponse.json(await response.json());
}