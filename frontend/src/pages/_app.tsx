import { AppProps } from 'next/app';
import Head from 'next/head';
import { FC } from 'react';
import { ContextProvider } from '../contexts/ContextProvider';
import { AppBar } from '../components/AppBar';
import { ContentContainer } from '../components/ContentContainer';
import { Footer } from '../components/Footer';
import Notifications from '../components/Notification';
import { wrapper } from '../lib/store';

require('@solana/wallet-adapter-react-ui/styles.css');
require('../styles/globals.css');

const App: FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <>
          <Head>
            <title>Commune Market</title>
          </Head>
{/* 
          <Provider store={store}> */}
            <ContextProvider>
              <div className="flex flex-col">
                <Notifications />
                <AppBar/>
                <ContentContainer>
                  <Component {...pageProps} />
                  <Footer/>
                </ContentContainer>
              </div>
            </ContextProvider>
          {/* </Provider> */}
        </>
    );
};

export default wrapper.withRedux(App);
