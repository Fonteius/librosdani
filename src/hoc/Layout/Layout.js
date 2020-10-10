import React, { useState } from 'react';
import MainMenu from '../../components/Navigation/MainMenu/MainMenu';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = (props) => {
	const [drawer, setDrawer] = useState(false);

	const toggleDrawer = () => {
		setDrawer(!drawer);
	};

	return (
		<React.Fragment>
			<MainMenu toggleDrawer={toggleDrawer} />
			<SideDrawer openDrawer={drawer} toggleDrawer={toggleDrawer} />
			{props.children}
		</React.Fragment>
	);
};

export default Layout;
