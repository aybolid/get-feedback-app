import Head from "next/head";
import DashboardShell from "@/components/DashboardShell";
import { motion } from "framer-motion";

import { useAuth } from "@/lib/firebase/auth";
import EmptyState from "@/components/EmptyState";

const Dashboard = () => {
  const auth = useAuth();

  if (!auth?.user) return "Loading...";

  return (
    <>
      <Head>
        <title>GF Dashboard</title>
      </Head>
      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        className="w-full h-screen p-4"
      >
        <DashboardShell>
          <EmptyState />
        </DashboardShell>
      </motion.div>
    </>
  );
};

export default Dashboard;
