import { fetcher } from "@/helpers/fetchers";
import { useAuth } from "@/lib/firebase/auth";
import {
  createApprovedFeedback,
  createFeedback,
  deleteDoc,
} from "@/lib/firebase/db";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { GridLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import useSWR, { mutate } from "swr";
import FeedbackCard from "./FeedbackCard";
import "react-toastify/dist/ReactToastify.css";
import AddSiteModal from "../Modals/AddSiteModal";

const RawFeedbackTable = ({ rawFeedback }) => {
  const [displayModal, setDisplayModal] = useState(false);
  useEffect(() => {
    document.body.style.overflow = displayModal ? "hidden" : "";
  }, [displayModal]);

  const [comment, setComment] = useState("");

  const auth = useAuth();
  const router = useRouter();

  // Get Raw Feedback
  const { data: feedback } = useSWR(
    `/api/feedback/raw/${router.query.siteId}`,
    fetcher
  );
  rawFeedback = feedback;

  // Approve Feedback
  const handleFeedbackApprove = (feedback) => {
    const approvedFeedback = {
      author: feedback.author,
      authorId: feedback.authorId,
      createdAt: feedback.createdAt,
      provider: feedback.provider,
      siteId: feedback.siteId,
      status: "approved",
      text: feedback.text,
    };
    createApprovedFeedback(approvedFeedback)
      .then(() => deleteDoc("rawFeedback", feedback.id))
      .then(() => mutate(`/api/feedback/raw/${router.query.siteId}`, false))
      .then(() => notifySuccess("Feedback was approved! 👌"))
      .catch(() => notifyError());
  };

  // Add Feedback
  const handleCommentAdd = (e) => {
    e.preventDefault();
    const newFeedback = {
      author: auth.user.name,
      authorId: auth.user.uid,
      provider: auth.user.provider,
      siteId: router.query.siteId,
      text: comment,
      createdAt: new Date().toISOString(),
      status: "pending",
    };
    createFeedback(newFeedback)
      .then(() => mutate(`/api/feedback/raw/${router.query.siteId}`, false))
      .then(() => setComment(""))
      .then(() => notifySuccess("Feedback was added! 👌"))
      .catch(() => notifyError());
  };

  // Delete Feedback
  const handleDeleteFeedback = (id) => {
    deleteDoc("rawFeedback", id).then(() =>
      mutate(`/api/feedback/raw/${router.query.siteId}`, false)
    );
  };
  // Notifications
  const notifySuccess = (message) =>
    toast.success(message, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  const notifyError = () =>
    toast.error("Unexpected error... 🙅‍♂️", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  return (
    <>
      <motion.div
        animate={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: 1000 }}
        className="flex-grow bg-white dark:bg-neutral-800 w-5/6 rounded-lg flex flex-col justify-center"
      >
        <div className="p-6 flex items-center justify-start gap-x-10">
          <h3 className="font-bold text-3xl dark:text-neutral-50 text-neutral-800">
            Raw Feedback <span>\</span>
          </h3>
          <p className="font-semibold text-lg">
            {auth?.user?.name
              ? `Welcome 👋 Good to see you again, ${auth.user.name}!`
              : "Welcome 👋 Good to see you again!"}
          </p>
          <div className="flex flex-grow justify-end items-center">
            <button
              onClick={() => setDisplayModal(!displayModal)}
              className="btn submit"
            >
              + Add Site
            </button>
          </div>
        </div>
        <div className="flex-grow dark:bg-neutral-600 bg-sky-100 flex flex-col justify-start items-center rounded-b-lg p-4">
          <form
            onSubmit={handleCommentAdd}
            className="flex-row gap-4 w-full px-4 bg-white dark:bg-neutral-700 p-4 rounded-xl mb-4 flex justify-center items-center"
          >
            <label className="text-lg font-semibold">Comment:</label>
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              type="text"
              placeholder="Your Feedback..."
              className="rounded-md bg-sky-100 dark:bg-neutral-200 text-neutral-900 w-2/3 px-2 h-10"
            />
            <button type="submit" className="btn submit">
              + Add Comment
            </button>
          </form>
          {rawFeedback?.length === 0 ? (
            <div className="relative flex-grow w-full min-h-[50px]">
              <p className="text-3xl font-mono text-center absolute right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2">
                This place is so empty... 🕸️👻
              </p>
            </div>
          ) : !rawFeedback ? (
            <div className="relative flex-grow w-full min-h-[50px]">
              <GridLoader
                className="absolute right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2"
                color="#ffffff"
                loading={true}
                size={30}
              />
            </div>
          ) : (
            <div className="flex w-full">
              <div className="grid flex-grow w-full grid-cols-[repeat(auto-fit,minmax(min-content,32%))] grid-rows-none gap-4 justify-center items-start p-4">
                {rawFeedback?.map((feedback) => (
                  <FeedbackCard
                    key={feedback.id}
                    handleFeedbackApprove={handleFeedbackApprove}
                    handleDeleteFeedback={handleDeleteFeedback}
                    feedback={feedback}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
      {/* AddSiteModal */}
      {displayModal && (
        <AddSiteModal
          notifyError={notifyError}
          notifySuccess={notifySuccess}
          setDisplayModal={setDisplayModal}
        />
      )}
      {/* Toast */}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default RawFeedbackTable;
