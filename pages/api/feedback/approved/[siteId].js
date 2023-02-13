import { getAllApprovedFeedback } from "@/lib/firebase/db-admin";

const getAllApprovedFeedbackApi = async (req, res) => {
  const siteId = req.query.siteId;
  res.status(200).json(await getAllApprovedFeedback(siteId)); // api feed back response
};

export default getAllApprovedFeedbackApi;
