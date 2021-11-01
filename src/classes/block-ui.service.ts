export class BlockUIService {
  private static _instance: BlockUIService;
  private $overlay: HTMLDivElement = this.createLoadScreen();

  private constructor() {}

  public static get instance(): BlockUIService {
    const hasInstance = !!BlockUIService._instance;
    return !hasInstance
      ? (BlockUIService._instance = new BlockUIService())
      : BlockUIService._instance;
  }

  createLoadScreen(): HTMLDivElement {
    const $styles = document.createElement("style");
    $styles.textContent = `
      .loading-overlay {
        display: flex;
        z-index: 99999;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, .6);
        justify-content: center;
        align-items: center;
        color: white;
        font-size: 40px;
    } 
      `;

    const $loadingOverlay = document.createElement("div");
    $loadingOverlay.classList.add("loading-overlay");
    $loadingOverlay.textContent = "loading...";
    $loadingOverlay.appendChild($styles);

    document.body.appendChild($loadingOverlay);
    return $loadingOverlay;
  }

  show(): void {
    this.$overlay.style.display = "flex";
  }

  hide(): void {
    window.scrollTo(0, 0);
    this.$overlay.style.display = "none";
  }
}
