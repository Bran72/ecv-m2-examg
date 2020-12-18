import { useEffect, useContext } from "react";
import { ApplicationContext } from "../domain/application.store";

export default function Collection() {
  const { state, dispatch } = useContext(ApplicationContext);

  if (state.user) console.log(state.user.pictures_collection);

  return (
    <>
      <h1 className="title">My Collection</h1>

      {state.user && (
        <>
          {state.user.pictures_collection.map((picture) => (
            <p>Pic</p>
          ))}
        </>
      )}
    </>
  );
}
