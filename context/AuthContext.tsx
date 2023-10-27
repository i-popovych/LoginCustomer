import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { googleAuth } from "../firebase/authMethods/googleAuth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { isUserExistInCollection } from "./helpers/isUserExistInCollection";
import { useRouter } from "next/router";

export const AuthContext = createContext<any>({});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter()
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {

        let userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        } as any

        
        const isUserExist = await isUserExistInCollection(user.uid)
        if (isUserExist) {
          userData.isAdmin = true
          console.log("exsist")
        }

        if (user.email === "gabriel@easytradeapp.com") {
          userData.isSuperUser = true
          console.log("simillar email")
        }

        setUser({
          ...userData
        });

        if (isUserExist || user.email === "gabriel@easytradeapp.com") {
          router.push("https://admin-corp-nextjs.pages.dev/")
        } else {
          router.push("/")
        }

      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    setUser(null);
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, login: googleAuth, logout }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
