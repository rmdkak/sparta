const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTYxZGZlYWM5OTNkZjU0NTYzNmU0OTdmZDgyOTJkMyIsInN1YiI6IjY0NzQzYWQ3YTg5NGQ2MDBjMjYxMTQ1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rj9YMstHRaZaNZF8Fot82FmMGJUQJ0q9EGViv12dRZA",
  },
};

fetch(
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((response) => {
    console.log(response);
    let result = response["results"];
    console.log("result =>", result);
    document.querySelectorAll(".movie_card").remove();
    result.forEach((a) => {
      let m_title = a["title"];
      let m_overview = a["overview"];
      let m_poster_path = "https://image.tmdb.org/t/p/w500" + a["poster_path"];
      let m_vote_average = a["vote_average"];
      console.log(m_title);
      console.log(m_overview);
      console.log(m_poster_path);
      console.log(m_vote_average);
      let element = document.querySelector(".movie_list");
      let temp_html = `<div class="movie_card2">
                          <img
                          src='${m_poster_path}'
                          alt='${m_title}'
                          />
                          <h3>${m_title}</h3>

                          <p>
                          ${m_overview}
                          </p>
                          <p>${m_vote_average}</p>
                        </div>`;
      element.insertAdjacentHTML("beforeend", temp_html);
    });
  })
  .catch((err) => console.error(err));
