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

export const deleteDoc = (collectionName, id) => {
  return db.collection(collectionName).doc(id).delete();
};
export const deleteSiteFeedback = async (collectionName, siteId) => {
  const data = await db
    .collection(collectionName)
    .where("siteId", "==", siteId)
    .get();
  let toDelete = [];
  for (let i = 0; i < data.docs.length; i++) {
    toDelete = [data.docs[i].id, ...toDelete];
  }
  for (let i = 0; i < toDelete.length; i++) {
    db.collection(collectionName).doc(toDelete[i]).delete();
  }
};
