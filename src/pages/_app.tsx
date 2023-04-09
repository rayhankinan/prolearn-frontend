import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "monaco-editor/esm/vs/base/browser/ui/actionbar/actionbar.css";
import { AuthContextProvider } from "@/contexts/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}
