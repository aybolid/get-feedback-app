import React, { useRef, useState } from "react";
import { getAllSites } from "@/lib/firebase/db-admin";
import useSWR from "swr";
import { fetcher } from "@/helpers/fetchers";
import { useRouter } from "next/router";
import { format, parseISO } from "date-fns";
import { useAuth } from "@/lib/firebase/auth";
import { createFeedback } from "@/lib/firebase/db";
import { NextSeo } from "next-seo";
import { MdArrowBackIos } from "react-icons/md";
import { Rating } from "react-simple-star-rating";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

export async function getStaticProps() {
  return {
    props: {
      feedback: [],
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const sites = await getAllSites();
  const paths = sites.map((site) => ({
    params: {
      siteId: site.id.toString(),
    },
  }));

  return {
    paths,
    fallback: true,
  };
}

const title = "My Site Feedback - Get Feedback";

const SiteFeedback = ({ feedback }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const router = useRouter();

  const url = "http://getfb.vercel.app" + router.asPath;

  const { data: approvedFeedback } = useSWR(
    `/api/feedback/approved/${router.query.siteId}`,
    fetcher
  );
  feedback = approvedFeedback;

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleFeedbackAdd = ({ feedbackContent }) => {
    const { name, uid, provider } = user;
    const siteId = router.query.siteId;
    const ratingValue = rating;
    const date = new Date().toISOString();

    const newFeedback = {
      author: name,
      authorId: uid,
      provider: provider,
      siteId: siteId,
      text: feedbackContent,
      rating: ratingValue,
      createdAt: date,
      status: "pending",
    };

    createFeedback(newFeedback).then(() => {
      setRating(0);
      reset();
    });
  };

  return (
    <>
      <NextSeo
        title={title}
        canonical={url}
        openGraph={{
          url,
          title,
        }}
      />
      <div className="w-full h-full p-4">
        <button className="btn primary" onClick={() => router.back()}>
          <MdArrowBackIos />
          Go Back
        </button>
        <div className="bg-white rounded-lg w-4/6 p-4 mx-auto my-0 text-neutral-700">
          <form onSubmit={handleSubmit(handleFeedbackAdd)} className="pb-4">
            <div className="flex flex-col justify-center items-start">
              <label htmlFor="feedbackInput" className="font-semibold text-lg">
                Send Feedback
              </label>
              <div className="flex flex-col justify-center items-end w-full">
                <textarea
                  {...register("feedbackContent", {
                    required: true,
                    maxLength: 660,
                  })}
                  id="feedbackInput"
                  autoComplete="off"
                  placeholder="Your Feedback..."
                  className="flex-grow w-full py-1 px-2 bg-neutral-100 rounded-md min-h-[32px] resize-y max-h-40 border border-neutral-300"
                />
                {errors.feedbackContent &&
                  errors.feedbackContent.type === "required" && (
                    <motion.span
                      animate={{ x: 0, height: "auto", opacity: 1 }}
                      initial={{ x: -200, height: 0, opacity: 0 }}
                      className="text-red-500 font-mono mt-1 text-end"
                    >
                      This field is required
                    </motion.span>
                  )}
                {errors.feedbackContent &&
                  errors.feedbackContent.type === "maxLength" && (
                    <motion.span
                      animate={{ x: 0, height: "auto", opacity: 1 }}
                      initial={{ x: -200, height: 0, opacity: 0 }}
                      className="text-red-500 font-mono mt-1 text-end"
                    >
                      Max length is 660 digits
                    </motion.span>
                  )}
              </div>
              <div className="my-4">
                <Rating
                  initialValue={rating}
                  onClick={handleRating}
                  emptyStyle={{ display: "flex" }}
                  fillStyle={{ display: "-webkit-inline-box" }}
                  transition
                  showTooltip
                  tooltipArray={[
                    "Terrible",
                    "Bad",
                    "Average",
                    "Good",
                    "Awesome",
                  ]}
                  tooltipStyle={{
                    backgroundColor: "#404040",
                    fontWeight: "normal",
                    padding: 4,
                  }}
                />
              </div>
              <input
                value="Send"
                type="submit"
                className="btn px-8 bg-sky-500 hover:bg-sky-400"
              />
            </div>
          </form>
          <div>
            {feedback?.map((feedback) => (
              <div key={feedback.id}>
                <div className="w-line my-2" />
                <div className="flex justify-start gap-4 items-center">
                  <p className="font-semibold text-xl">{feedback.author}</p>
                  <p>provider: {feedback.provider}</p>
                </div>
                <p className="text-neutral-900 font-medium p-2 my-2 text-md bg-neutral-100 rounded-lg">
                  {feedback.text}
                </p>
                <div className="flex justify-between items-center">
                  <p>
                    {feedback.rating !== 0 && (
                      <Rating
                        emptyStyle={{ display: "flex" }}
                        fillStyle={{ display: "-webkit-inline-box" }}
                        initialValue={feedback.rating}
                        readonly
                        size={30}
                      />
                    )}
                  </p>
                  <p className="text-sm text-neutral-500">
                    {format(parseISO(feedback.createdAt), "PPpp")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SiteFeedback;
