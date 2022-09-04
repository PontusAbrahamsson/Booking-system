import '../styles/globals.css';
import Layout from '../components/Layout';
import GlobalStyles from '../styles/Global';
import { ThemeProvider } from 'styled-components';
import store from '../redux/store';
import { useEffect } from 'react';
import { useSelector, useDispatch, Provider } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/db';
import { login } from '../redux/features/userSlice';
import { wrapper } from '../redux/store';

function MyApp({ Component, pageProps }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const theme = {
    colors: {
      text: '#1a1a1a',
      textLight: '656c8b',
      background: '#f2f2f7',
      background2: '#ede7ff',
      title: '#362a43',
      link: '#6a3dff',
      linkLight: '8661ff'
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(
          login({
            'uid': currentUser.uid,
            // 'displayName': user.displayName,
            'email': currentUser.email,
            'phoneNumber': null,
            'photoUrl': null,
          })
        )
      }
    })
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </>
    </ThemeProvider>
  )
}

export default wrapper.withRedux(MyApp) 
