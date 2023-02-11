import db from "../../firebase-admin.config";

const handleSitesApi = async (_, res) => {
  const snapshot = await db.collection("sites").get();
  const sites = [];

  snapshot.forEach((doc) => {
    sites.push({ id: doc.id, ...doc.data() });
    console.log(doc.id, "=>", doc.data());
  });

  res.status(200).json(sites);
};

export default handleSitesApi;
