import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import 'monaco-editor/esm/vs/base/browser/ui/actionbar/actionbar.css'
import { AuthContextProvider } from '@/contexts/AuthContext'
import { useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import http from '@/http-common'

export default function App({ Component, pageProps }: AppProps) {

  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);

  http.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        const token = localStorage.getItem("token");
        if (token) {
          localStorage.removeItem("token");
          if (!showAlert) {
            setShowAlert(true);
            alert("Your session has expired. Please login again");
            router.replace("/auth/login").then(() => setShowAlert(false));
          }
        } else {
            if (!showAlert) {
              setShowAlert(true);
              alert("You are not authorized to access this page. Please login first");
              router.replace("/auth/login").then(() => setShowAlert(false));
            };
        }
      }
      return Promise.reject(error);
    }
  );


  return (
      <>
        
        <AuthContextProvider>
          <Component {...pageProps} />
        </AuthContextProvider>
      
      </>
  );
}
