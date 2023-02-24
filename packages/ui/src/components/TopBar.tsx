import React, { useState, useEffect } from "react";

import AppBar from "@material-ui/core/AppBar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { Typography } from "@material-ui/core";

/**
 * Shadows the AppBar to hint at content scrolling up.
 *
 * @see {@link https://mui.com/material-ui/react-app-bar/#elevate-app-bar}
 */
function ElevationScroll({ children }) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });
  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

export default function TopBar() {
  const [username, setUsername] = useState("");
  useEffect(() => {
    let isCurrent = true;

    async function displayLoggedInUser() {
      const userFunction =
        window.getLoggedInUser || (() => Promise.resolve(""));
      const username = await resolveWithNameOrErrorMessage(userFunction());
      if (isCurrent) {
        setUsername(username);
      }
    }
    async function resolveWithNameOrErrorMessage(userPromise) {
      try {
        return await userPromise;
      } catch {
        return "Unidentified user";
      }
    }
    displayLoggedInUser();

    return () => {
      isCurrent = false;
    };
  }, []);

  return (
    <ElevationScroll>
      <AppBar
        id="ot-org-top-bar"
        style={{
          display: "block",
          position: "fixed",
          backgroundColor: "#005284",
          zIndex: 2000000,
          height: "50px",
          width: "100%",
        }}
      >
        <img
          src="/assets/img/logo-org.png"
          title="Logo"
          alt="Logo"
          style={{
            float: "left",
            marginLeft: "20px",
            marginTop: "5px",
            height: "40px",
          }}
        />
        <Typography
          title="Logged-in user"
          style={{
            float: "right",
            marginRight: "20px",
            marginTop: "15px",
            color: "white",
            fontFamily: "Inter, serif",
            fontStyle: "italic",
          }}
        >
          {username}
        </Typography>
      </AppBar>
    </ElevationScroll>
  );
}
