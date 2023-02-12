import { getAllFeedback } from "@/lib/firebase/db-admin";

const getAllFeedbackApi = async (req, res) => {
  const siteId = req.query.siteId;
  res.status(200).json(await getAllFeedback(siteId)); // api feed back response
};

export default getAllFeedbackApi;
