import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchLga,
	fetchWard,
	fetchPollingUnit,
	fetchParties,
	postResult,
} from "../actions/polling-action";
import PopupMessage from "../components/ErrorMessage.component";
import Loader from "../components/loader.component";

const SaveResult = (props) => {
	const dispatch = useDispatch();
	const {
		lgas,
		pollings,
		wards,
		errorMessage,
		successMessage,
		loading,
		parties,
	} = useSelector((state) => state.pollingReducer);
	const [results, setResults] = useState([{}]);
	const [selectedParties, setSelectedParties] = useState([]);

	console.log(loading);

	useEffect(() => {
		dispatch(fetchLga());
		dispatch(fetchParties());
	}, [dispatch]);

	const handleResult = () => {
		console.log(results);
		dispatch(postResult(results));
		setResults([{}]);
	};
	const removeFields = (i) => {
		setResults((_prev) => {
			if (_prev.length > 1) {
				const removedvalue = _prev.splice(i, 1);
				setSelectedParties((_prev) => {
					return _prev.filter(
						(e) => e !== removedvalue[0]?.party_abbreviation
					);
				});
				return [..._prev];
			} else {
				setSelectedParties([]);
				return [{}];
			}
		});
	};
	return (
		<div className="flex-col w-100 center-align">
			{errorMessage && (
				<PopupMessage message={errorMessage} type="error" />
			)}
			{successMessage && (
				<PopupMessage message={successMessage} type="success" />
			)}
			{loading && <Loader show={loading} />}
			<div className="flex-col mb-2">
				<label className="mb-1">Officer Name</label>
				<input
					value={results[0]?.entered_by_user}
					onChange={(e) =>
						setResults((_prev) => {
							return _prev.map((each) => ({
								...each,
								entered_by_user: e.target.value,
							}));
						})
					}
				/>
			</div>
			<div className="flex-col mr-1 ml-1 mb-2 mt-2">
				<label className="mb-1">Select LGA</label>
				<select onChange={(e) => dispatch(fetchWard(e.target.value))}>
					<option disabled>Select LGA</option>
					{lgas.map((value) => (
						<option value={value.lga_id}>{value.lga_name}</option>
					))}
				</select>
			</div>
			<div className="flex-col center-align mr-1 ml-1 mb-2">
				<label className="mb-1">Select Ward</label>
				<select
					onChange={(e) => dispatch(fetchPollingUnit(e.target.value))}
				>
					<option>Select Ward</option>
					{wards.map((value) => (
						<option value={value.ward_id}>
							{value.ward_name || "No Name Recorded"}
						</option>
					))}
				</select>
			</div>
			<div className="flex-col center-align mr-1 ml-1 mb-2">
				<label className="mb-1">Select Polling Unit</label>
				<select
					value={results[0]?.polling_unit_uniqueid}
					onChange={(e) => {
						setResults((_prev) => {
							return _prev.map((each) => ({
								...each,
								polling_unit_uniqueid: e.target.value,
							}));
						});
					}}
				>
					<option readOnly>Select Polling Unit</option>
					{pollings.map((value) => (
						<option value={value.uniqueid}>
							{value.polling_unit_name || "No Name Recorded"}
						</option>
					))}
				</select>
			</div>
			{results.map((_value, index) => (
				<div className="w-100 flex-col center-align">
					<div className="flex-col mb-2 ech-fm-field">
						<div className="flex-col center-align mr-1 ml-1 mb-2">
							<label className="mb-1">Select Party</label>
							<select
								value={_value.party_abbreviation}
								onChange={(e) => {
									setResults((_prev) => {
										_prev[index] = {
											..._prev[index],
											party_abbreviation: e.target.value,
										};
										return [..._prev];
									});

									setSelectedParties((_prev) => [
										..._prev,
										e.target.value,
									]);
								}}
							>
								<option readOnly>Select Party</option>
								{parties
									?.filter(
										(e) =>
											!selectedParties?.includes(
												e.partyid
											) ||
											e.partyid ===
												_value.party_abbreviation
									)
									.map((value) => (
										<option value={value.partyid}>
											{value.partyname ||
												"No Name Recorded"}
										</option>
									))}
							</select>
						</div>
						<div className="flex-col center-align mr-1 ml-1 mb-2">
							<label className="mb-1">Enter Party Score</label>
							<input
								inputMode="numeric"
								value={_value.party_score}
								type="tel"
								onChange={(e) => {
									setResults((_prev) => {
										_prev[index] = {
											..._prev[index],
											party_score: Number(
												e.target.value ?? 0
											),
										};
										return [..._prev];
									});
								}}
							></input>
						</div>
					</div>
					<div className="flex-row end-justify">
						<div
							className="error-container"
							onClick={() => removeFields(index)}
						>
							<span>remove</span>
						</div>
					</div>
				</div>
			))}
			<div className="w-100 end-justify flex-row">
				<div
					className="success-container"
					onClick={() =>
						setResults((prev) => {
							return [...prev, {}];
						})
					}
				>
					<span>Add Results</span>
				</div>
			</div>
			<div className="flex-row center-justify">
				<button onClick={handleResult}>Submit Result</button>
			</div>
		</div>
	);
};

export default SaveResult;
