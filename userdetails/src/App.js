// import { BrowserRouter as Router, Routes, Route , Navigate } from "react-router-dom";
// import {useState, useEffect } from "react";
// import Card from "./components/UserDetails";
// import FullCardDetails from "./components/FullCardDetails";
// import "bootstrap/dist/css/bootstrap.min.css";
// import 'bootstrap-icons/font/bootstrap-icons.css';
// import "./App.css";
// import Login from "./components/Login";

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [checkingAuth, setCheckingAuth] = useState(true);

//   useEffect(() => {
//     // Check if user is already authenticated
//     const authStatus = localStorage.getItem("isAuthenticated") === "true";
//     setIsAuthenticated(authStatus);
//     setCheckingAuth(false);
//   }, []);

//   if (checkingAuth) {
//     return (
//       <div className="loading-container">
//         <div className="spinner-border text-primary" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </div>
//     );
//   }
//   return (
//     <Router>
//       <Routes>
//         <Route 
//           path="/login" 
//           element={
//             !isAuthenticated ? (
//               <Login setIsAuthenticated={setIsAuthenticated} />
//             ) : (
//               <Navigate to="/" replace />
//             )
//           } 
//         />
//         <Route path="/" element={<Card />} />
//         <Route path="/users/:id" element={<FullCardDetails />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
// App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Card from "./components/UserDetails";
 import UserDetails from "./components/FullCardDetails";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./App.css";
import Login from "./components/Login";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);
    setCheckingAuth(false);
  }, []);

  if (checkingAuth) {
    return (
      <div className="loading-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <Login setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Card setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/users/:id"
          element={
            isAuthenticated ? (
              <UserDetails />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} />
      </Routes>
    </Router>
  );
}

export default App;