import { useEffect, useState } from "react";
import {
	fetchLga,
	fetchWard,
	fetchPollingUnit,
	fetchPollingResult,
} from "../actions/polling-action";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../components/ErrorMessage.component";
import Loader from "../components/loader.component";

const PollingResult = (props) => {
	const dispatch = useDispatch();
	const { lgas, pollings, wards, errorMessage, loading, pollingResults } =
		useSelector((state) => state.pollingReducer);

	const [userInput, setUserInput] = useState({});

	useEffect(() => {
		dispatch(fetchLga());
	}, [dispatch]);

	return (
		<div>
		{loading&&<Loader show={loading} />}
			<div className="flex-row mb-2 r-sel">
				<div className="flex-col center-align mr-1 ml-1 mb-2">
					<label className="mb-1">Select LGA</label>
					<select
						value={userInput.lga}
						onChange={(e) => {
							dispatch(fetchWard(e.target.value));
							setUserInput((_prev) => ({
								..._prev,
								lga: e.target.value,
							}));
						}}
					>
						<option disabled>Select LGA</option>
						{lgas.map((value) => (
							<option value={value.lga_id}>
								{value.lga_name}
							</option>
						))}
					</select>
				</div>
				<div className="flex-col center-align mr-1 ml-1 mb-2">
					<label className="mb-1">Select Ward</label>
					<select
						value={userInput.ward}
						onChange={(e) => {
							dispatch(fetchPollingUnit(e.target.value));
							setUserInput((_prev) => ({
								..._prev,
								ward: e.target.value,
							}));
						}}
					>
						<option disabled>Select Ward</option>
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
						value={userInput.pollingUnit}
						onChange={(e) => {
							dispatch(fetchPollingResult(e.target.value));
							setUserInput((_prev) => ({
								..._prev,
								pollingUnit: e.target.value,
							}));
						}}
					>
						<option disabled>Select Polling Unit</option>
						{pollings.map((value) => (
							<option value={value.uniqueid}>
								{value.polling_unit_name || "No Name Recorded"}
							</option>
						))}
					</select>
				</div>
			</div>
			{pollingResults[0]&& (
				<div className="w-100">
					<div className="w-100">
						<TitleLabel
							label="LGA"
							value={
								lgas.find((e) => e.lga_id === userInput.lga)
									?.lga_name
							}
						/>
						<TitleLabel
							label="Ward"
							value={
								wards.find((e) => e.ward_id === userInput.ward)
									?.ward_name
							}
						/>
						<TitleLabel
							label="Polling Unit"
							value={
								pollings.find(
									(e) =>
										e.polling_id === userInput.pollingUnit
								)?.polling_name
							}
						/>
					</div>
					<div className="w-100 flex-row center-justify">
						{pollingResults.map((value) => (
							<PartyResult
								party={value.party_abbreviation}
								result={value.party_score}
								color="#788923"
							/>
						))}
					</div>
					<div className="w-mc">
						<table>
							<tr>
								<th className="pd-2 px-4">Result Id</th>
								<th className="pd-2 px-4">Party Name</th>
								<th className="pd-2 px-4">Total Vote</th>
								<th className="pd-2 px-4">
									Announcing Officer
								</th>
								<th className="pd-2 px-4">Date Announced</th>
							</tr>
							{pollingResults.map((value, index) => (
								<tr
									className={`${
										index % 2 === 0 ? "grey-bg" : ""
									}`}
								>
									<td className="pd-2">{value.result_id}</td>
									<td className="pd-2">
										{value.party_abbreviation}
									</td>
									<td className="pd-2">
										{value.party_score}
									</td>
									<td className="pd-2">
										<span className="enter-by">
											{value.entered_by_user}
										</span>
									</td>
									<td
										className="pd-2 sm-txt bl-txt"
										style={{ textAlign: "right" }}
									>
										{value.date_entered}
									</td>
								</tr>
							))}
						</table>
					</div>
				</div>
			)}
			{errorMessage && (
				<ErrorMessage type="error" message={errorMessage} />
			)}
		</div>
	);
};

const TitleLabel = (props) => {
	return (
		<div>
			<div>{props.label}</div>
			<div>{props.value || "No Name Recorded"}</div>
		</div>
	);
};

const PartyResult = (props) => {
	const colorCodes = ["#458921", "#9045b8", "#907832", "#78a190", "#56a193"];
	let code = Math.floor(Math.random() * 5);
	return (
		<div
			className="mr-2 ml-2 flex-col mb-2 center-align center-justify party-r"
			style={{
				background: `${colorCodes[code] + "11"}`,
				color: `${colorCodes[code]}`,
			}}
		>
			<h2>{props.party}</h2>
			<span>{props.result}</span>
		</div>
	);
};

export default PollingResult;
