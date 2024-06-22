import classes from './progress.module.css';

class ProgressElement extends HTMLElement {
  #value: number;
  #animated: boolean;
  #hide: boolean;

  constructor() {
    super();
    this.#value = 60;
    this.#animated = false;
    this.#hide = false;
  }

  static get observedAttributes() {
    return ['value', 'animated', 'hide'];
  }

  connectedCallback() {
    this.render();
    this.update();
  }

  attributeChangedCallback(attrName: string, _oldValue: string | null, newValue: string | null) {
    switch (attrName) {
      case 'value':
        this.#value = newValue !== null ? Number(newValue) : 0;
        break;
      case 'animated':
        this.#animated = newValue !== null;
        break;
      case 'hide':
        this.#hide = newValue !== null;
        break;
    }

    this.update();
  }

  update() {
    const svgCircle = this.querySelector(`.${classes.loader__svg}`) as SVGElement;
    const progressCircle = this.querySelector(`.${classes.loader__progress}`) as SVGCircleElement;

    if (!svgCircle || !progressCircle) return;

    this.updateProgressCircle(progressCircle);
    this.updateAnimation(progressCircle);
    this.updateVisibility(svgCircle);
  }

  updateProgressCircle(progressCircle: SVGCircleElement) {
    const radius = progressCircle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    const offset = (circumference * this.#value) / 100;

    progressCircle.style.strokeDasharray = `${offset} ${circumference}`;
  }

  updateAnimation(progressCircle: SVGCircleElement) {
    if (this.#animated) {
      progressCircle.classList.add(classes.loader__progress_start);
    } else {
      progressCircle.classList.remove(classes.loader__progress_start);
    }
  }

  updateVisibility(svgCircle: SVGElement) {
    svgCircle.style.opacity = this.#hide ? '0' : '1';
  }

  render() {
    this.classList.add(classes.loader);

    this.innerHTML = `
      <svg class="${classes.loader__svg}">
        <circle class="${classes.loader__circle}" cx="60" cy="60" r="55" />
        <circle class="${classes.loader__progress}" cx="60" cy="60" r="55" />
      </svg>
    </div>
  `;
  }
}

customElements.define('progress-component', ProgressElement);
