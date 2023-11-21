import React from "react";
import * as homepageStyle from './homepage.tailwind';

const Homepage = () => {
	return (
		<div className={homepageStyle.homepageContainer}>
			<h1>Game Flow</h1>
            <p>Go to the forum</p>
		</div>
	);
};

export default Homepage;
