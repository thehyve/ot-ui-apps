import React from 'react';
import { Helmet } from 'react-helmet';
import { Footer } from 'ui';

import Search from './Search';
import Page from './Page';
import NavBar from './NavBar';
import TopBar from './TopBar';
import {
  appTitle,
  appDescription,
  appCanonicalUrl,
  externalLinks,
  mainMenuItems,
} from '../constants';
import config from '../config';

const BasePage = ({ title, children, description, location }) => {
  const composedTitle = `${title ? title + ' | ' : ''} ${appTitle}`;

  return (
    <Page
      header={
        <>
          {config.showTopBar && <TopBar />}
          <NavBar
            name="Platform"
            search={<Search embedded />}
            items={mainMenuItems}
          />
        </>
      }
      footer={<Footer externalLinks={externalLinks} />}
    >
      <Helmet title={composedTitle}>
        <meta name="description" content={description || appDescription} />
        <link
          rel="canonical"
          href={appCanonicalUrl + (location?.pathname || '')}
        />
      </Helmet>
      {children}
    </Page>
  );
};

export default BasePage;
