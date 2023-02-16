import Head from "next/head";
import DashboardShell from "@/components/Dashboard/DashboardShell";
import SitesEmptyState from "@/components/Dashboard/Sites/SitesEmptyState";
import { GridLoader } from "react-spinners";
import SitesTable from "@/components/Dashboard/Sites/SitesTable";

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
      <GridLoader
        className="absolute right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2"
        color="#ffffff"
        loading={true}
        size={30}
      />
    );

  return (
    <>
      <Head>
        <title>GF Dashboard</title>
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
