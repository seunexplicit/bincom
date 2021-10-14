import {
	GET_LGA,
	ERROR_REQUEST,
	LGA_SUCCESS,
	LGA_RESULT_SUCCESS,
	GET_LGA_RESULT,
	CLEAR_MESSAGE,
} from "../constants/polling-constant";

export const LGADataReducer = (
	state = {
		lgas: [],
		partyResult: {},
		announced_polling_result: [],
		announced_party: [],
	},
	action
) => {
	switch (action.type) {
		case GET_LGA_RESULT:
			return { ...state, loading: true };
		case GET_LGA:
			return { ...state, loading: true, partResult: {} };
		case LGA_SUCCESS:
			return { ...state, loading: false, lgas: action.payload };
		case LGA_RESULT_SUCCESS:
			const partyResult = { total: 0 };
			action.payload?.announcedPollingResult?.forEach((value) => {
				partyResult[value.party_abbreviation]
					? (partyResult[value.party_abbreviation] +=
							value.party_score)
					: (partyResult[value.party_abbreviation] =
							value.party_score);
				partyResult["total"] += value.party_score;
			});
			return {
				...state,
				loading: false,
				announced_party: Object.keys(partyResult).filter(
					(e) => e !== "total"
				),
				partyResult,
				announced_polling_result: action.payload,
			};
		case ERROR_REQUEST:
			return { ...state, errorMessage: action.payload, loading: false };
		case CLEAR_MESSAGE:
			return { ...state, errorMessage: null, successMessage: null };
		default:
			return state;
	}
};
