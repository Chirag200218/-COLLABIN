/* eslint-disable no-alert */
import '../styles/globals.css';
import { store } from '../app/store'
import { Provider } from 'react-redux'
import First from '../utils/firstconnect';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Inter } from '@next/font/google'
import { Exo_2, Noto_Sans } from "@next/font/google";
import localFont from '@next/font/local'
const inter = Inter({ subsets: ['latin'] })
const exo_2 = Exo_2({ subsets: ['latin'] })
const localfont = localFont({
  src:'/Fonts/Inter.ttf'
})


export default function App({ Component, pageProps }) {
  return (
    <GoogleOAuthProvider clientId='750308990397-g8m9euj7lnm3lifufc50rl5b6qv475ev.apps.googleusercontent.com'>
      <Provider store={store}>
        <First/>
        <main className={localfont.className}>
          <Component {...pageProps} />
        </main>
     </Provider> 
    </GoogleOAuthProvider>
  )
}
