import DeleteSiteModal from "@/components/Modals/DeleteSiteModal";
import { fetcher } from "@/helpers/fetchers";
import { notifyError, notifySuccess } from "@/helpers/toastNotification";
import { useAuth } from "@/lib/firebase/auth";
import { deleteDoc, deleteSiteFeedback } from "@/lib/firebase/db";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import useSWR, { mutate } from "swr";

const SiteCard = ({ site }) => {
  const { user } = useAuth();
  const [displayDeleteModal, setDisplayDeleteModal] = useState(false);
  useEffect(() => {
    document.body.style.overflow = displayDeleteModal ? "hidden" : "";
  }, [displayDeleteModal]);

  const { data: feedback } = useSWR(`/api/feedback/raw/${site.id}`, fetcher);

  const handleSiteDelete = (id) => {
    deleteDoc("sites", id)
      .then(() => mutate(["/api/sites", user.token], false))
      .then(() => {
        deleteSiteFeedback("rawFeedback", id);
        deleteSiteFeedback("approvedFeedback", id);
      })
      .then(() => notifySuccess("Site was deleted! 👌"))
      .catch(() => notifyError("An unexpected error has occurred... 🤦‍♂️"));
  };

  return (
    <>
      <li
        key={site.id}
        className="bg-white dark:bg-neutral-800 w-full h-20 flex justify-center items-center rounded-lg p-2 mt-2"
      >
        <div className="basis-2/4 px-1 font-semibold text-lg">
          <p>{site.siteName}</p>
        </div>
        <div className="basis-3/4 px-1 text-lg">
          <a
            className="flex justify-start gap-3 max-w-min items-center hover:text-neutral-900 hover:bg-sky-100 rounded-xl p-2 dark:hover:text-neutral-50 dark:hover:bg-neutral-600 duration-150 ease-in-out"
            href={site.siteURL}
            target="_blank"
            rel="noreferrer"
          >
            {site.siteURL}
          </a>
        </div>
        <div className="basis-3/6 px-1 flex justify-start items-center gap-4">
          <Link
            href={`/dashboard/raw-feedback/${site.id}`}
            className="btn primary relative"
          >
            Raw
            {feedback?.length > 0 && (
              <div className="absolute text-sm bg-red-500 rounded-full h-[22px] w-[22px] flex justify-center items-center -top-2 -left-2">
                {feedback.length <= 9 ? (
                  feedback.length
                ) : (
                  <span className="tracking-tighter mb-1">9+</span>
                )}
              </div>
            )}
          </Link>
          <Link href={`/feedback/${site.id}`} className="btn submit">
            Approved
          </Link>
        </div>
        <div className="basis-2/6 px-1 text-md font-light flex justify-between items-center gap-2">
          <p>{format(parseISO(site.createdAt), "PPp")}</p>
          <button
            onClick={() => setDisplayDeleteModal(true)}
            className="relative opacity-40 active:scale-95 hover:opacity-100 hover:text-red-500 ease-in-out duration-100"
          >
            <MdDelete title="Delete" size={20} />
          </button>
        </div>
      </li>
      {displayDeleteModal && (
        <DeleteSiteModal
          setDisplayModal={setDisplayDeleteModal}
          handleSiteDelete={handleSiteDelete}
          siteId={site.id}
          siteName={site.siteName}
        />
      )}
    </>
  );
};

export default SiteCard;
