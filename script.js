//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// Function to download a single image as a Promise
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to download: ${url}`);

    img.src = url;
  });
}

// Main function to download all images
function downloadImages() {
  output.innerHTML = "";
  errorDiv.innerHTML = "";

  loading.style.display = "block"; // Show spinner

  const imagePromises = images.map((item) => downloadImage(item.url));

  Promise.all(imagePromises)
    .then((downloadedImages) => {
      loading.style.display = "none";

      downloadedImages.forEach((img) => {
        output.appendChild(img);
      });
    })
    .catch((err) => {
      loading.style.display = "none";
      errorDiv.textContent = err;
    });
}

btn.addEventListener("click", downloadImages);
