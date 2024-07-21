# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## To Start with this Repo
This is a Boilerplate for Google Sign-in for React Native apps.
Clone the repo
```
git clone https://github.com/Meheer17/React-Native-GoogleSignIn.git
cd React-Native-GoogleSignIn

npm i 
```
### Steps to Configure and Test
Execute the following commands to launch the application to EAS. 
```
npx expo prebuild --clean
npx expo run:android
keytool -keystore ./android/app/debug.keystore -list -v
```
Store the SHA1 for Android configuration in Google Console.

- Step 1: Log on to Google Cloud Console and create 3 Api Keys for Web, Android and iOS and have them noted.
- Step 2: Open `app/index.tsx` and configure the `Google.useAuthRequest` from Step 1.
- Step 3: Change the Bundle Ids and name of `app.json` under iOS and android.

Continue with these commands. Create an EAS account if necessary. 

```
eas build
```

Wait for the application to be build.

Download the .aab file on the mobile and install an .aab to .apk converter from play store.

Convert the the file and install the app for testing.