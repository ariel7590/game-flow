import React from "react";
import * as homepageStyle from './homepage.tailwind';
import { Link } from "react-router-dom";

const Homepage = () => {
	return (
		<div className={homepageStyle.homepageContainer}>
			<h1>Game Flow</h1>
            <p>Go to the <Link to='/forum' className={homepageStyle.forum}>forum</Link></p>
		</div>
	);
};

export default Homepage;
