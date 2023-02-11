import firebase from "@/firebase.config";

const db = firebase.firestore();

export const createUser = (uid, data) => {
  return db
    .collection("users")
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
};

export const createSite = (data) => {
  return db.collection("sites").add(data);
};
