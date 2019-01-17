import React from "react";

export default props => {
	return (
		<div {...props} className={"links " + props.className}>
			<a
				className="links--link is-email"
				href="mailto:haythem.belhaj@gmail.com"
				alt="email"
			/>
			<a
				className="links--link is-github"
				href="https://github.com/haithembelhaj"
				alt="github"
			/>
			<a
				className="links--link is-twitter"
				href="https://twitter.com/haythembelhaj"
				alt="twitter"
			/>
			<a
				className="links--link is-xing"
				href="https://www.xing.com/profile/Haithem_belHaj"
				alt="xing"
			/>
			<a
				className="links--link is-linkedin"
				href="https://www.linkedin.com/in/haithem-bel-haj-292957176/"
				alt="linkedin"
			/>
		</div>
	);
};
