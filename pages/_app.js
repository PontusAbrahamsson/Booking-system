import '../styles/globals.css';
import Layout from '../components/Layout';
import GlobalStyles from '../styles/Global';
import { ThemeProvider } from 'styled-components';
import { Provider } from "react-redux"
import { store, persistor } from "../redux/store"
import { PersistGate } from "redux-persist/integration/react"

function MyApp({ Component, pageProps }) {


  const theme = {
    colors: {
      text: '#1a1a1a',
      textLight: '#656c8b',
      background: '#f2f2f7',
      background2: '#ede7ff',
      title: '#362a43',
      link: '#6a3dff',
      linkLight: '#8661ff'
    }
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  )
}

export default MyApp
