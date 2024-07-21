import { DeleteAllTable, createTable, deleteTable } from "@/aws/AwsDBTable";
import { NextResponse } from "next/server";

export async function GET() {
    // await createTable();
    // await deleteTable();
    // await DeleteAllTable(); // Beware it will delete all the Tables in YOUR AWS ACCOUNT

    const message = "Hello World!";
    return NextResponse.json({ message: message});
}