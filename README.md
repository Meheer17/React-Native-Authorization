# React-Native App With Custom Authorization

This repo includes a React Native app that utilizes a custom API server for authorization and stores data in AWS DynamoDB. The app provides a seamless user experience by integrating with the server to handle authentication and securely store user data. With the power of React Native, developers can build cross-platform mobile applications that leverage the capabilities of AWS DynamoDB for efficient data storage and retrieval. Get started with this app to explore the possibilities of building secure and scalable mobile applications with React Native and AWS DynamoDB.

## How to use
1. Clone and get into the directory.
> | git clone https://github.com/Meheer17/React-Native-Authorization.git 

> | cd React-Native-Authorization

2. Install the required packages with `npm i` in both the folder.

3. Fill in all the required Keys in `webserver/.env` file. (NOTE: IAM user should be given all Access to AWS DynamoDB)

4. Start the webserver with `npm run dev` and react-native-app with `npx expo start --web --https`

5. You would have to create the database, For this you can open `webserver/app/api/hello` and use the `await createTable();` function and this would create the databse for you.

6. Finally you can test the API.

## Advanced Usage
1. You can create an AWS EC2 instance and launch only the webserver on it.
2. Create a VPC with EC2, Gateway and DynamoDB in AWS and run your whole application.