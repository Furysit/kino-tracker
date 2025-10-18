const BASE_URL = "/api"

export async function fetchMovies(token) {
    const response = await fetch(`${BASE_URL}/movies`,{
        headers:{
            "Content-Type": "application/json",
            ...(token ? {Authorization : `Bearer ${token}`} : {})
            }
    });
    if (!response.ok) throw new Error("Network error");
    return await response.json();

}

export async function addMovie(movie, token) {
    console.log("📦 Отправляю на сервер:", movie);
    const response = await fetch(`${BASE_URL}/addMovie`, {
        method : "POST",
        headers : {
            "Content-Type": "application/json",
            ...(token ? {Authorization : `Bearer ${token}`} : {})
        },
        body : JSON.stringify(movie),
    });

    if (!response.ok) throw new Error("Network error");
    console.log(response)
    return await response.json();

}

export async function deleteMovie(id, token) {
  if (!token) throw new Error("Missing auth token");

  const response = await fetch(`${BASE_URL}/deleteMovie`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Ошибка при удалении фильма: ${errText}`);
  }

  return await response.json();
}