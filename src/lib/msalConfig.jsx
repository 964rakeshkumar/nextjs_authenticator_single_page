// src/lib/msalConfig.js
import { PublicClientApplication } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: "7aa2f9db-85e3-475e-8b81-7f9e7ad27ddc",//"8786746e-0fad-47cf-9ddd-da2ca49faecd", // Replace with your Azure AD Client ID
    authority: 'https://login.microsoftonline.com/common', // Replace with your Tenant ID 'https://login.microsoftonline.com/9525f6a6-86a7-4682-99fa-b8ccf82babf6'
    redirectUri: "http://localhost:3000", // Development redirect URI
  },
  cache: {
    cacheLocation: "sessionStorage", // Store tokens in sessionStorage
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: ["User.Read"], // Add the required scopes here
};

export const msalInstance = new PublicClientApplication(msalConfig);