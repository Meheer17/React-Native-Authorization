
import { CreateTableCommand, DeleteTableCommand, ListTablesCommand } from '@aws-sdk/client-dynamodb';
import { client } from './awsDynamoDBConnect';

export async function createTable() {
    await client.send(new CreateTableCommand({
        TableName: 'randomStrings',
        KeySchema: [
            {
                AttributeName: 'usrname',
                KeyType: 'HASH'
            },
        ],
        AttributeDefinitions: [
            {
                AttributeName: 'usrname', AttributeType: 'S'
            }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
        }
    }));

    await client.send(new CreateTableCommand({
        TableName: 'users',
        KeySchema: [
            {
                AttributeName: 'usrname',
                KeyType: 'HASH'
            },
        ],
        AttributeDefinitions: [
            {
                AttributeName: 'usrname', AttributeType: 'S'
            }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
        }
    }));
}

export async function listTables() {
    const data = await client.send(new ListTablesCommand({}));
    return data.TableNames;
}

export async function deleteTable() {
    await client.send(new DeleteTableCommand({ TableName: 'randomStrings' }))
}

export async function DeleteAllTable() {
    const tables = await listTables();
    if (!tables) return;
    for (const table of tables) {
        await client.send(new DeleteTableCommand({ TableName: table }));
    }
}