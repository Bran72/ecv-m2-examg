export function getPictures() {
  return fetch("/api/pictures?limit=5")
    .then(async (res) => {
      if (res.status !== 200 && res.status !== 201) {
        const { message } = await res.json();
        throw new Error(message);
      }
      return res;
    })
    .then((res) => res.json());
}

export function getPictureById(pictureID) {
  return fetch(`/api/pictures/${pictureID}`)
    .then(async (res) => {
      if (res.status !== 200 && res.status !== 201) {
        const { message } = await res.json();
        throw new Error(message);
      }
      return res;
    })
    .then((res) => res.json());
}

export function likePicture(pictureID) {
  return fetch(`/api/pictures/${pictureID}/like`, {
    method: "PUT",
  })
    .then(async (res) => {
      if (res.status !== 200 && res.status !== 201) {
        const { message } = await res.json();
        throw new Error(message);
      }
      return res;
    })
    .then((res) => res.json());
}

export function unlikePicture(pictureID) {
  return fetch(`/api/pictures/${pictureID}/unlike`, {
    method: "PUT",
  })
    .then(async (res) => {
      if (res.status !== 200 && res.status !== 201) {
        const { message } = await res.json();
        throw new Error(message);
      }
      return res;
    })
    .then((res) => {
      return res.json();
    });
}

export function commentPicture(pictureID, comment) {
  return fetch(`/api/pictures/comment/${pictureID}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ comment: comment }),
  })
    .then(async (res) => {
      if (res.status !== 200 && res.status !== 201) {
        const { message } = await res.json();
        throw new Error(message);
      }
      return res;
    })
    .then((res) => {
      return res.json();
    });
}

export function updateCommentPicture(pictureID, comment) {
  return fetch(`/api/pictures/comment/${pictureID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ comment: comment }),
  })
    .then(async (res) => {
      if (res.status !== 200 && res.status !== 201) {
        const { message } = await res.json();
        throw new Error(message);
      }
      return res;
    })
    .then((res) => {
      return res.json();
    });
}

export function bookmarkPicture(pictureID) {
    return fetch(`/api/collection/${pictureID}`, {
        method: "POST"
    })
        .then(async (res) => {
            if (res.status !== 200 && res.status !== 201) {
                const { message } = await res.json();
                throw new Error(message);
            }
            return res;
        })
        .then((res) => {
            return res.json();
        });
}

export function unbookmarkPicture(pictureID) {
    return fetch(`/api/collection/${pictureID}`, {
        method: "DELETE"
    })
        .then(async (res) => {
            if (res.status !== 200 && res.status !== 201) {
                const { message } = await res.json();
                throw new Error(message);
            }
            return res;
        })
        .then((res) => {
            return res.json();
        });
}

// pictures_collection : [{ picsum_id: String, tags : [String] }]
