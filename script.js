const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to download: ${url}`);

    img.src = url;
  });
}

function downloadImages() {
  // Safety check in case Cypress loads before DOM
  if (!output || !loading || !errorDiv) return;

  output.innerHTML = "";
  errorDiv.innerHTML = "";
  loading.style.display = "block";

  const downloads = images.map((item) => downloadImage(item.url));

  Promise.all(downloads)
    .then((imgs) => {
      loading.style.display = "none";
      imgs.forEach((img) => output.appendChild(img));
    })
    .catch((err) => {
      loading.style.display = "none";
      errorDiv.textContent = err;
    });
}

btn.addEventListener("click", downloadImages);
