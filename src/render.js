import { App } from "./main";
import { Versions } from "./store";

export function renderVersion(version) {
  document.title = `v${version} - ArcOS Warp`;
  App.className = "viewer";

  const versionInfo = Versions.filter((v) => v.version === version)[0];
  if (!versionInfo) location.href = "/";

  document.head.querySelector("#favIcon").href = versionInfo.icon;

  const { menuBar, menuBarTrigger } = renderMenuBar(versionInfo);
  const iframe = document.createElement("iframe");

  iframe.className = "warp-frame";
  iframe.src = versionInfo.url;

  App.append(menuBarTrigger, menuBar, iframe);
}

function renderMenuBar(version) {
  const menuBar = document.createElement("div");
  const menuBarTrigger = document.createElement("div");
  const backButton = document.createElement("button");
  const versionWrapper = document.createElement("div");
  const versionString = document.createElement("span");
  const versionIcon = document.createElement("img");

  /** back button */
  backButton.addEventListener("click", () => {
    location.href = "/";
  });
  backButton.innerText = "Go back";
  backButton.className = "back";
  /** end back button */

  /** version */
  versionWrapper.className = "version";
  versionString.innerText = `ArcOS v${version.version}`;
  versionIcon.src = version.icon;
  versionIcon.className = "icon";

  versionWrapper.append(versionIcon, versionString);
  /** end version */

  menuBar.className = "menu-bar";
  menuBar.append(backButton, versionWrapper);

  /** trigger */
  let timeout;

  menuBarTrigger.className = "menu-bar-trigger";
  menuBarTrigger.addEventListener("mouseover", () => {
    clearTimeout(timeout);
    menuBar.classList.add("visible");
    timeout = setTimeout(() => {
      menuBar.classList.remove("visible");
    }, 2000);
  });

  setTimeout(() => {
    menuBar.classList.add("visible");

    timeout = setTimeout(() => {
      menuBar.classList.remove("visible");
    }, 2000);
  }, 100);
  /** end trigger */

  return { menuBarTrigger, menuBar };
}
