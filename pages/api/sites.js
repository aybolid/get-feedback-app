import { getAllSites } from "@/lib/firebase/db-admin";

const handleSitesApi = async (_, res) => {
  res.status(200).json(await getAllSites()); // api sites response
};

export default handleSitesApi;
