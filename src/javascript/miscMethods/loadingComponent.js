// References
const homePage = document.querySelector(".home-page");

export default function loadingComponent() {
  homePage.replaceChildren();

  const loadingImg = document.createElement("img");
  loadingImg.src = "assets/icons/loading.svg";
  loadingImg.alt = "Loading";
  loadingImg.id = "loading-img";

  homePage.appendChild(loadingImg);
}
