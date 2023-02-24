import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { MenuItem, MenuList, useMediaQuery } from '@material-ui/core';
import { withStyles, useTheme } from '@material-ui/core/styles';
import classNames from 'classnames';

import Link from './Link';
import OpenTargetsTitle from './OpenTargetsTitle';
import HeaderMenu from './HeaderMenu';
import PrivateWrapper from './PrivateWrapper';
import config from '../config';
import { TopBar } from 'ui';

const styles = theme => ({
  navbar: {
    backgroundColor: theme.palette.primary.main,
    margin: 0,
    width: '100%',
  },
  navbarHomepage: {
    left: 0,
    top: 0,
    position: 'absolute',
  },
  flex: {
    flexGrow: 1,
  },
  menuExternalLinkContainer: {
    fontSize: '1rem',
    '&:first-of-type': {
      marginLeft: '1rem',
    },
    '&:not(:last-child)': {
      marginRight: '1rem',
    },
  },
  menuExternalLink: {
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.secondary.main,
    },
  },
  menuList: {
    display: 'flex',
  },
  menuLink: {
    color: theme.palette.secondary.contrastText,
    '&:hover': {
      color: theme.palette.secondary.contrastText,
    },
  },
});

const MenuExternalLink = ({ classes, href, children }) => (
  <Typography color="inherit" className={classes.menuExternalLinkContainer}>
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      className={classes.menuExternalLink}
    >
      {children}
    </a>
  </Typography>
);

const NavBar = props => (
  <>
    {/*
      * Keep the TopBar outside of the NavBar's AppBar component, as nesting it
      * renders the top bar behind the ProtVista protein structure viewer when
      * scrolling down the target profile page. That's probably because the
      * NavBar's AppBar has its own z-index lower than 40001, which creates a
      * local stacking context outside of which the z-indices of descendants
      * are not compared.
      *
      * This still leaves the issue that the bar also overlays the 3d structure
      * viewer when it's expanded to fill the viewport, blocking some of the
      * buttons of the viewer.
      */}
    {config.showTopBar && <TopBar />}
    <NavBarContent {...props} />
  </>
)

const NavBarContent = ({
  classes,
  name,
  search,
  api,
  downloads,
  docs,
  contact,
  homepage,
  items,
  placement,
}) => {
  const theme = useTheme();
  const smMQ = useMediaQuery(theme.breakpoints.down('sm'));
  const isHomePageRegular = homepage && !smMQ;
  return (
    <AppBar
      className={classNames(classes.navbar, {
        [classes.navbarHomepage]: homepage,
      })}
      position="static"
      color="primary"
      elevation={0}
    >
      {/* push the content down so it isn't hidden behind the logo bar */}
      {config.showTopBar &&
          <div id="placeholder-div" style={{ height: '50px', width: '100%' }} />}
      <Toolbar variant="dense">
        {homepage ? null : (
          <Button component={ReactRouterLink} to="/" color="inherit">
            <OpenTargetsTitle name={name} />
          </Button>
        )}
        <div className={classes.flex} />
        {search ? search : null}

        {docs ? (
          <MenuExternalLink classes={classes} href={docs}>
            Docs
          </MenuExternalLink>
        ) : null}

        {api ? (
          <MenuExternalLink classes={classes} href={api}>
            API
          </MenuExternalLink>
        ) : null}

        {downloads ? (
          <MenuExternalLink classes={classes} href={downloads}>
            Downloads
          </MenuExternalLink>
        ) : null}

        {contact ? (
          <MenuExternalLink classes={classes} href={contact}>
            Contact
          </MenuExternalLink>
        ) : null}

        {items && !isHomePageRegular ? (
          <HeaderMenu items={items} placement={placement} />
        ) : null}

        {isHomePageRegular && (
          <MenuList className={classes.menuList}>
            {items.map((item, i) => {
              if (item.showOnlyPartner) {
                return (
                  <PrivateWrapper>
                    <MenuItem key={i} dense={true} className={classes.menuItem}>
                      <Link
                        external={item.external}
                        to={item.url}
                        className={classes.menuLink}
                      >
                        {item.name}
                      </Link>
                    </MenuItem>
                  </PrivateWrapper>
                );
              } else {
                return (
                  <MenuItem key={i} dense={true} className={classes.menuItem}>
                    <Link
                      external={item.external}
                      to={item.url}
                      className={classes.menuLink}
                    >
                      {item.name}
                    </Link>
                  </MenuItem>
                );
              }
            })}
          </MenuList>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(NavBar);
