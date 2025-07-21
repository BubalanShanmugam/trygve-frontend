import { createContext, useState, useContext, useEffect } from "react";
import type { ReactNode } from "react";

// Define the shape of the context value
interface AuthContextType {
  phoneNumber: string | null;
  isLoggedIn: boolean;
  otpSent: boolean;
  setPhoneNumber: (phone: string | null) => void;
  setIsLoggedIn: (status: boolean) => void;
  setOtpSent: (status: boolean) => void;
  validateLogin: (enteredPhone: string) => boolean;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook for consuming the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

// Provider component to wrap your app
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [phoneNumber, setPhoneNumber] = useState<string | null>(
    localStorage.getItem('userPhone')
  );
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    localStorage.getItem('isLoggedIn') === 'true'
  );
  const [otpSent, setOtpSent] = useState(false);

  // Store phone number in localStorage when it changes
  useEffect(() => {
    if (phoneNumber) {
      localStorage.setItem('userPhone', phoneNumber);
    } else {
      localStorage.removeItem('userPhone');
    }
  }, [phoneNumber]);

  // Store login state in localStorage when it changes
  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn.toString());
  }, [isLoggedIn]);

  // Function to validate login with stored phone number
  const validateLogin = (enteredPhone: string): boolean => {
    const storedPhone = localStorage.getItem('userPhone');
    if (!storedPhone) return false;
    
    // Clean both phone numbers for comparison (remove spaces, dashes, etc.)
    let cleanStoredPhone = storedPhone.replace(/\D/g, '');
    const cleanEnteredPhone = enteredPhone.replace(/\D/g, '');
    
    // Remove country code (91) from stored phone if present
    if (cleanStoredPhone.startsWith('91') && cleanStoredPhone.length === 12) {
      cleanStoredPhone = cleanStoredPhone.substring(2);
    }
    
    // Compare only the 10-digit numbers
    return cleanStoredPhone === cleanEnteredPhone;
  };

  return (
    <AuthContext.Provider 
      value={{ 
        phoneNumber, 
        isLoggedIn, 
        otpSent, 
        setPhoneNumber, 
        setIsLoggedIn, 
        setOtpSent,
        validateLogin 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
