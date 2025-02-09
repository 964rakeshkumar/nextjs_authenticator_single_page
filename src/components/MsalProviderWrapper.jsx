// src/components/MsalProviderWrapper.jsx
"use client"; // Mark this as a Client Component

import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from "../lib/msalConfig";

export const MsalProviderWrapper = ({ children }) => {
  return <MsalProvider instance={msalInstance}>{children}</MsalProvider>;
};