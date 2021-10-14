import {
	ERROR_REQUEST,
	LGA_RESULT_SUCCESS,
	GET_LGA_RESULT,
} from "../constants/polling-constant";

import { getLgaResult } from "../services/AjaxService";

export const fetchLGAResult = (lga_name) => async (dispatcher) => {
	try {
		dispatcher({ type: GET_LGA_RESULT });
		const response = await getLgaResult(lga_name);
		response.status
			? dispatcher({
					type: LGA_RESULT_SUCCESS,
					payload: response.data?.data,
			  })
			: dispatcher({
					type: ERROR_REQUEST,
					payload:
						response.message || "An error occur fetching result",
			  });
	} catch (err) {
		dispatcher({
			type: ERROR_REQUEST,
			payload: err.error?.message || "An error occur fetching result",
		});
	}
};
