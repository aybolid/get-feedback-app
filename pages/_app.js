import { AuthProvider } from "@/lib/firebase/auth";
import { ThemeProvider } from "next-themes";

import "../styles/globals.css";

const App = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
