import Head from "next/head";
import DashboardShell from "@/components/Dashboard/DashboardShell";
import SitesEmptyState from "@/components/Dashboard/Sites/SitesEmptyState";
import { GridLoader } from "react-spinners";
import SitesTable from "@/components/Dashboard/Sites/SitesTable";
import { motion } from "framer-motion";
import useSWR from "swr";
import { fetcherWithUser } from "@/helpers/fetchers";
import { useAuth } from "@/lib/firebase/auth";

const Sites = () => {
  const { user } = useAuth();
  const { data: sites } = useSWR(
    user ? ["/api/sites", user.token] : null,
    fetcherWithUser
  );

  if (!sites)
    return (
      <>
        <Head>
          <title>GF Dashboard</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div className="w-full h-screen p-4">
          <DashboardShell>
            {!user ? (
              <motion.p
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                className="bg-white font-mono text-xl dark:bg-neutral-800 p-4 rounded-lg absolute right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2"
              >
                You must log in to view the content of this page! ⛔
              </motion.p>
            ) : (
              <GridLoader
                className="absolute right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2"
                color="#ffffff"
                loading={true}
                size={30}
              />
            )}
          </DashboardShell>
        </div>
      </>
    );

  return (
    <>
      <Head>
        <title>GF Dashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="w-full h-screen p-4">
        <DashboardShell>
          {sites.length === 0 ? (
            <SitesEmptyState />
          ) : (
            <SitesTable sites={sites} />
          )}
        </DashboardShell>
      </div>
    </>
  );
};

export default Sites;
