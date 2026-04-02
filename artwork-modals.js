(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const descModal = document.getElementById("description-modal");
  const descTitle = document.getElementById("description-modal-title");
  const descBody = document.getElementById("description-modal-body");
  const descActions = document.getElementById("description-modal-actions");
  const descClose = descModal
    ? descModal.querySelector(".description-modal-close")
    : null;

  const videoModal = document.getElementById("video-modal");
  const videoPlayer = document.getElementById("video-modal-player");
  const videoClose = videoModal
    ? videoModal.querySelector(".video-modal-close")
    : null;

  const imageModal = document.getElementById("image-modal");
  const imageViewer = document.getElementById("image-modal-viewer");
  const imageClose = imageModal
    ? imageModal.querySelector(".image-modal-close")
    : null;

  function openVideoModal(src) {
    if (!videoModal || !videoPlayer) return;
    videoPlayer.src = src;
    videoPlayer.load();
    videoModal.classList.add("is-open");
    videoModal.setAttribute("aria-hidden", "false");
    const p = videoPlayer.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  }

  function closeVideoModal() {
    if (!videoModal || !videoPlayer) return;
    videoModal.classList.remove("is-open");
    videoModal.setAttribute("aria-hidden", "true");
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
    videoPlayer.removeAttribute("src");
  }

  function openImageModal(src, altText) {
    if (!imageModal || !imageViewer) return;
    imageViewer.src = src;
    imageViewer.alt = altText || "";
    imageModal.classList.add("is-open");
    imageModal.setAttribute("aria-hidden", "false");
  }

  function closeImageModal() {
    if (!imageModal || !imageViewer) return;
    imageModal.classList.remove("is-open");
    imageModal.setAttribute("aria-hidden", "true");
    imageViewer.removeAttribute("src");
    imageViewer.alt = "";
  }

  function openDescriptionModal(box) {
    if (!descModal || !descTitle || !descBody || !descActions) return;

    const title = box.getAttribute("data-art-title") || "";
    let text = box.getAttribute("data-art-description");
    if (text === null || String(text).trim() === "") {
      text = "Description coming soon.";
    }

    descTitle.textContent = title;
    descBody.textContent = text;
    descActions.innerHTML = "";

    const videoSrc = box.getAttribute("data-video-src");
    if (videoSrc && videoModal && videoPlayer) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "description-action-btn";
      btn.textContent = "Play video";
      btn.addEventListener("click", () => {
        closeDescriptionModal();
        openVideoModal(videoSrc);
      });
      descActions.appendChild(btn);
    }

    const illoImg = box.classList.contains("illustration-piece")
      ? box.querySelector("img")
      : null;
    if (illoImg && imageModal && imageViewer) {
      const fullBtn = document.createElement("button");
      fullBtn.type = "button";
      fullBtn.className = "description-action-btn";
      fullBtn.textContent = "View full image";
      fullBtn.addEventListener("click", () => {
        closeDescriptionModal();
        openImageModal(illoImg.src, illoImg.alt);
      });
      descActions.appendChild(fullBtn);
    }

    descModal.classList.add("is-open");
    descModal.setAttribute("aria-hidden", "false");
  }

  function closeDescriptionModal() {
    if (!descModal) return;
    descModal.classList.remove("is-open");
    descModal.setAttribute("aria-hidden", "true");
    if (descActions) descActions.innerHTML = "";
  }

  document.querySelectorAll("[data-artwork-box]").forEach((box) => {
    box.addEventListener("click", (e) => {
      const t =
        e.target instanceof Element ? e.target : e.target.parentElement;
      if (t && t.closest && t.closest(".coding-links a")) return;
      openDescriptionModal(box);
    });
  });

  if (descClose) {
    descClose.addEventListener("click", closeDescriptionModal);
  }
  if (descModal) {
    descModal.addEventListener("click", (e) => {
      if (e.target === descModal) closeDescriptionModal();
    });
  }

  if (videoClose) {
    videoClose.addEventListener("click", closeVideoModal);
  }
  if (videoModal) {
    videoModal.addEventListener("click", (e) => {
      if (e.target === videoModal) closeVideoModal();
    });
  }

  if (imageClose) {
    imageClose.addEventListener("click", closeImageModal);
  }
  if (imageModal) {
    imageModal.addEventListener("click", (e) => {
      if (e.target === imageModal) closeImageModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (imageModal && imageModal.classList.contains("is-open")) {
      closeImageModal();
      return;
    }
    if (descModal && descModal.classList.contains("is-open")) {
      closeDescriptionModal();
      return;
    }
    if (videoModal && videoModal.classList.contains("is-open")) {
      closeVideoModal();
    }
  });
})();
