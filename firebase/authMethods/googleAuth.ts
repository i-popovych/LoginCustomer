import { signInWithPopup } from "@firebase/auth";
import { auth, provider } from "..";

export const googleAuth = () => {
  return signInWithPopup(auth, provider)
}