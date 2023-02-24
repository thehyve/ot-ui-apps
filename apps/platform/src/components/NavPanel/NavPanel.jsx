import React from 'react';
import { Drawer } from '@material-ui/core';

import GoBackButton from './GoBackButton';
import navPanelStyles from './navPanelStyles';
import SectionMenu from './SectionMenu';
import config from '../../config';

function NavPanel({ ...props }) {
  const classes = navPanelStyles();

  return (
    <Drawer
      variant="permanent"
      classes={{ root: classes.drawer, paper: classes.paper }}
    >
      {/* leave the space that will be hidden behind the logo bar unused */}
      {config.showTopBar &&
          <div style={{ height: '50px', width: '100%', flexShrink: 0 }} />}
      <GoBackButton />
      <SectionMenu {...props} />
    </Drawer>
  );
}

export default NavPanel;
