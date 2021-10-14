import {
	GET_LGA,
	GET_WARD,
	GET_POLLING,
	ERROR_REQUEST,
	LGA_SUCCESS,
	WARD_SUCCESS,
	POLLING_SUCCESS,
	POLLING_RESULT,
	GET_POLLING_RESULT,
	GET_PARTIES,
	PARTIES_SUCCESS,
	POST_PARTIES,
	POST_PARTIES_SUCCESS,
	CLEAR_MESSAGE,
} from "../constants/polling-constant";

export const FetchedDataReducer = (
	state = {
		lgas: [],
		pollings: [],
		wards: [],
		pollingResults: [],
	},
	action
) => {
	switch (action.type) {
		case GET_PARTIES:
		case POST_PARTIES:
		case GET_LGA:
			return { ...state, loading: true };
		case LGA_SUCCESS:
			return {
				...state,
				loading: false,
				lgas: action.payload,
			};
		case GET_WARD:
			return {
				...state,
				loading: true,
				pollings: [],
				pollingResults: [],
			};
		case WARD_SUCCESS:
			return {
				...state,
				loading: false,
				wards: action.payload,
			};
		case GET_POLLING:
			return {
				...state,
				loading: true,
				pollingResults: [],
			};
		case POLLING_SUCCESS:
			return {
				...state,
				loading: false,
				pollings: action.payload,
			};
		case GET_POLLING_RESULT:
			return { ...state, loading: true };
		case PARTIES_SUCCESS:
			return { ...state, loading: false, parties: action.payload };
		case POLLING_RESULT:
			return {
				...state,
				loading: false,
				pollingResults: action.payload,
			};
		case POST_PARTIES_SUCCESS:
			return {
				...state,
				loading: false,
				successMessage: "Result posted successfully",
			};
		case CLEAR_MESSAGE:
			return { ...state, errorMessage: null, successMessage: null };
		case ERROR_REQUEST:
			return { ...state, loading: false, errorMessage: action.payload };
		default:
			return state;
	}
};
