import "./app.css";

const fileInput = document.getElementById("file-input") as HTMLInputElement;
const nameInput = document.getElementById("name-input") as HTMLInputElement;

const gzipDownloadLink = document.getElementById(
  "download-link-gzip",
) as HTMLAnchorElement;

nameInput.oninput = () => {
  gzipDownloadLink.download = `${nameInput.value}.gz`;
  gzipDownloadLink.innerText = `Download ${nameInput.value}.gz`;
};

const app = document.getElementById("app") as HTMLDivElement;

// setup file drag and drop
app.addEventListener("dragover", (event) => {
  event.preventDefault();
});

app.addEventListener("drop", async (event) => {
  event.preventDefault();
  const file = event.dataTransfer?.files[0];
  if (!file) {
    return;
  }
  fileInput.files = event.dataTransfer?.files;
});

fileInput.onchange = async (event) => {
  const file = fileInput.files?.[0];
  if (!file) {
    return;
  }

  compress(file);
};

const compress = async (file: File) => {
  nameInput.value = file.name;

  const gzipStream = new CompressionStream("gzip");
  const gzipReadable = file.stream();
  const gzippedStream = gzipReadable.pipeThrough(gzipStream);
  const gzippedBlob = await new Response(gzippedStream).blob();
  const gzippedUrl = URL.createObjectURL(gzippedBlob);

  gzipDownloadLink.href = gzippedUrl;
  gzipDownloadLink.className = "";
  nameInput.oninput?.(new Event("input"));
};
