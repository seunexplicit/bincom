import { Fragment } from "react";

export default function _(props) {
	return (
		<Fragment>
			{props.show && (
				<div className="loader flex-row center-align center-justify">
					<img alt="loader" src="images/loader.gif" />
				</div>
			)}
		</Fragment>
	);
}
