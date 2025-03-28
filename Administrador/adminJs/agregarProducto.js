// Variables
const dropZone = document.getElementById("dropZone");
const fileInput = document.getElementById("fileInput");
const fileInfo = document.getElementById("fileInfo");
const fileName = document.getElementById("fileName");
const fileProgressBar = document.getElementById("fileProgressBar");

// Botones
const updateBtn = document.getElementById("updateBtn");
const deleteBtn = document.getElementById("deleteBtn");
const cancelBtn = document.getElementById("cancelBtn");

// Simular la carga inicial
simulateUpload();

// Evento para abrir el selector de archivos al hacer clic en la zona de drop
dropZone.addEventListener("click", () => {
  fileInput.click();
});

// Prevenir comportamiento por defecto del navegador para drag and drop
["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
  dropZone.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

// Resaltar la zona de drop cuando se arrastra un archivo sobre ella
["dragenter", "dragover"].forEach((eventName) => {
  dropZone.addEventListener(eventName, highlight, false);
});

["dragleave", "drop"].forEach((eventName) => {
  dropZone.addEventListener(eventName, unhighlight, false);
});

function highlight() {
  dropZone.style.borderColor = "#0066cc";
  dropZone.style.backgroundColor = "rgba(0, 102, 204, 0.05)";
}

function unhighlight() {
  dropZone.style.borderColor = "#ccc";
  dropZone.style.backgroundColor = "";
}

// Manejar el archivo soltado
dropZone.addEventListener("drop", handleDrop, false);
fileInput.addEventListener("change", handleFiles, false);

function handleDrop(e) {
  const dt = e.dataTransfer;
  const files = dt.files;
  handleFiles({ target: { files } });
}

function handleFiles(e) {
  const files = e.target.files;
  if (files.length) {
    const file = files[0];
    if (file.type.match("image.*")) {
      // Actualizar el nombre del archivo
      fileName.textContent = file.name;

      // Reiniciar y simular la carga
      fileProgressBar.style.width = "0%";
      simulateUpload();

      // Leer el archivo para la miniatura
      const reader = new FileReader();
      reader.onload = function (e) {
        document.querySelector(
          ".file-thumbnail"
        ).style.backgroundImage = `url(${e.target.result})`;
        document.querySelector(".file-thumbnail").style.backgroundSize =
          "cover";
        document.querySelector(".file-thumbnail").style.backgroundPosition =
          "center";
      };
      reader.readAsDataURL(file);
    }
  }
}

function simulateUpload() {
  let progress = 0;
  const interval = setInterval(() => {
    progress += 5;
    fileProgressBar.style.width = `${progress}%`;

    if (progress >= 100) {
      clearInterval(interval);
    }
  }, 50);
}

// Funcionalidad de los botones
updateBtn.addEventListener("click", () => {
  alert("Producto actualizado correctamente");
});

deleteBtn.addEventListener("click", () => {
  if (confirm("¿Está seguro que desea eliminar este producto?")) {
    alert("Producto eliminado correctamente");
  }
});

cancelBtn.addEventListener("click", () => {
  if (
    confirm(
      "¿Está seguro que desea cancelar? Los cambios no guardados se perderán."
    )
  ) {
    window.location.href = "#";
  }
});
