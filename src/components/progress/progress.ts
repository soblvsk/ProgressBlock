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

  updateProgressCircle(element: SVGCircleElement) {
    const radius = element.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    const offset = (circumference * this.#value) / 100;

    element.style.setProperty('stroke-dasharray', `${offset} ${circumference}`);
  }

  updateAnimation(element: SVGCircleElement) {
    this.setStyle(element, 'animation-play-state', this.#animated ? 'running' : null);
  }

  updateVisibility(element: SVGElement) {
    this.setStyle(element, 'opacity', this.#hide ? '0' : null);
  }

  setStyle(element: Element & { style: CSSStyleDeclaration }, styleName: string, value: string | null) {
    if (value !== null) {
      element.style.setProperty(styleName, value);
    } else {
      element.style.removeProperty(styleName);
    }
  }

  render() {
    this.classList.add(classes.loader);

    this.innerHTML = `
      <svg class="${classes.loader__svg}">
        <circle class="${classes.loader__circle}" cx="60" cy="60" r="55" />
        <circle class="${classes.loader__progress}" cx="60" cy="60" r="55" />
      </svg>
    `;
  }
}

customElements.define('progress-component', ProgressElement);
