import React, { useEffect, useState } from "react";
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
import { FcGoogle } from "react-icons/fc";
import { SiGithub } from "react-icons/si";

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

const title = "Embed Feedback - Get Feedback";

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
  const [displaySuccess, setDisplaySucces] = useState(false);

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

    createFeedback(newFeedback)
      .then(() => {
        setRating(0);
        reset();
      })
      .then(() => setDisplaySucces(true));
  };
  useEffect(() => {
    setTimeout(() => {
      displaySuccess && setDisplaySucces(false);
    }, 5000);
  }, [displaySuccess]);

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
      <div className="w-full h-full">
        <div className="bg-white w-full mx-auto my-0 text-neutral-700">
          <form onSubmit={handleSubmit(handleFeedbackAdd)}>
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
              <button
                title="Send your feedback"
                className="btn px-8 bg-sky-500 hover:bg-sky-400"
                type="submit"
              >
                Send
              </button>
            </div>
            {displaySuccess && (
              <motion.p
                animate={{ height: "min-content", opacity: 1 }}
                initial={{ height: 0, opacity: 0 }}
                className="w-full text-center mt-4 bg-green-500 rounded-md text-white font-semibold text-lg"
              >
                Your feedback was sent! The comment will be shown as soon as it
                will be approved.
              </motion.p>
            )}
          </form>
          <div>
            {feedback?.map((feedback) => (
              <div key={feedback.id}>
                <div className="w-line my-2 mt-4" />
                <div className="flex justify-start gap-4 items-center">
                  <p className="font-semibold text-xl">{feedback.author}</p>
                  <div className="mt-1">
                    {feedback.provider === "google.com" && (
                      <FcGoogle title="Google" size={20} />
                    )}
                    {feedback.provider === "github.com" && (
                      <SiGithub title="Github" size={20} />
                    )}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  {feedback.rating !== 0 && (
                    <Rating
                      emptyStyle={{ display: "flex" }}
                      fillStyle={{ display: "-webkit-inline-box" }}
                      initialValue={feedback.rating}
                      readonly
                      size={20}
                    />
                  )}
                  <p className="text-sm text-neutral-500">
                    {format(parseISO(feedback.createdAt), "PPpp")}
                  </p>
                </div>
                <p className="text-neutral-900 font-medium p-2 my-2 text-md bg-neutral-100 rounded-lg">
                  {feedback.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SiteFeedback;
