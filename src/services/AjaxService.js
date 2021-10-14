import axios from "axios";
const baseURI = "https://bincom2-app.herokuapp.com";

export const getLGAs = (state_id) => {
	return axios.get(`${baseURI}/lga`);
};

export const getWards = ({ lga_id }) => {
	return axios.get(`${baseURI}/ward?lga_id=${lga_id || ""}`);
};

export const getPollingUnit = ({ ward_id, lga_id }) => {
	return axios.get(
		`${baseURI}/pollingunit?lga_id=${lga_id || ""}&ward_id=${ward_id}`
	);
};

export const getPollingUnitResult = ({ polling_unit_uniqueid }) => {
	return axios.get(
		`${baseURI}/polling-result?polling_unit_uniqueid=${
			polling_unit_uniqueid || ""
		}`
	);
};

export const getLgaResult = (lga_name) => {
	return axios.get(`${baseURI}/lga-result?lga_name=${lga_name || ""}`);
};

export const getParties = () => {
	return axios.get(`${baseURI}/parties`);
};

export const postPollingResult = (body) => {
	return axios.post(`${baseURI}/result`, body);
};
