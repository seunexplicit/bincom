import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { clearMessage } from "../actions/polling-action";

export default function _(props) {
	const dispatch = useDispatch();

	setTimeout(() => {
		dispatch(clearMessage());
	}, 9000);

	return (
		<Fragment>
			{props.message && (
				<div className="error-wrapper flex-row end-justify">
					<div className={`${props.type}-container`}>
						<span>{props.message}</span>
					</div>
				</div>
			)}
		</Fragment>
	);
}
