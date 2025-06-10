import { renderVersion } from "./render";
import { Versions } from "./store";
import "./style.css";

export const App = document.getElementById("app");

function populate() {
  const h1 = document.createElement("h1");
  h1.innerText = "ArcOS Warp";
  App.append(h1);
  App.className = "selector";

  for (const version of Versions) {
    const button = document.createElement("button");
    const img = document.createElement("img");
    const caption = document.createElement("span");

    img.className = "icon";
    img.src = version.icon;
    caption.innerText = "ArcOS " + version.version;
    caption.className = "caption";

    button.className = "option ver-" + version.version;
    button.append(img, caption);
    button.addEventListener("click", () => {
      location.href = "?version=" + version.version;
    });

    App.append(button);
  }
}

const params = new URLSearchParams(window.location.search);

if (params.get("version")) {
  renderVersion(params.get("version"));
} else {
  populate();
}
