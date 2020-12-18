import { types } from './picture.actions';

export default function reducer(state, action) {
    switch (action.type) {
        case types.PICTURE_STARTED:
            return {
                ...state,
                pending: true
            }
        case types.PICTURE_DONE:
            return {
                ...state,
                pending: false,
                pictures: action.payload
            }
        case types.PICTURE_UPDATED:
            const { pictures } = state;
            const idx = pictures.findIndex(picture => picture.picsum_id === action.payload.picsum_id);
            pictures[idx] = { ...pictures[idx], ...action.payload };
            return {
                ...state,
                pending: false,
                pictures: [...pictures],
            };
        case types.PICTURE_BOOKMARKED:
            return {
                ...state,
                pending: false,
                user: action.payload
            };
        case types.PICTURE_FAILED:
            return {
                ...state,
                pending: false,
                error: action.payload
            }
        default:
            return state;
    }
}
