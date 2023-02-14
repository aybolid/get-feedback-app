import { AuthProvider } from "@/lib/firebase/auth";
import { ThemeProvider } from "next-themes";

import "../styles/globals.css";

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider attribute="class">
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
