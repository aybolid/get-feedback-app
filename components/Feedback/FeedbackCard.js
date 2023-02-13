import React from "react";
import { format, parseISO } from "date-fns";

const FeedbackCard = ({ feedback, handleFeedbackApprove }) => {
  return (
    <div className="bg-neutral-700 flex flex-col justify-center items-start px-4 py-2 rounded-md h-80">
      <div className="flex justify-start items-center gap-4">
        <p className="font-bold text-xl">{feedback.author}</p>
        <p className="text-sm">Provider: {feedback.provider}</p>
      </div>
      <p className="font-thin text-sm">
        {format(parseISO(feedback.createdAt), "PPpp")}
      </p>
      <div className="bg-neutral-500 px-2 rounded-md flex-grow w-full my-2 overflow-x-hidden overflow-y-auto">
        <p className="font-semibold text-lg my-4">{feedback.text}</p>
      </div>
      <div className="flex justify-between items-center w-full">
        <div>
          <p>Rating: {feedback.rating}</p>
          <p>Status: {feedback.status}</p>
        </div>
        <button
          onClick={() => handleFeedbackApprove(feedback)}
          className="btn primary"
        >
          Approve
        </button>
      </div>
    </div>
  );
};

export default FeedbackCard;
