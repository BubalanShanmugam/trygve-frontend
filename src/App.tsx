// import { useState } from 'react'
// // import reactLogo from './assets/react.svg'
// // import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     // <>
//     //   <div>
//     //     <a href="https://vite.dev" target="_blank">
//     //       <img src={viteLogo} className="logo" alt="Vite logo" />
//     //     </a>
//     //     <a href="https://react.dev" target="_blank">
//     //       <img src={reactLogo} className="logo react" alt="React logo" />
//     //     </a>
//     //   </div>
//     //   <h1>Vite + React</h1>
//     //   <div className="card">
//     //     <button onClick={() => setCount((count) => count + 1)}>
//     //       count is {count}
//     //     </button>
//     //     <p>
//     //       Edit <code>src/App.tsx</code> and save to test HMR
//     //     </p>
//     //   </div>
//     //   <p className="read-the-docs">
//     //     Click on the Vite and React logos to learn more
//     //   </p>
//     // </>
//     <h1>Hello World</h1>
//   )
// }

// export default App












// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Onboarding from './Pages/Onboard';
import Welcome from './Pages/Welcome';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import OtpVerification from './Pages/OtpVerification';
import AccountCreated from './Pages/AccountCreated';
import UserDetails from './Pages/UserDetails';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Onboarding />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/OtpVerification" element={<OtpVerification />} />
      <Route path="/UserDetails" element={<UserDetails />} />
      <Route path="/AccountCreated" element={<AccountCreated />} />

    </Routes>
  );
};

export default App;
