import React from 'react';

export default function TopBar() {
  return (
    <>
      {/* the first div will push the navigation bar down, which is otherwise
	  hidden behind the company bar */}
      <div id="placeholder-div" style={{ height: '50px', width: '100%' }} />
      <div
        id="ot-org-top-bar"
        style={{
          position: 'fixed',
          backgroundColor: '#005284',
          zIndex: 2000000,
          boxShadow: '0 4px 5px 0px grey',
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
      </div>
    </>
  );
}
