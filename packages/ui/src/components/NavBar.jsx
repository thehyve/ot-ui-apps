import { Link as ReactRouterLink } from "react-router-dom";
import { AppBar, Toolbar, Button, Typography, useMediaQuery, Box } from "@mui/material";
import { makeStyles, useTheme } from "@mui/styles";
import { styled } from "@mui/material/styles";
import classNames from "classnames";
import { v1 } from "uuid";

import Link from "./Link";
import OpenTargetsTitle from "./OpenTargetsTitle";
import HeaderMenu from "./HeaderMenu";
import PrivateWrapper from "./PrivateWrapper";
import { useConfigContext } from "../providers/ConfigurationProvider";
import { TopBar } from "ui";

const LogoBTN = styled(Button)`
  border: none;
  color: white;
`;

const useStyles = makeStyles(theme => ({
  navbar: {
    backgroundColor: `${theme.palette.primary.dark} !important`,
    margin: 0,
    width: "100%",
  },
  navbarHomepage: {
    left: 0,
    top: 0,
    position: "absolute !important",
  },
  flex: {
    flexGrow: 1,
  },
  menuExternalLinkContainer: {
    fontSize: "1rem",
    "&:first-of-type": {
      marginLeft: "1rem",
    },
    "&:not(:last-child)": {
      marginRight: "1rem",
    },
  },
  menuExternalLink: {
    color: "inherit",
    textDecoration: "none",
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  },
  menuList: {
    display: "flex",
  },
  menuLink: {
    color: theme.palette.secondary.contrastText,
    margin: `0 ${theme.spacing(2)}`,
    whiteSpace: "nowrap",
    "&:hover": {
      color: theme.palette.secondary.contrastText,
    },
  },
  spaceBetween: {
    display: "flex",
    justifyContent: "space-between",
  },
  navLogo: {
    flex: 1,
    display: "none",
  },
  navSearch: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
  },
  navMenu: {
    flex: 1,
    display: "flex",
    justifyContent: "end",
  },
}));

function MenuExternalLink({ classes, href, children }) {
  return (
    <Typography color="inherit" className={classes.menuExternalLinkContainer}>
      <a target="_blank" rel="noopener noreferrer" href={href} className={classes.menuExternalLink}>
        {children}
      </a>
    </Typography>
  );
}

function NavBar(props) {
  const {
    config: { showTopBar },
  } = useConfigContext();
  return (
    <>
      {/*
       * Keep the TopBar outside of the NavBar's AppBar component, as nesting it
       * renders the top bar behind the ProtVista protein structure viewer when
       * scrolling down the OTP target profile page. That's probably because the
       * NavBar's AppBar has its own z-index lower than 40001, which creates a
       * local stacking context outside of which the z-indices of descendants
       * are not compared.
       *
       * This still leaves the issue that the bar also overlays the 3d structure
       * viewer when it's expanded to fill the viewport, blocking some of the
       * buttons of the viewer.
       */}
      {showTopBar && <TopBar />}
      <NavBarContent {...props} showTopBar={showTopBar} />
    </>
  );
}

function NavBarContent({
  name,
  search,
  api,
  downloads,
  docs,
  contact,
  homepage,
  items,
  placement,
  showTopBar,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const smMQ = useMediaQuery(theme.breakpoints.down("sm"));
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
      {showTopBar && <div id="placeholder-div" style={{ height: "50px", width: "100%" }} />}
      <Toolbar variant="dense" className={classNames(classes.spaceBetween)}>
        {homepage ? null : (
          <Box
            component={ReactRouterLink}
            to="/"
            sx={{
              display: { xs: "flex", md: "none" },
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img width="30px" height="100%" alt="logo" src="/assets/img/ot-logo-small.png" />
          </Box>
        )}
        <Box
          sx={{
            flex: 1,
            display: { xs: "none", md: "flex" },
          }}
        >
          {homepage ? null : (
            <LogoBTN component={ReactRouterLink} to="/" color="inherit">
              <OpenTargetsTitle name={name} />
            </LogoBTN>
          )}
        </Box>

        <Box
          sx={{
            flex: {
              xs: 2,
              sm: 1,
            },
            ml: {
              xs: 1,
              sm: 2,
              md: 0,
            },
          }}
        >
          {search || null}
        </Box>

        <div className={classes.navMenu}>
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

          {items && !isHomePageRegular ? <HeaderMenu items={items} placement={placement} /> : null}

          {isHomePageRegular && (
            <Box sx={{ display: "flex" }}>
              {items.map(item => {
                if (item.showOnlyPartner) {
                  return (
                    <PrivateWrapper key={v1()}>
                      <Link
                        footer
                        external={item.external}
                        to={item.url}
                        className={classes.menuLink}
                      >
                        <Typography variant="body2">{item.name}</Typography>
                      </Link>
                    </PrivateWrapper>
                  );
                }
                return (
                  <Link
                    key={v1()}
                    footer
                    external={item.external}
                    to={item.url}
                    className={classes.menuLink}
                  >
                    <Typography variant="body2">{item.name}</Typography>
                  </Link>
                );
              })}
            </Box>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
