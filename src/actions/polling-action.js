import {
	GET_LGA,
	GET_WARD,
	GET_POLLING,
	ERROR_REQUEST,
	LGA_SUCCESS,
	WARD_SUCCESS,
	POLLING_SUCCESS,
	POLLING_RESULT,
	PARTIES_SUCCESS,
	GET_PARTIES,
	POST_PARTIES,
	CLEAR_MESSAGE,
	POST_PARTIES_SUCCESS,
	GET_POLLING_RESULT,
} from "../constants/polling-constant";
import {
	getLGAs,
	getWards,
	getPollingUnit,
	getPollingUnitResult,
	getParties,
	postPollingResult,
} from "../services/AjaxService.js";

export const fetchLga =
	(state_id = null) =>
	async (dispatcher) => {
		try {
			dispatcher({ type: GET_LGA });
			const response = await getLGAs(state_id);
			response.status
				? dispatcher({
						type: LGA_SUCCESS,
						payload: response.data?.data,
				  })
				: dispatcher({
						type: ERROR_REQUEST,
						payload:
							response.message || "An error occur fetching LGA",
				  });
		} catch (err) {
			dispatcher({
				type: ERROR_REQUEST,
				payload: err.message || "An error occur fetching LGA",
			});
		}
	};

export const fetchWard =
	(lga_id = null) =>
	async (dispatcher) => {
		try {
			dispatcher({ type: GET_WARD });
			const response = await getWards({ lga_id });
			response.status
				? dispatcher({
						type: WARD_SUCCESS,
						payload: response.data?.data,
				  })
				: dispatcher({
						type: ERROR_REQUEST,
						payload:
							response.message || "An error occur fetching ward",
				  });
		} catch (err) {
			dispatcher({
				type: ERROR_REQUEST,
				payload: err.message || "An error occur fetching ward",
			});
		}
	};

export const fetchPollingUnit =
	(ward_id = null) =>
	async (dispatcher) => {
		try {
			dispatcher({ type: GET_POLLING });
			const response = await getPollingUnit({ ward_id });
			response.status
				? dispatcher({
						type: POLLING_SUCCESS,
						payload: response.data?.data,
				  })
				: dispatcher({
						type: ERROR_REQUEST,
						payload:
							response.message || "An error occur fetching ward",
				  });
		} catch (err) {
			dispatcher({
				type: ERROR_REQUEST,
				payload: err.message || "An error occur fetching ward",
			});
		}
	};

export const fetchPollingResult =
	(polling_unit_uniqueid = null) =>
	async (dispatcher) => {
		try {
			dispatcher({ type: GET_POLLING_RESULT });
			const response = await getPollingUnitResult({
				polling_unit_uniqueid,
			});
			response.status
				? dispatcher({
						type: POLLING_RESULT,
						payload: response.data?.data,
				  })
				: dispatcher({
						type: ERROR_REQUEST,
						payload:
							response.message || "An error occur fetching ward",
				  });
		} catch (err) {
			dispatcher({
				type: ERROR_REQUEST,
				payload: err.message || "An error occur fetching ward",
			});
		}
	};

export const fetchParties = () => async (dispatcher) => {
	try {
		dispatcher({ type: GET_PARTIES });
		const response = await getParties();
		response.status
			? dispatcher({
					type: PARTIES_SUCCESS,
					payload: response.data?.data,
			  })
			: dispatcher({
					type: ERROR_REQUEST,
					payload: response.message || "An error occur fetching ward",
			  });
	} catch (err) {
		dispatcher({
			type: ERROR_REQUEST,
			payload: err.message || "An error occur fetching ward",
		});
	}
};

export const postResult = (body) => async (dispatcher) => {
	try {
		dispatcher({ type: POST_PARTIES });
		const response = await postPollingResult({ results: body });
		response.status
			? dispatcher({
					type: POST_PARTIES_SUCCESS,
			  })
			: dispatcher({
					type: ERROR_REQUEST,
					payload: response.message || "An error occur fetching ward",
			  });
	} catch (err) {
		dispatcher({
			type: ERROR_REQUEST,
			payload: err.message || "An error occur fetching ward",
		});
	}
};

export const clearMessage = () => (dispatcher) => {
	dispatcher({ type: CLEAR_MESSAGE });
};
