import { useEffect, useContext, useState } from "react";
import { ApplicationContext } from "../domain/application.store";
import { fetchPictureById } from "../domain/picture/picture.actions";

export default function Collection() {
  const { state, dispatch } = useContext(ApplicationContext);

  let fetchedPics = []

    if (state.user) {
      state.user.pictures_collection.map(picture => {
        fetch(`/api/pictures/${picture.picsum_id}`)
            .then((res) => res.json())
            .then((res) => {
              console.log(res)
              fetchedPics.push(res)
            });

      })

      console.log(state.pictures)
      console.log(fetchedPics)
    }

  if (!state.user) return null
  return (
    <>
      <h1 className="title">My Collection</h1>

      {state.user.pictures_collection.map((picture) => (
        <p key={picture._id}>{picture.picsum_id}</p>
      ))}
    </>
  );
}
