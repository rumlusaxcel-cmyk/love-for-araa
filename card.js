let highestZ = 1;

class Paper {
  holdingPaper = false;
  mouseTouchX = 0;
  mouseTouchY = 0;
  mouseX = 0;
  mouseY = 0;
  prevMouseX = 0;
  prevMouseY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  init(paper) {

    /* ===================== */
    /* MOUSE MOVE (DESKTOP) */
    /* ===================== */
    document.addEventListener("mousemove", (e) => {
      if (!this.holdingPaper) return;

      this.mouseX = e.clientX;
      this.mouseY = e.clientY;

      if (!this.rotating) {
        this.velX = this.mouseX - this.prevMouseX;
        this.velY = this.mouseY - this.prevMouseY;
        this.currentPaperX += this.velX;
        this.currentPaperY += this.velY;
      }

      this.prevMouseX = this.mouseX;
      this.prevMouseY = this.mouseY;

      paper.style.transform =
        `translate(${this.currentPaperX}px, ${this.currentPaperY}px) rotate(${this.rotation}deg)`;
    });

    paper.addEventListener("mousedown", (e) => {
      if (this.holdingPaper) return;
      this.holdingPaper = true;
      paper.style.zIndex = highestZ++;

      this.prevMouseX = e.clientX;
      this.prevMouseY = e.clientY;

      if (e.button === 2) this.rotating = true;
    });

    window.addEventListener("mouseup", () => {
      this.holdingPaper = false;
      this.rotating = false;
    });

    /* ===================== */
    /* TOUCH SUPPORT (HP) */
    /* ===================== */
    paper.addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.holdingPaper = true;
      paper.style.zIndex = highestZ++;

      const touch = e.touches[0];
      this.prevMouseX = touch.clientX;
      this.prevMouseY = touch.clientY;
    }, { passive: false });

    document.addEventListener("touchmove", (e) => {
      if (!this.holdingPaper) return;

      const touch = e.touches[0];
      this.mouseX = touch.clientX;
      this.mouseY = touch.clientY;

      this.velX = this.mouseX - this.prevMouseX;
      this.velY = this.mouseY - this.prevMouseY;

      this.currentPaperX += this.velX;
      this.currentPaperY += this.velY;

      this.prevMouseX = this.mouseX;
      this.prevMouseY = this.mouseY;

      paper.style.transform =
        `translate(${this.currentPaperX}px, ${this.currentPaperY}px) rotate(${this.rotation}deg)`;
    }, { passive: false });

    window.addEventListener("touchend", () => {
      this.holdingPaper = false;
      this.rotating = false;
    });
  }
}

/* ===================== */
/* INIT */
/* ===================== */
const papers = document.querySelectorAll(".paper");
papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});

/* ===================== */
/* FIX TOUCH BLOCKING */
/* ===================== */

#blurLayer,
#rotateNotice {
  pointer-events: none;
}

/* Aktifkan sentuhan hanya saat tampil */
#blurLayer.active,
#rotateNotice.active {
  pointer-events: auto;
}
