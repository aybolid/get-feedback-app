import { getAllRawFeedback } from "@/lib/firebase/db-admin";

const getAllFeedbackApi = async (req, res) => {
  const siteId = req.query.siteId;
  res.status(200).json(await getAllRawFeedback(siteId)); // api feed back response
};

export default getAllFeedbackApi;
