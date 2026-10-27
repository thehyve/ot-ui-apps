import {
  AppBar,
  Box,
  Button,
  type PopperPlacementType,
  type Theme,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import type { ReactElement, ReactNode } from "react";
import { Link as ReactRouterLink } from "react-router";
import { v1 } from "uuid";
import HeaderMenu from "./HeaderMenu";
import Link from "./Link";
import OpenTargetsTitle from "./OpenTargetsTitle";
import PrivateWrapper from "./PrivateWrapper";
import { useConfigContext } from "../providers/ConfigurationProvider";
import { TopBar } from "ui";

const LogoBTN = styled(Button)<{ component?: React.ElementType; to?: string }>`
  border: none;
  color: white;
`;

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "homepage",
})<{ homepage?: boolean }>(({ theme, homepage }) => ({
  backgroundColor: `${theme.palette.primary.dark} !important`,
  margin: 0,
  width: "100%",
  ...(homepage && {
    left: 0,
    top: 0,
    position: "absolute !important" as "absolute",
  }),
}));

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const StyledNavMenu = styled("div")({
  flex: 1,
  display: "flex",
  justifyContent: "end",
});

const StyledMenuExternalLinkTypography = styled(Typography)({
  fontSize: "1rem",
  "&:first-of-type": {
    marginLeft: "1rem",
  },
  "&:not(:last-child)": {
    marginRight: "1rem",
  },
});

const StyledMenuExternalLinkAnchor = styled("a")(({ theme }) => ({
  color: "inherit",
  textDecoration: "none",
  "&:hover": {
    color: theme.palette.secondary.main,
  },
}));

const StyledMenuLink = styled(Link)(({ theme }) => ({
  color: theme.palette.secondary.contrastText,
  margin: `0 ${theme.spacing(2)}`,
  whiteSpace: "nowrap",
  "&:hover": {
    color: theme.palette.secondary.contrastText,
  },
}));

type NavBarItem = {
  external: boolean;
  name: string;
  showOnlyPartner?: boolean;
  url: string;
};

type MenuExternalLinkProps = {
  href: string;
  children: ReactNode;
};

type ToolsMenuItem = {
  name: string;
  url: string;
};

type NavBarProps = {
  name?: string;
  search?: ReactNode;
  api?: string;
  downloads?: string;
  docs?: string;
  contact?: string;
  homepage?: boolean;
  items?: NavBarItem[];
  tools?: ToolsMenuItem[];
  placement?: PopperPlacementType;
};

function MenuExternalLink({ href, children }: MenuExternalLinkProps): ReactElement {
  return (
    <StyledMenuExternalLinkTypography color="inherit">
      <StyledMenuExternalLinkAnchor target="_blank" rel="noopener noreferrer" href={href}>
        {children}
      </StyledMenuExternalLinkAnchor>
    </StyledMenuExternalLinkTypography>
  );
}

function NavBar(props: NavBarProps): ReactElement {
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

type NavBarContentProps = NavBarProps & { showTopBar: boolean };

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
}: NavBarContentProps): ReactElement {
  const theme = useTheme<Theme>();
  const smMQ = useMediaQuery(theme.breakpoints.down("sm"));
  const isHomePageRegular = homepage && !smMQ;
  return (
    <StyledAppBar homepage={homepage} position="static" color="primary" elevation={0}>
      {/* push the content down so it isn't hidden behind the logo bar */}
      {showTopBar && <div id="placeholder-div" style={{ height: "50px", width: "100%" }} />}
      <StyledToolbar variant="dense">
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
              <OpenTargetsTitle name={name ?? ""} />
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

        <StyledNavMenu>
          {docs ? <MenuExternalLink href={docs}>Docs</MenuExternalLink> : null}

          {api ? <MenuExternalLink href={api}>API</MenuExternalLink> : null}

          {downloads ? <MenuExternalLink href={downloads}>Downloads</MenuExternalLink> : null}

          {contact ? <MenuExternalLink href={contact}>Contact</MenuExternalLink> : null}
          {items && !isHomePageRegular ? <HeaderMenu items={items} placement={placement} /> : null}

          {isHomePageRegular && (
            <Box sx={{ display: "flex" }}>
              {(items ?? []).map((item) => {
                if (item.showOnlyPartner) {
                  return (
                    <PrivateWrapper key={v1()}>
                      <StyledMenuLink footer external={item.external} to={item.url}>
                        <Typography variant="body2">{item.name}</Typography>
                      </StyledMenuLink>
                    </PrivateWrapper>
                  );
                }
                return (
                  <StyledMenuLink key={v1()} footer external={item.external} to={item.url}>
                    <Typography variant="body2">{item.name}</Typography>
                  </StyledMenuLink>
                );
              })}
            </Box>
          )}
        </StyledNavMenu>
      </StyledToolbar>
    </StyledAppBar>
  );
}

export default NavBar;
