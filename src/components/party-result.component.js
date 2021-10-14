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

export default PartyResult;
