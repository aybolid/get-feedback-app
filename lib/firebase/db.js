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

export const createFeedback = (data) => {
  return db.collection("rawFeedback").add(data);
};
export const createApprovedFeedback = (data) => {
  return db.collection("approvedFeedback").add(data);
};

export const deleteDoc = (collection, id) => {
  return db.collection(collection).doc(id).delete();
};
