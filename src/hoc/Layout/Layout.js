import React from 'react';
import MainMenu from '../../components/Navigation/MainMenu/MainMenu';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = (props) => {
	return (
		<React.Fragment>
			<MainMenu />
			<SideDrawer />
			<main>{props.children}</main>
		</React.Fragment>
	);
};

export default Layout;
