let highestZ = 1;

class Paper {
  holdingPaper = false;
  mouseX = 0;
  mouseY = 0;
  prevMouseX = 0;
  prevMouseY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;

  init(paper) {

    /* ===================== */
    /* DESKTOP (MOUSE) */
    /* ===================== */
    document.addEventListener("mousemove", (e) => {
      if (!this.holdingPaper) return;

      this.mouseX = e.clientX;
      this.mouseY = e.clientY;

      this.velX = this.mouseX - this.prevMouseX;
      this.velY = this.mouseY - this.prevMouseY;

      this.currentPaperX += this.velX;
      this.currentPaperY += this.velY;

      this.prevMouseX = this.mouseX;
      this.prevMouseY = this.mouseY;

      paper.style.transform =
        `translate(${this.currentPaperX}px, ${this.currentPaperY}px) rotate(${this.rotation}deg)`;
    });

    paper.addEventListener("mousedown", (e) => {
      this.holdingPaper = true;
      paper.style.zIndex = highestZ++;
      this.prevMouseX = e.clientX;
      this.prevMouseY = e.clientY;
    });

    window.addEventListener("mouseup", () => {
      this.holdingPaper = false;
    });

    /* ===================== */
    /* MOBILE (TOUCH) */
    /* ===================== */
    paper.addEventListener("touchstart", (e) => {
      this.holdingPaper = true;
      paper.style.zIndex = highestZ++;

      const touch = e.touches[0];
      this.prevMouseX = touch.clientX;
      this.prevMouseY = touch.clientY;
    }, { passive: true });

    paper.addEventListener("touchmove", (e) => {
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
    }, { passive: true });

    paper.addEventListener("touchend", () => {
      this.holdingPaper = false;
    });
  }
}
