import React, { useState } from "react";
import { format, parseISO } from "date-fns";
import { MdDelete } from "react-icons/md";

const FeedbackCard = ({
  feedback,
  handleFeedbackApprove,
  handleDeleteFeedback,
}) => {
  const [displayDeleteHint, setDisplayDeleteHint] = useState(false);

  return (
    <div className="bg-white dark:bg-neutral-700 flex flex-col justify-center items-start px-4 py-2 rounded-md h-80">
      <div className="flex justify-start items-center gap-4">
        <p className="font-bold text-xl">{feedback.author}</p>
        <p className="text-sm">Provider: {feedback.provider}</p>
      </div>
      <p className="font-thin text-sm">
        {format(parseISO(feedback.createdAt), "PPpp")}
      </p>
      <div className="bg-sky-50 dark:bg-neutral-500 px-2 rounded-md flex-grow w-full my-2 overflow-x-hidden overflow-y-auto">
        <p className="font-semibold text-lg my-4">{feedback.text}</p>
      </div>
      <div className="flex justify-between items-center w-full">
        <div>
          <p>
            {feedback.rating == 0
              ? "Rating: not provided"
              : `Rating: ${feedback.rating}/5`}
          </p>
        </div>
        <div className="flex justify-center items-center gap-4">
          <button
            onDoubleClick={() => handleDeleteFeedback(feedback.id)}
            onMouseEnter={() => setDisplayDeleteHint(true)}
            onMouseLeave={() => setDisplayDeleteHint(false)}
            className="relative opacity-40 active:scale-95 hover:opacity-100 hover:text-red-500 ease-in-out duration-100"
          >
            <MdDelete title="Delete" size={20} />
            {displayDeleteHint ? (
              <p className="rounded-sm text-red-500 absolute top-0 -left-14 text-sm w-14">
                2x click
              </p>
            ) : null}
          </button>
          <button
            onClick={() => handleFeedbackApprove(feedback)}
            className="btn primary"
          >
            Approve
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackCard;
