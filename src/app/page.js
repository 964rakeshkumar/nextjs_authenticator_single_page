// // src/app/page.js
// "use client"; // Mark this as a Client Component

// import { useIsAuthenticated } from "@azure/msal-react";
// import { AuthButton } from "../components/AuthButton";

// export default function Home() {
//   const isAuthenticated = useIsAuthenticated();

//   return (
//     <div>
//       <h1>Next.js Microsoft Authentication</h1>
//       <p>{isAuthenticated ? "Logged In" : "Logged Out"}</p>
//       <AuthButton name={isAuthenticated}/>
//     </div>
//   );
// }


// src/app/page.js
"use client"; // Mark this as a Client Component

import { useIsAuthenticated } from "@azure/msal-react";
import { AuthButton } from "../components/AuthButton";

export default function Home() {
  const isAuthenticated = useIsAuthenticated();

  return (
    <div>
      <h1>Next.js Microsoft Authentication</h1>
      <p>{isAuthenticated ? "Logged In" : "Logged Out"}</p>
      <AuthButton/>
    </div>
  );
}