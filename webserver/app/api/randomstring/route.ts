import { NextResponse } from "next/server";
import * as bcrypt from 'bcrypt';
import { GetSalt, PutSalt } from "@/aws/AwsDB.RandomStrings";
import { DeleteAllTable, createTable, deleteTable } from "@/aws/AwsDBTable";
import SearchUsers from "@/aws/AwsDB.Users";

export async function POST(req: Request) {
    // await createTable();
    // await DeleteAllTable();

    const salt = await bcrypt.genSalt(12);
    const { name } = await req.json();
    if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 });

    // Signin
    {
        const { Items } = await SearchUsers(name);
        if (Items && Items.length > 0) {
            const { password } = Items[0];
            if(!password || !password.M || !password.M.salt || !password.M.salt.S ) return NextResponse.json({ error: 'Password is required' }, { status: 400 });
            return NextResponse.json({ randomString: password.M.salt.S });
        }
    }

    // Signup

    const { Items } = await GetSalt(name);

    if (Items && Items.length > 0) {
        const tries = parseInt(Items[0].tries.N || '1');
        const lastTryTime = parseInt(Items[0].try_time.N || '0');
        const currentTime = Date.now();
        const timeDifference = currentTime - lastTryTime;

        if (tries >= 3 && timeDifference <= 10 * 60 * 1000) {
            return NextResponse.json({ error: 'You have reached the maximum number of tries. Please try again later.' }, { status: 400 });
        }

        if (tries >= 3 && timeDifference > 10 * 60 * 1000) {
            PutSalt(name, await salt, 1, true);
            return NextResponse.json({ randomString: await salt }, { status: 400 });
        }

        PutSalt(name, await salt, tries + 1, true);
        return NextResponse.json({ randomString: await salt }, { status: 400 });
    }

    await PutSalt(name, await salt, 1);

    return NextResponse.json({ randomString: await salt });
}