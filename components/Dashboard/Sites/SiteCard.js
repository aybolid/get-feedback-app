import { format, parseISO } from "date-fns";
import Link from "next/link";
import React, { useState } from "react";
import { MdDelete } from "react-icons/md";

const SiteCard = ({ site, handleSiteDelete }) => {
  const [displayDeleteHint, setDisplayDeleteHint] = useState(false);
  return (
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
          className="btn primary"
        >
          Raw
        </Link>
        <Link
          href={`/dashboard/raw-feedback/${site.id}`}
          className="btn submit"
        >
          Approved
        </Link>
      </div>
      <div className="basis-2/6 px-1 text-md font-light flex justify-between items-center gap-2">
        <p>{format(parseISO(site.createdAt), "PPp")}</p>
        <button
          onDoubleClick={() => handleSiteDelete(site.id)}
          onMouseEnter={() => setDisplayDeleteHint(true)}
          onMouseLeave={() => setDisplayDeleteHint(false)}
          className="relative opacity-40 active:scale-95 hover:opacity-100 hover:text-red-500 ease-in-out duration-100"
        >
          <MdDelete size={20} />
          {displayDeleteHint ? (
            <p className="rounded-sm text-red-500 absolute top-0 -left-8 text-sm w-14">
              2x
            </p>
          ) : null}
        </button>
      </div>
    </li>
  );
};

export default SiteCard;
