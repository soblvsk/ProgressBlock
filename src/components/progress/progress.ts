import classes from './progress.module.css';

class ProgressElement extends HTMLElement {
  #title: string;
  #value: number;
  #animated: boolean;
  #hidden: boolean;

  constructor() {
    super();
    this.#title = 'Progress';
    this.#value = 60;
    this.#animated = false;
    this.#hidden = false;
  }

  static get observedAttributes() {
    return ['title', 'value', 'animated', 'hidden'];
  }

  connectedCallback() {
    this.render();
    this.attachListeners();
    this.update();
  }

  attributeChangedCallback(attrName: string, _oldValue: string | null, newValue: string | null) {
    switch (attrName) {
      case 'title':
        if (newValue) this.#title = newValue;
        break;
      case 'value':
        this.#value = newValue ? Number(newValue) : 0;
        break;
      case 'animated':
        this.#animated = newValue !== null;
        break;
      case 'hidden':
        this.#hidden = newValue !== null;
        break;
    }
  }

  attachListeners() {
    this.addEventListener('input', (e: Event) => this.handleInput(e));
    this.addEventListener('change', (e: Event) => this.handleChange(e));
  }

  handleInput(e: Event) {
    const target = e.target as HTMLInputElement;

    if (target.id === 'value') {
      let value = Number(target.value);

      if (value < 0) {
        value = 0;
      } else if (value > 100) {
        value = 100;
      }

      this.#value = value;
      target.value = String(value);
      this.update();
    }
  }

  handleChange(e: Event) {
    const target = e.target as HTMLInputElement;

    if (target.id === 'animate') {
      this.#animated = target.checked;
    } else if (target.id === 'hide') {
      this.#hidden = target.checked;
    }

    this.update();
  }

  update() {
    const circle = this.querySelector(`.${classes.loader}`) as HTMLElement;
    const progressCircle = this.querySelector(`.${classes.loader__progress}`) as SVGCircleElement;

    if (!circle || !progressCircle) return;

    const radius = progressCircle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    const offset = (circumference * this.#value) / 100;

    progressCircle.style.strokeDasharray = `${offset} ${circumference}`;

    if (this.#animated) {
      progressCircle.classList.add(classes.loader__progress_start);
    } else {
      progressCircle.classList.remove(classes.loader__progress_start);
    }

    circle.style.opacity = this.#hidden ? '0' : '1';
  }

  render() {
    this.classList.add(classes.content);

    this.innerHTML = `
      <h4 class="${classes.title}">${this.#title}</h4>
      <div class="${classes.block}">
        <div class="${classes.loader}">
          <svg class="${classes.loader__svg}">
            <circle class="${classes.loader__circle}" cx="60" cy="60" r="55" />
            <circle class="${classes.loader__progress}" cx="60" cy="60" r="55" />
          </svg>
        </div>
        <div class="${classes.settings}">
          <input-component 
            id="value" 
            type="number" 
            value="${this.#value}" 
            label="Value" 
            min="0" 
            max="100"
          ></input-component>

          <input-component 
            id="animate" 
            type="checkbox" 
            label="Animate" 
            ${this.#animated ? 'checked' : ''}
          ></input-component>

          <input-component 
            id="hide" 
            type="checkbox" 
            label="Hide" 
            ${this.#hidden ? 'checked' : ''}
          ></input-component>
        </div>
      </div>
  `;
  }
}

customElements.define('progress-component', ProgressElement);
