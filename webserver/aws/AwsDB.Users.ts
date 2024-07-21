import { PutItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { client } from "./awsDynamoDBConnect";

export default async function SearchUsers(name: string) {
    return await client.send(new ScanCommand({
        TableName: "users",
        FilterExpression: 'usrname = :username',
        ExpressionAttributeValues: {
            ':username': { S: name },
        },
    }));
}

export async function PutUser(name: string, password: string, salt: string) {
    return await client.send(new PutItemCommand({
        TableName: 'users',
        Item: {
            'usrname': { S: name },
            'password': {
                M: {
                    'ps': { S: password },
                    'salt': { S: salt }
                }
            },
        },
    }));
}