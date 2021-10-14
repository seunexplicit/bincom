import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchLga } from "../actions/polling-action";
import { fetchLGAResult } from "../actions/lga.action";
import PartyResult from "../components/party-result.component";
import PopupMessage from "../components/ErrorMessage.component";
import Loader from "../components/loader.component";

const LGAResult = (props) => {
	const dispatch = useDispatch();
	const {
		errorMessage,
		successMessage,
		lgas,
		loading,
		announced_party,
		partyResult,
	} = useSelector((state) => state.LGADataReducer);
	const [selectedLga, seteSelectedLga] = useState();

	useEffect(() => {
		dispatch(fetchLga());
	}, [dispatch]);

	return (
		<div className="w-100">
			{errorMessage && (
				<PopupMessage message={errorMessage} type="error" />
			)}
			{successMessage && (
				<PopupMessage message={successMessage} type="success" />
			)}
			{loading && <Loader show={loading} />}
			<div className="flex-col center-align mr-1 ml-1 mb-2">
				<label className="mb-1">Select LGA</label>
				<select
					onChange={(e) => {
						dispatch(fetchLGAResult(e.target.value));
						seteSelectedLga(e.target.value);
					}}
				>
					<option readOnly>Select LGA</option>
					{lgas?.map((value) => (
						<option value={value.lga_id}>{value.lga_name}</option>
					))}
				</select>
			</div>
			{selectedLga && announced_party?.length < 1 && (
				<div className="w-100 flex-row center-justify">
					<h2>Result for selected lga not available yet</h2>
				</div>
			)}
			{announced_party?.length > 1 && (
				<div className="w-100">
					<div className="w-100 flex-row mb-2 center-justify">
						{announced_party.map((value) => (
							<PartyResult
								party={value}
								result={partyResult[value]}
							/>
						))}
					</div>
					<div className="flex-row w-100 mt-2 center-justify">
						<PartyResult
							party="Total Vote"
							result={partyResult?.total}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default LGAResult;
