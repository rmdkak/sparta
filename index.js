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
  // TMDB API 카드 정보 구문
  .then((response) => response.json())
  .then((response) => {
    let result = response["results"];
    const newArray = result.map((e) => {
      const { id, title, overview, poster_path, vote_average } = e;
      return { id, title, overview, poster_path, vote_average };
    });
    newArray.forEach((a) => {
      let m_id = a["id"];
      let m_title = a["title"];
      let m_overview = a["overview"];
      let m_poster_path = "https://image.tmdb.org/t/p/w500" + a["poster_path"];
      let m_vote_average = a["vote_average"];
      let card = document.querySelector(".card-list");
      let temp_html = `<div class="movie-card" id="${m_id}" onclick="alert('id:'+ ${m_id})">                         
                          <img src="${m_poster_path}" alt="${m_title}"/>                         
                          <h3>${m_title}</h3>                   
                          <p>${m_overview}</p>
                          <p>Rating: ${m_vote_average}</p>
                       </div>`;
      card.insertAdjacentHTML("beforeend", temp_html);
    });
  })
  .catch((err) => console.error(err));

// 검색 구문
function myFunction() {
  const input_val = document.getElementById("findMovie").value;
  if (input_val === "") {
    alert("영화 제목을 한 글자 이상 입력해 주세요!");
  }
  const keywords = input_val.toUpperCase();
  const movieList = document.getElementById("list");
  const div = movieList.getElementsByTagName("div");
  for (i = 0; i < div.length; i++) {
    const title = div[i].getElementsByTagName("h3")[0].innerText;
    if (title.toUpperCase().indexOf(keywords) > -1) {
      div[i].style.display = "";
    } else {
      div[i].style.display = "none";
    }
  }
}
// 결국 안쓰게 됨(미관상)
// let index = 0; //이미지에 접근하는 인덱스
// window.onload = function () {
//   slideShow();
// };

// function slideShow() {
//   let i;
//   let x = document.getElementsByClassName("slide1"); //slide1 참조
//   for (i = 0; i < x.length; i++) {
//     x[i].style.display = "none"; //처음에 전부 display를 none으로 함
//   }
//   index++;
//   if (index > x.length) {
//     index = 1; //인덱스가 초과되면 1로 변경
//   }
//   x[index - 1].style.display = "block"; //해당 인덱스는 block으로
//   setTimeout(slideShow, 4000); //함수를 4초마다 호출
// }
