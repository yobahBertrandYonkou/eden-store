> ## Disclaimer
> This application wasn't built with the best architecture coding practices. Expect the unexpected if you plan on using it. I mean a lot of unexpected stuff. The `data-populator` folder contains some dummy data and Node js code that can be modified to populate the database for experimenting with the app.

# EDEN

![Landing page](./images/4.png)

EDEN is an innovative academic project developed by four students as a comprehensive pet care solution. It aims to be a one-stop platform offering services such as:

- Reporting injured domestic animals to NGOs,
- Pet adoption,
- Veterinarian services,
- Grooming services,
- Online shopping for pet accessories and food.

## EDEN - Store

![Store homepage](./images/store-home.png)

EDEN - STORE serves as the e-commerce component, allowing pet owners to purchase pet accessories and food conveniently.

## Architecture

EDEN - Store is built using a three-tier architecture:

- **Frontend**: [React](https://react.dev/) for the user interface,
- **Backend**: [Express.js](https://expressjs.com/) for RESTful APIs and business logic,
- **Database**: [Firebase](https://firebase.google.com/) for authentication and data storage.

![EDEN - Architecture](./images/eden-store-archi.png)

## Technologies

- **[React](https://react.dev/)**: Responsive and dynamic frontend development.
- **[Express.js](https://expressjs.com/)**: RESTful APIs for the core business logic.
- **[Firebase Auth](https://firebase.google.com/docs/auth)** & **[JWT](https://jwt.io/)**: Secure user authentication.
- **[Cloud Firestore](https://firebase.google.com/docs/firestore)**: NoSQL database for user and store data.
- **[Cloud Storage](https://firebase.google.com/docs/storage)**: For storing product images.
- **[Algolia](https://www.algolia.com/)**: Real-time search functionality.
- **[Razorpay](https://razorpay.com/)**: Seamless online payment integration.

## Installation Guide

### 1. Setup Firebase

Firebase is used in this project for Authentication, Database (Cloud Firestore) and Object storage (Cloud storage).

- [Create](https://console.firebase.google.com) a Firebase account.
- [Create](https://console.firebase.google.com/u/1/) a firebase project.
- Add Web APP to the created Firebase project.
- In Project Settings, under Service Accounts, a Generate new private key.

***

### 2. Setup Algolia

Firestore does not offer full text search. So to implement instant searching using full test search, Algolia was used to store and index searchable data.

- [Create](https://dashboard.algolia.com/users/sign_up) an Algolia account.
- Goto Settings, under Team and Access, click API Keys. In the next screen, generate Admin API key.
  
***

### 3. Setup Razorpay

Razorpay is used to enable online payments. It allows UPI and Card payments.

- [Create](https://easy.razorpay.com/onboarding) a Razorpay account.
- From the dashboard, click Account & Settings, under Website and app settings select API Keys and generate a new key.

***

### 4. Setup project on your system

***

- From a CLI, clone this repository

```bash
git clone https://github.com/yobahBertrandYonkou/eden-store.git
```

***

- Navigate to repository

```bash
cd eden-store
```

***

- Copy the secret key generate private key, from [step 1](#1-setup-firebase), to `server/controllers/credentials` in the project directory.

***

- In the project root directory, create a `.env` file and paste a Firebase WEB API KEY. This key can be found in your Firebase project > Project Settings > General tap > Your project section.

```conf
WEP_API_KEY=put-key-here
```

***

- In `server/controllers/credentials/`, create an `algolia.json` file and put the following attributes.
  
```json
{
    "ApplicationId": "APP-ID",
    "AdminAPIKey": "KEY-HERE"
}
```
The `ApplicationId` and `AdminAPIKey`s can be gotten from [step 2](#2-setup-algolia).

***

- In `server/controllers/credentials/`, create an `razorpay.json` file and put the following attributes.
  
```json
{
    "key_id": "rzp_test_QPpw5ivYvBF4L1",
    "key_secret": "jOEQNUo6dQaRA5OlFFRfGgYK"
}
```
The `key_id` and `key_secret`s can be gotten from [step 3](#3-setup-razorpay).

***

- Install application dependencies

```bash
npm install 
```

***

- Start backend server.

```bash
npm run startserver
```

***

- Run frontend server.

```bash
npm run start
``` 

# IMAGES

| ![Image 1](images/1.png)  | ![Image 2](images/2.png)  | ![Image 3](images/3.png)  | ![Image 5](images/5.png)  |
|---------------------------|---------------------------|---------------------------|---------------------------|
| ![Image 6](images/6.png)  | ![Image 7](images/7.png)  | ![Image 8](images/8.png)  | ![Image 9](images/9.png)  |
| ![Image 10](images/10.png) | ![Image 11](images/11.png) | ![Image 12](images/12.png) | ![Image 13](images/13.png) |
| ![Image 14](images/14.png) | ![Image 15](images/15.png) | ![Image 16](images/16.png) | ![Image 17](images/17.png) |
| ![Image 18](images/18.png) | ![Image 19](images/19.png) | ![Image 20](images/20.png) | ![Image 21](images/21.png) |
| ![Image 22](images/22.png) | ![Image 23](images/23.png) | ![Image 24](images/24.png) | ![Image 25](images/25.png) |
| ![Image 26](images/26.png) | ![Image 27](images/27.png) |
