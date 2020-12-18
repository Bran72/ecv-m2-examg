import { useContext, useState } from 'react';
import { ApplicationContext } from '../../domain/application.store';
import {
    CommentPicture,
    UpdateCommentPicture,
    LikePictureById,
    UnlikePictureById,
    BookmarkPicture,
    UnbookmarkPicture
} from '../../domain/picture/picture.actions';
import { LikeButton, BookmarkButton } from '../buttons';
import './Card.css';


export function Card({ picture }) {
    const { state, dispatch } = useContext(ApplicationContext);

    const [form, setForm] = useState({
        comment: ''
    });

    const handleChange = e => {
        setForm({
            comment: e.target.value
        })
    };

    const handleSubmit = (e, picture) => {
        e.preventDefault();

        let commentExist = false
        picture.comments.map(comment => {
            if (comment.by._id === state.user._id) commentExist = true
        })

        if (commentExist) UpdateCommentPicture(dispatch, picture.id, form.comment)
        else CommentPicture(dispatch, picture.id, form.comment)
    };

    const onLike = (pictureId) => {
        if (picture.likedBy && picture.likedBy.find(like => like._id === state.user._id)) {
            UnlikePictureById(dispatch, pictureId)
        } else {
            LikePictureById(dispatch, pictureId)
        }
    }

    const onBookmark = (pictureId) => {
        if (state.user.pictures_collection && state.user.pictures_collection.find(pic => pic.picsum_id === picture.id)) {
            UnbookmarkPicture(dispatch, pictureId)
        } else {
            BookmarkPicture(dispatch, pictureId)
        }
    }


    if (!state.user) return null
    return (
        <div className="card">
            <div className="card-img">
                <img src={picture.download_url} />
                <LikeButton onClick={() => { onLike(picture.id) }} isLiked={picture.likedBy && picture.likedBy.find(like => like._id === state.user._id)} />
                <span className="likes">Likes : {picture.likedBy ? picture.likedBy.length : 0}</span>
                <BookmarkButton onClick={() => { onBookmark(picture.id) }} isBookmarked={state.user.pictures_collection && state.user.pictures_collection.find(pic => pic.picsum_id === picture.id)} />
            </div>
            <div className="card-body">
                <h3>
                    Author : {picture.author}
                </h3>
                <div className="card-comments">
                    Comments

                    <ul>
                        {picture.comments.map(comment =>
                            <li key={comment._id}>{comment.by.name}: {comment.comment}</li>
                        )}
                    </ul>
                    <input type="text" onChange={handleChange} />
                    <button onClick={(e) => handleSubmit(e, picture)} type="submit">
                        Commenter
                    </button>
                </div>
            </div>
        </div>
    )

}