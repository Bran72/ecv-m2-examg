import {
    getPictures,
    getPictureById,
    likePicture,
    unlikePicture,
    commentPicture,
    updateCommentPicture,
    bookmarkPicture,
    unbookmarkPicture
} from './picture.service';

export const types = {
    PICTURE_STARTED: 'PICTURE_STARTED',
    PICTURE_DONE: 'PICTURE_DONE',
    PICTURE_UPDATED: 'PICTURE_UPDATED',
    PICTURE_BOOKMARKED: 'PICTURE_BOOKMARKED',
    PICTURE_FAILED: 'PICTURE_FAILED'
}

export function fetchPictures(dispatch) {
    dispatch(_started());
    getPictures()
        .then(pictures => dispatch(_onSuccess(pictures)))
        .catch(error => dispatch(_onError(error)));
}

export function fetchPictureById(dispatch, pictureId) {
    dispatch(_started());
    getPictureById(pictureId)
        .then(picture => dispatch(_onSuccess([picture])))
        .catch(error => dispatch(_onError(error)));
}

export function LikePictureById(dispatch, pictureId) {
    dispatch(_started());
    likePicture(pictureId)
        .then(picture => dispatch(_onUpdate(picture)))
        .catch(error => dispatch(_onError(error)));
}

export function UnlikePictureById(dispatch, pictureId) {
    dispatch(_started());
    unlikePicture(pictureId)
        .then(picture => dispatch(_onUpdate(picture)))
        .catch(error => dispatch(_onError(error)));
}

export function CommentPicture(dispatch, pictureId, comment) {
    dispatch(_started());
    commentPicture(pictureId, comment)
        .then(picture => dispatch(_onUpdate(picture)))
        .catch(error => dispatch(_onError(error)));
}

export function UpdateCommentPicture(dispatch, pictureId, comment) {
    dispatch(_started());
    updateCommentPicture(pictureId, comment)
        .then(picture => dispatch(_onUpdate(picture)))
        .catch(error => dispatch(_onError(error)));
}

export function BookmarkPicture(dispatch, pictureId) {
    dispatch(_started());
    bookmarkPicture(pictureId)
        .then(picture => dispatch(_onBookmark(picture)))
        .catch(error => dispatch(_onError(error)));
}

export function UnbookmarkPicture(dispatch, pictureId) {
    dispatch(_started());
    unbookmarkPicture(pictureId)
        .then(picture => dispatch(_onBookmark(picture)))
        .catch(error => dispatch(_onError(error)));
}

function _started() {
    return {
        type: types.PICTURE_STARTED
    }
}

function _onSuccess(pictures) {
    return {
        type: types.PICTURE_DONE,
        payload: pictures
    }
}

function _onUpdate(picture) {
    return {
        type: types.PICTURE_UPDATED,
        payload: picture
    }
}

function _onBookmark(picture) {
    return {
        type: types.PICTURE_BOOKMARKED,
        payload: picture
    }
}

function _onError(error) {
    return {
        type: types.PICTURE_FAILED,
        payload: error
    }
}