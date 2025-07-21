// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   onAuthStateChanged,
//   RecaptchaVerifier,
//   signInWithPhoneNumber,
// } from "firebase/auth";
// import type { User, ConfirmationResult } from "firebase/auth";
// import { app } from "./firebaseConfig";

// // Initialize Firebase Auth
// export const auth = getAuth(app);

// // Sign up with email and password
// export const signUp = async (email: string, password: string) => {
//   try {
//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//     return userCredential.user;
//   } catch (error) {
//     throw error;
//   }
// };

// // Sign in with email and password
// export const signIn = async (email: string, password: string) => {
//   try {
//     const userCredential = await signInWithEmailAndPassword(auth, email, password);
//     return userCredential.user;
//   } catch (error) {
//     throw error;
//   }
// };

// // Sign out
// export const logOut = async () => {
//   try {
//     await signOut(auth);
//   } catch (error) {
//     throw error;
//   }
// };

// // Auth state observer
// export const onAuthStateChange = (callback: (user: User | null) => void) => {
//   return onAuthStateChanged(auth, callback);
// };

// // Phone Authentication
// export const setupRecaptcha = (elementId: string) => {
//   if (!window.recaptchaVerifier) {
//     window.recaptchaVerifier = new RecaptchaVerifier(
//       elementId, // <-- elementId first
//       {
//         size: "invisible",
//         callback: () => {
//           // reCAPTCHA solved, allow signInWithPhoneNumber.
//         },
//       },
//       auth // <-- auth third
//     );
//   }
//   return window.recaptchaVerifier;
// };

// export const sendOtp = async (phoneNumber: string, verifier: RecaptchaVerifier): Promise<ConfirmationResult> => {
//   try {
//     const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, verifier);
//     return confirmationResult;
//   } catch (error) {
//     console.error("Error sending OTP:", error);
//     throw error;
//   }
// };

// export const verifyOtp = async (confirmationResult: ConfirmationResult, otp: string) => {
//   try {
//     const result = await confirmationResult.confirm(otp);
//     return result.user;
//   } catch (error) {
//     console.error("Error verifying OTP:", error);
//     throw error;
//   }
// };

// declare global {
//   interface Window {
//     recaptchaVerifier?: RecaptchaVerifier;
//     confirmationResult?: ConfirmationResult;
//   }
// }





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