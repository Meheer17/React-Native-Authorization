import React, { useState } from 'react';
import { Button } from 'react-native';
import reactNativeBcrypt from 'react-native-bcrypt';

const SignInSignUpForm: React.FC = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');

    const handleSignIn = async () => {
        const randomString = await (await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/randomstring`, {
            method: 'POST',
            body: JSON.stringify({ name: name }),
            headers: {
                'Content-Type': 'application/json',
            },
        })).json();

        if (randomString.error) {
            // Handle errors
            return console.error(randomString.error);
        }

        const hashedPass = await reactNativeBcrypt.hashSync(password, randomString.randomString);

        const data = await (await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/signin`, {
            method: 'POST',
            body: JSON.stringify({ name: name, password: hashedPass }),
            headers: {
                'Content-Type': 'application/json',
            },
        })).json()

        if (data.error) {
            // Handle errors
            return console.error(randomString.error);
        }

        setToken(data.token);
    };

    const handleSignUp = async () => {
        const randomString = await (await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/randomstring`, {
            method: 'POST',
            body: JSON.stringify({ name: name }),
            headers: {
                'Content-Type': 'application/json',
            },
        })).json();
        
        if(randomString.error) {
            // Handle errors
            return console.error(randomString.error);
        }

        const hashedPass = await reactNativeBcrypt.hashSync(password, randomString.randomString);

        const data = await (await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/signup`, {
            method: 'POST',
            body: JSON.stringify({ name: name, password: hashedPass }),
            headers: {
                'Content-Type': 'application/json',
            },
        })).json()

        if (data.error) {
            // Handle errors
            return console.error(randomString.error);
        }

        setToken(data.token);
    };

    return (
        <div>
            <h2>Sign In</h2>
            <form>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" onClick={handleSignIn}>
                    Sign In
                </button>
            </form>

            <h2>Sign Up</h2>
            <form>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" onClick={handleSignUp}>
                    Sign Up
                </button>
            </form>

            <h2>Token: {token}</h2> 
            <Button title='Check Auth' onPress={async () => {
                const data = await (await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/authorizedurl`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })).json(); 
            }}></Button>
        </div>
    );
};

export default SignInSignUpForm;