




import { auth } from "./firebaseConfig";
import { 
  RecaptchaVerifier, 
  signInWithPhoneNumber,
  type ConfirmationResult 
} from "firebase/auth";

// Extend window for recaptchaVerifier and confirmationResult
declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
    confirmationResult?: ConfirmationResult;
  }
}

/**
 * Sets up invisible reCAPTCHA for phone authentication.
 * @param containerId - The DOM id for the reCAPTCHA container.
 */
export const setupRecaptcha = (containerId: string = "recaptcha-container"): RecaptchaVerifier => {
  if (!window.recaptchaVerifier) {
    try {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
        size: "invisible",
        callback: () => {
          console.log("reCAPTCHA solved");
        },
        'expired-callback': () => {
          console.log("reCAPTCHA expired");
        }
      });
    } catch (error) {
      console.error("Error setting up reCAPTCHA:", error);
      throw error;
    }
  }
  return window.recaptchaVerifier;
};


/**
 * Sends OTP to the given phone number using Firebase.
 * @param phone - The phone number in E.164 format (e.g., "+911234567890").
 */
export const sendOtp = async (phone: string) => {
  const appVerifier = setupRecaptcha();
  const confirmationResult = await signInWithPhoneNumber(auth, phone, appVerifier);
  window.confirmationResult = confirmationResult;
  return confirmationResult;
};

/**
 * Verifies the OTP entered by the user.
 * @param otp - The OTP code received on the user's phone.
 */
export const verifyOtp = async (otp: string) => {
  if (!window.confirmationResult) throw new Error("No confirmation result found.");
  return await window.confirmationResult.confirm(otp);
};