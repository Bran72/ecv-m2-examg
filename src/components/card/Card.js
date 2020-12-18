import { useContext, useState } from 'react';
import { ApplicationContext } from '../../domain/application.store';
import {CommentPicture, LikePictureById, UnlikePictureById} from '../../domain/picture/picture.actions';
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

    const handleSubmit = (e, id) => {
        e.preventDefault();
        console.log(id)
        alert("Commentaire: " + form.comment);
        //CommentPicture(dispatch, id)
    };

    const onLike = (pictureId) => {
        if (picture.likedBy && picture.likedBy.find(like => like._id === state.user._id)) {
            UnlikePictureById(dispatch, pictureId)
        } else {
            LikePictureById(dispatch, pictureId)
        }
    }


    if (!state.user) return null
    return (
        <div className="card">
            <div className="card-img">
                <img src={picture.download_url} />
                <LikeButton onClick={() => { onLike(picture.id) }} isLiked={picture.likedBy && picture.likedBy.find(like => like._id === state.user._id)} />
                <span className="likes">Likes : {picture.likedBy ? picture.likedBy.length : 0}</span>
                <BookmarkButton onClick={() => { }} />
            </div>
            <div className="card-body">
                <h3>
                    Author : {picture.author}
                </h3>
                <div className="card-comments">
                    Comments

                    <ul>
                        {picture.comments.map(comment =>
                            <li>{comment.by.name}: {comment.comment}</li>
                        )}
                    </ul>
                    <input type="text" onChange={handleChange} />
                    <button onClick={(e) => handleSubmit(e, picture.id)} type="submit">
                        Commenter
                    </button>
                </div>
            </div>
        </div>
    )

}