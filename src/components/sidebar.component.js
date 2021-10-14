import { NavLink } from "react-router-dom";

export default function _() {
	return (
		<div className="w-100 h-100 flex-col center-justify">
			<NavLink exact to="/">
				<div className="w-100 pd-2">
					<span>Polling Unit Result</span>
				</div>
			</NavLink>
			<NavLink to="/lga">
				<div className="w-100 pd-2">
					<span>LGA Result</span>
				</div>
			</NavLink>
			<NavLink to="/post-result">
				<div className="w-100 pd-2">
					<span>Submit Polling Result</span>
				</div>
			</NavLink>
		</div>
	);
}
