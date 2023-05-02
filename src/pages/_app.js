import '@/styles/globals.css'
import {wrapper} from "@/redux/store/store";

const App = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

//обертка для работы redux с next
export default wrapper.withRedux(App)