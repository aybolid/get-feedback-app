import { AuthProvider } from "@/lib/firebase/auth";
import SEO from "@/next-seo.config";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";

import "../styles/globals.css";

const App = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <ThemeProvider attribute="class">
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
