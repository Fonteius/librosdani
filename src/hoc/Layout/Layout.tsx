import React, { useState } from 'react';
import MainMenu from 'src/components/Navigation/MainMenu/MainMenu';
import SideDrawer from 'src/components/Navigation/SideDrawer/SideDrawer';

const Layout = (props: any) => {
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
