# NxtCure-Mobile

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Run expo doctor to validate app status before running

   ```bash
   npx expo-doctor
   ```

   To get checklist in detail use:

   ```bash
   npx expo-doctor --verbose
   ```

3. Start the app once checks are clear

   ```bash
   npx expo start
   ```

   > **Note:**  
   To test the demo app build, ensure **both the device running Expo Go** and **the device running the terminal** are connected to the **same local network**.

   ### Alternative (for different networks):
   You can run the following command to use a tunnel:

   ```bash
   npx expo start --tunnel
   ```
   > **Warning:**
   Using the **--tunnel** option ***exposes your local network information to anyone who scans the QR code***. Use this only when necessary and be aware of the privacy implications.

   ## Emulators:
   >**Note:** Use emulators or devices with Expo Go installed to test the app UI, Web build cannot render certain parts of the react native modules

   For Android emulators install android studio in prior with an emulator set up before running the `npx expo start --android` command. 
   For more info visit [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)

   For iOS emulators, Mac/MacBook users should have Xcode installed with an emulator set up in prior before running the `npx expo start --ios` command.
   For more info visit [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)

   Alternatively, emulators can be skipped for direct device display using Expo Go. For more info download the expo go app on play store/app store and visit the expo go documentation [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

<br/>

[development build](https://docs.expo.dev/develop/development-builds/introduction/)

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction/).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.
- [Basic Components and API](https://reactnative.dev/docs/components-and-apis)
- [React Native Navigation Guide](https://reactnavigation.org/)

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
