import { auth } from "@/firebase-admin.config";
import { getAllSites, getUserSites } from "@/lib/firebase/db-admin";

const getSitesApi = async (req, res) => {
  try {
    const token = req.headers.token;
    const { uid } = await auth.verifyIdToken(token);
    const sites = await getUserSites(uid);
    
    res.status(200).json(sites);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default getSitesApi;
