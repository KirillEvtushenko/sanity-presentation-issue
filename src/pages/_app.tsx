import dynamic from 'next/dynamic';
import Head from 'next/head';

import '../main.css';

const App = ({ Component, pageProps, children }) => {
  return (
    <>
      <Head>
        {children}
      </Head>
      <Component {...pageProps} />
    </>  
  );
};

const PreviewDataProvider = dynamic(() => import('@/hoc/PreviewDataProvider'));

const AppPreview = (props) => (
  <PreviewDataProvider pageProps={props.pageProps}>
    {pageProps => <App {...props} pageProps={pageProps} />}
  </PreviewDataProvider>
);

const Application = (props) => {
  if (props.pageProps.previewOptions?.preview) {
    return <AppPreview {...props} />;
  }

  return <App {...props} />;
};

export default Application;
