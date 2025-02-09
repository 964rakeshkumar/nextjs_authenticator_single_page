// src/app/layout.js
import { MsalProviderWrapper } from "../components/MsalProviderWrapper";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MsalProviderWrapper>{children}</MsalProviderWrapper>
      </body>
    </html>
  );
}
