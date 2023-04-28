import '@/styles/globals.css'
import {wrapper} from "@/redux/store/store";

const App = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default wrapper.withRedux(App)