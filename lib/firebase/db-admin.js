import db from "../../firebase-admin.config";

import { compareDesc, parseISO } from "date-fns";

export const getAllSites = async () => {
  const snapshot = await db.collection("sites").get();
  const sites = [];

  snapshot.forEach((doc) => {
    sites.push({ id: doc.id, ...doc.data() });
  });

  sites.sort((a, b) =>
    compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
  );

  return sites;
};

export const getAllRawFeedback = async (siteId) => {
  const snapshot = await db
    .collection("rawFeedback")
    .where("siteId", "==", siteId)
    .get();

  const rawFeedback = [];

  snapshot.forEach((doc) => {
    rawFeedback.push({ id: doc.id, ...doc.data() });
  });

  rawFeedback.sort((a, b) =>
    compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
  );

  return rawFeedback;
};

export const getAllApprovedFeedback = async (siteId) => {
  const snapshot = await db
    .collection("approvedFeedback")
    .where("siteId", "==", siteId)
    .get();

  const approvedFeedback = [];

  snapshot.forEach((doc) => {
    approvedFeedback.push({ id: doc.id, ...doc.data() });
  });

  approvedFeedback.sort((a, b) =>
    compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
  );

  return approvedFeedback;
};
