import SearchUsers from "@/aws/AwsDB.Users";
import { NextResponse } from "next/server";
import { DeleteSalt, GetSalt, PutSalt } from "@/aws/AwsDB.RandomStrings";
import * as jwt from 'jsonwebtoken';

export async function POST(req: Request) {
    const { name, password } = await req.json();
    if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    if (!password) return NextResponse.json({ error: 'Password is required' }, { status: 400 });

    {
        const { Items } = await GetSalt(name);
        if (Items && Items.length > 0) {
            const salt = Items[0].randomString.S;
            const tries = parseInt(Items[0].tries.N || '1');
            const lastTryTime = parseInt(Items[0].try_time.N || '0');
            const currentTime = Date.now();
            const timeDifference = currentTime - lastTryTime;

            if (!salt) {
                console.log("Server Fault")
                return NextResponse.json({ error: 'Server Fault' }, { status: 500 });
            }

            if (tries >= 3 && timeDifference <= 10 * 60 * 1000) {
                console.log("You have reached the maximum number of tries. Please try again later.")
                return NextResponse.json({ error: 'You have reached the maximum number of tries. Please try again later.' }, { status: 400 });
            }

            if (tries >= 3 && timeDifference > 10 * 60 * 1000) {
                console.log("You have reached the maximum number of tries. Please try again later.")
                PutSalt(name, salt, 1, true);
                return NextResponse.json({ error: 'You have reached the maximum number of tries. Please try again later.' }, { status: 400 });
            }

            PutSalt(name, salt, tries + 1, true);
            return NextResponse.json({ error: 'You have reached the maximum number of tries. Please try again later.' }, { status: 400 });
        }
    }

    const { Items } = await SearchUsers(name);
    if (!Items || Items.length === 0 || !Items[0].password || !Items[0].password.M || !Items[0].password.M.salt || !Items[0].password.M.salt.S) {
        console.log("User doesn't exists")
        return NextResponse.json({ error: 'User doesn\'t exists' }, { status: 400 });
    }

    const salt = Items[0].password.M.salt.S;
    const usrpass = Items[0].password.M.ps.S;

    PutSalt(name, salt, 1, false);

    if (password !== usrpass) {
        console.log("Wrong Password")
        return NextResponse.json({ error: 'Wrong Password' }, { status: 400 });
    }

    if (!process.env.JWT_SECRET) {
        console.log("Server Fault")
        return NextResponse.json({ error: 'Server Fault' }, { status: 500 });
    }

    await DeleteSalt(name);
    const token = jwt.sign({ name }, process.env.JWT_SECRET);
    return NextResponse.json({ message: 'Sign In Successful', token, name });
}