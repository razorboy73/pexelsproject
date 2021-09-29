function getContent() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // Typical action to be performed when the document is ready:
      let response = JSON.parse(xhttp.responseText);

      let photoData = response.photos.map(function (photo) {
        return photo;
      });

      var heroImage = photoData[0].src.large;
      console.log(heroImage);
      document
        .getElementById("hero-container")
        .setAttribute(
          "style",
          "background-image: url(" + `${photoData[0].src.landscape}` + ")"
        );

      var bodyContainer = document.getElementById("body-container");
      bodyContainer.innerHTML = "";
      photoData.forEach(function (photo) {
        console.log(photo);
        let photoContainerDiv = document.createElement("div");
        photoContainerDiv.classList.add("photo-container");
        photoContainerDiv.innerHTML = `
                <a href=${photo.url}>
                <img src="${photo.src.medium}" alt="" srcset="">
                </a>
                <div><h4>${photo.photographer}</h4></div>
                `;

        // }

        bodyContainer.appendChild(photoContainerDiv);
      });
    }
  };
  var searchValue = document.querySelector("#search-bar").value;

  xhttp.open(
    "GET",
    `https://api.pexels.com/v1/search?query=${searchValue}`,
    true
  );

  xhttp.setRequestHeader(
    "Authorization",
    "563492ad6f91700001000001075a0265f4be495a9b94d6d0d5e5bc70"
  );
  xhttp.send();
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  getContent();
});
