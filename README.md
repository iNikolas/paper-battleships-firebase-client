This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting started

0. Login via firebase CLI `firebase login`

1. In the files `.firebaserc` and `firebase.json` replace `paper-battleships` with **your** Firebase project name

2. In the file `src/app/firebaseConfig.ts` replace the `firebaseConfig` value with the config of the web app you created inside **your** firebase Project

3. Ensure that email authentication is enabled inside Firebase Auth

4. Install dependencies:

```sh
yarn
```

5. Deploy Firestore rules:

```sh
yarn deploy-rules
```

6. Run the project:

```sh
yarn start
```

7. Run dedicated `Redis Node.js` server available by the next [Link](http://localhost:3000) on Github.

8. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## How to deploy my app to Firebase Hosting?

```sh
yarn build
yarn deploy-hosting
```

## How to deploy my app to GitHub Pages?

1. Create your own GitHub repository for the project.

2. Change a `homepage` property in the `package.json` file. Add `homepage` `property in this format*: https://{username}.github.io/{repo-name}`

3. Add a "remote" that points to the GitHub repository `$ git remote add origin https://github.com/{username}/{repo-name}.git`

4. Deploy the React app to GitHub Pages:

```sh
yarn deploy
```