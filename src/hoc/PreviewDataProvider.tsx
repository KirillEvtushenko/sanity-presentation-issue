import { FC, ReactElement } from 'react';

import { VisualEditing } from '@/components/VisualEditing';
import { useLiveProps } from '@/resolvers/use-live-props';
import { Options } from '@/resolvers';

interface PreviewDataProps {
  pageProps: {
    previewOptions: Options;
  };
  children(props: unknown): ReactElement;
}

const Container: FC<PreviewDataProps> = ({ children, pageProps }) => {
  const liveProps = useLiveProps(pageProps.previewOptions, pageProps);

  return children(liveProps);
};

const PreviewDataProvider: FC<PreviewDataProps> = ({ children, pageProps }) => {
  const key = pageProps.previewOptions.path;

  return (
    <>
      <VisualEditing />
      <Container pageProps={pageProps} key={key}>
        {children}
      </Container>
    </>
  );
};

export default PreviewDataProvider;
