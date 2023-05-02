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
