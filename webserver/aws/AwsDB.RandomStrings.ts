import { DeleteItemCommand, PutItemCommand, ScanCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { client } from "./awsDynamoDBConnect";

export async function PutSalt(name: string, salt: string, tries: number, exist: boolean = false) {
    if (exist == false) {
        return await client.send(new PutItemCommand({
            TableName: "randomStrings",
            Item: {
                randomString: { S: salt },
                usrname: { S: name },
                try_time: { N: Date.now().toString() },
                tries: { N: `${tries}` }
            },
        }));
    }

    return await client.send(new UpdateItemCommand({
        TableName: "randomStrings",
        Key: {
            usrname: { S: name },
        },
        UpdateExpression: 'SET tries = :tries, try_time = :time, randomString = :random',
        ExpressionAttributeValues: {
            ':tries': { N: `${tries}` },
            ':time': { N: Date.now().toString() },
            ':random': { S: salt }
        }
    }));
}

export async function GetSalt(name: string) {
    return await client.send(new ScanCommand({
        TableName: "randomStrings",
        FilterExpression: 'usrname = :username',
        ExpressionAttributeValues: {
            ':username': { S: name },
        },
    }));
}

export async function DeleteSalt(name: string) {
    return await client.send(new DeleteItemCommand({
        TableName: "randomStrings",
        Key: {
            usrname: { S: name },
        },
    }));
}
