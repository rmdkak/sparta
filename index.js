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
    let result = response["results"];
    const newArray = result.map((e) => {
      const { id, title, overview, poster_path, vote_average } = e;
      return {
        id,
        title,
        overview,
        poster_path,
        vote_average,
      };
    });
    newArray.forEach((a) => {
      let m_id = a["id"];
      let m_title = a["title"];
      let m_overview = a["overview"];
      let m_poster_path = "https://image.tmdb.org/t/p/w500" + a["poster_path"];
      let m_vote_average = a["vote_average"];
      let card = document.querySelector(".card-list"); // 템플릿 리터럴들을 담을 section을 class로 지정
      let temp_html = `<div class="movie-card" id="${m_id}" onclick="alert('id:'+ ${m_id})">                         
                          <img src="${m_poster_path}" alt="${m_title}"/>                         
                          <h3>${m_title}</h3>                   
                          <p>${m_overview}</p>
                          <p>Rating: ${m_vote_average}</p>
                       </div>`;
      card.insertAdjacentHTML("beforeend", temp_html); // 해당 구역에 템플릿 리터럴들을 붙여줌
    });
  })
  .catch((err) => console.error(err));

function myFunction() {
  // button에서 onclick 이벤트 발생 시 실행
  const input_val = document.getElementById("findMovie").value;
  if (input_val === "") {
    alert("영화 제목을 한 글자 이상 입력해 주세요!"); // input에 value가 비어있을 때 alert 실행
  }
  const input = document.getElementById("findMovie");
  const keywords = input.value.toUpperCase(); // input에 입력된 value를 대문자로 치환
  const movieList = document.getElementById("list");
  const div = movieList.getElementsByTagName("div"); // section 안에 있는 태그 div(무비카드)들을 지칭
  const myArray = [];
  for (i = 0; i < div.length; i++) {
    const title = div[i].getElementsByTagName("h3")[0].innerText; // 각 div마다의 h3태그.이너 텍스트 즉 타이틀 포함
    myArray.push(title);
    if (title.toUpperCase().indexOf(keywords) > -1) {
      // textValue와 indexof(keywords)가 매칭 되는 결과가 있으면 그 값을 반환 그렇지않으면 -1을 반환
      div[i].style.display = ""; // 매칭 결과가 반환되었을 경우 display 속성을 건들지 않음
    } else {
      div[i].style.display = "none"; // 매칭 결과를 제외한 값들 모두 display:none 처리
    }
  }
}
