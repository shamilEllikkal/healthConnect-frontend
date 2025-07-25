import "./App.css";
import Signup from "./pages/Signup";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProtectRouter from "./ProtectRouter";
import HomePage from "./pages/HomePage";
import { Toaster } from 'react-hot-toast';
import '@fontsource/inter';
import BookAppointment from "./components/BookAppointment"
import MyAppointment from "./components/MyAppointment";
import Dashboard from "./pages/Dashboard";
import UserProfile from "./components/UserProfile";
import UserSettings from "./components/UserSettings";
import Admin from "./pages/Admin";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOtp from "./pages/VerifyOtp";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <div className="font-font box-border" >
          <Toaster
  position="top-center"
  reverseOrder={false}
/>
 <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
       <Route path="/" element={ <HomePage /> } />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/reset-password" element={<ResetPassword />} />



      <Route element={<ProtectRouter />} > 
        <Route path="/dashboard" element={ <Dashboard /> }>
            <Route path="bookappointment" element={ <BookAppointment /> } />
          <Route path="myappointment" element={ <MyAppointment /> } />
             <Route path="profile" element={ <UserProfile /> } />
               <Route path="settings" element={ <UserSettings /> } />
          </Route>
            <Route path="/admin" element={<Admin />} />
      </Route>
    </Routes>

    </div>
    
   
  );
} 

export default App;
