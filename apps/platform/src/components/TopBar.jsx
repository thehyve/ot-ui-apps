import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

function ElevationScroll({children}) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });
  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

export default function TopBar() {
  return (
    <>
      {/* the first div will push the navigation bar down, which is otherwise
          hidden behind the company bar */}
      <div id="placeholder-div" style={{ height: '50px', width: '100%' }} />
      <ElevationScroll>
        <AppBar
          id="ot-org-top-bar"
          style={{
            display: 'block',
            position: 'fixed',
            backgroundColor: '#005284',
            zIndex: 2000000,
            height: '50px',
            width: '100%',
          }}
        >
          <img
            src="/assets/img/logo-org.png"
            title="Logo"
            alt="Logo"
            style={{
              float: 'left',
              marginLeft: '20px',
              marginTop: '5px',
              height: '40px',
            }}
          />
          {/* TODO: enable this part through configuration?
                    not all deployments use the top bar _and_ Keycloak
                    however, this will be invisible if no user info available
          */}
          <span
            id="ot-org-username"
            title="Logged in user"
            style={{
              float: 'right',
              marginRight: '20px',
              marginTop: '15px',
              color: 'white',
              fontFamily: 'Inter, serif',
              fontStyle: 'italic',
            }}
          >
            &nbsp;
          </span>
        </AppBar>
      </ElevationScroll>
    </>
  );
}
