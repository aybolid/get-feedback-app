import Head from "next/head";

import { useAuth } from "@/lib/firebase/auth";

export default function Home() {
  const auth = useAuth();

  return (
    <>
      <Head>
        <title>Get Feedback</title>
      </Head>
      <main>
        <h1>Get Feedback</h1>
        {!auth?.user ? (
          <button onClick={() => auth.signinWithGithub()}>Sign In</button>
        ) : (
          <button onClick={() => auth.signout()}>Sign Out</button>
        )}
        <div>
          <code>
            user: &#123; <br />
            name: {auth?.user?.name + ","} <br />
            email: {auth?.user?.email + ","}
            <br />
            &#125;
          </code>
        </div>
      </main>
    </>
  );
}
