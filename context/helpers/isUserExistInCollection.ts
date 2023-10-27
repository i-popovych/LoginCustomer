import { db } from "@/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export const isUserExistInCollection = async (uid: string, collectionName: string = "admins") => {
    const admins = collection(db, collectionName);
    const q = query(admins, where("uid", "==", uid));
    const querySnapshot = await getDocs(q)

    return !(querySnapshot.empty)
}