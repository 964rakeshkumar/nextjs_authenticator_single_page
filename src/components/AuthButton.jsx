// // src/components/AuthButton.jsx
// "use client"; // Mark this as a Client Component

// import { useMsal } from "@azure/msal-react";
// import { loginRequest } from "../lib/msalConfig";

// export const AuthButton = (props) => {
//   const { instance } = useMsal();

//   const handleLogin = () => {
//     instance.loginRedirect(loginRequest).catch((e) => {
//       console.error(e);
//     });
//   };

//   const handleLogout = () => {
//     instance.logoutRedirect().catch((e) => {
//       console.error(e);
//     });
//   };
//   console.log("====",props);

//   return (
//     <div>
//       <button onClick={handleLogin}>Login</button>
//       <button onClick={handleLogout}>Logout</button>
//       <h1>{props.name.toString()}</h1>
//     </div>
//   );
// };



// src/components/AuthButton.jsx
"use client"; // Mark this as a Client Component

// import { useState } from "react";
// import { useMsal, useIsAuthenticated } from "@azure/msal-react";
// import { loginRequest } from "../lib/msalConfig";

// export const AuthButton = () => {
//   const { instance, accounts } = useMsal();
//   const isAuthenticated = useIsAuthenticated();
//   const [userInfo, setUserInfo] = useState(null);

//   const handleLogin = () => {
//     instance.loginRedirect(loginRequest).catch((e) => {
//       console.error(e);
//     });
//   };

//   const handleLogout = () => {
//     instance.logoutRedirect().catch((e) => {
//       console.error(e);
//     });
//   };

//   const fetchTokens = async () => {
//     try {
//       const response = await instance.acquireTokenSilent({
//         ...loginRequest,
//         account: accounts[0], // Use the first account
//       });

//       console.log("Access Token:", response.accessToken);
//       console.log("ID Token:", response.idToken);

//       // Fetch user information using the access token
//       fetchUserInfo(response.accessToken);
//     } catch (error) {
//       console.error("Error fetching tokens:", error);
//     }
//   };

//   const fetchUserInfo = async (accessToken) => {
//     try {
//       const response = await fetch("https://graph.microsoft.com/v1.0/me", {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });

//       const userInfo = await response.json();
//       console.log("User Info:", userInfo);
//       setUserInfo(userInfo); // Store user info in state
//     } catch (error) {
//       console.error("Error fetching user info:", error);
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleLogin}>Login</button>
//       <button onClick={handleLogout}>Logout</button>
//       {isAuthenticated && (
//         <button onClick={fetchTokens}>Fetch Tokens and User Info</button>
//       )}
//       {userInfo && (
//         <div>
//           <h2>User Information</h2>
//           <p>Name: {userInfo.displayName}</p>
//           <p>Email: {userInfo.mail || userInfo.userPrincipalName}</p>
//         </div>
//       )}
//     </div>
//   );
// };


import { useState, useEffect } from "react";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { loginRequest } from "../lib/msalConfig";

export const AuthButton = () => {
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const [userInfo, setUserInfo] = useState(null);

  const handleLogin = () => {
    instance.loginRedirect(loginRequest).catch((e) => {
      console.error(e);
    });
  };

  const handleLogout = () => {
    instance.logoutRedirect().catch((e) => {
      console.error(e);
    });
  };

  const fetchTokens = async () => {
    try {
      const response = await instance.acquireTokenSilent({
        ...loginRequest,
        account: accounts[0], // Use the first account
      });

      console.log("Access Token:", response.accessToken);
      console.log("ID Token:", response.idToken);

      // Fetch user information using the access token
      fetchUserInfo(response.accessToken);
    } catch (error) {
      console.error("Error fetching tokens:", error);
    }
  };

  const fetchUserInfo = async (accessToken) => {
    try {
      const response = await fetch("https://graph.microsoft.com/v1.0/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const userInfo = await response.json();
      console.log("User Info:", userInfo);
      setUserInfo(userInfo); // Store user info in state
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  // Automatically fetch user info once the user is authenticated
  useEffect(() => {
    if (isAuthenticated && accounts.length > 0) {
      fetchTokens();
    }
  }, [isAuthenticated, accounts]); // Trigger when user is authenticated or accounts change

  return (
    <div>
      {!isAuthenticated ? (
        <button onClick={handleLogin}>Login</button>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}

      {userInfo && (
        <div>
          <h2>User Information</h2>
          <p>Name: {userInfo.displayName}</p>
          <p>Email: {userInfo.mail || userInfo.userPrincipalName}</p>
        </div>
      )}
    </div>
  );
};
