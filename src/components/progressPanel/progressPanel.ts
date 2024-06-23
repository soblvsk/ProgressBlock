import classes from './progressPanel.module.css';

class ProgressPanel extends HTMLElement {
  #loader: HTMLElement | null;

  constructor() {
    super();
    this.#loader = null;
  }

  connectedCallback() {
    this.#loader = document.querySelector('progress-component');

    if (!this.#loader) {
      this.logLoaderError();
    }

    this.render();
    this.attachListeners();
  }

  attachListeners() {
    this.addEventListener('input', (e: Event) => this.handleChange(e));
  }

  handleChange(e: Event) {
    if (!this.#loader) {
      this.logLoaderError();
      return;
    }

    const target = e.target as HTMLInputElement;

    switch (target.id) {
      case 'value':
        this.updateValue(target);
        break;
      case 'animate':
        this.#loader.toggleAttribute('animated', target.checked);
        break;
      case 'hide':
        this.#loader.toggleAttribute('hide', target.checked);
        break;
    }
  }

  updateValue(target: HTMLInputElement) {
    let value = Number(target.value);

    if (value < 0) {
      value = 0;
    } else if (value > 100) {
      value = 100;
    }

    this.#loader!.setAttribute('value', String(value));
    target.value = String(value);
  }

  logLoaderError() {
    return console.error('Component "progress-component" not found');
  }

  render() {
    this.classList.add(classes.controls);

    const value = this.#loader?.getAttribute('value') || '60';
    const animated = this.#loader?.hasAttribute('animated') ? 'checked' : '';
    const hide = this.#loader?.hasAttribute('hide') ? 'checked' : '';

    this.innerHTML = `
      <input-component 
        id="value" 
        type="number" 
        value="${value}" 
        label="Value" 
        min="0" 
        max="100"
      ></input-component>

      <input-component 
        id="animate" 
        type="checkbox" 
        label="Animate"
        ${animated}
      ></input-component>

      <input-component 
        id="hide" 
        type="checkbox" 
        label="Hide"
        ${hide}
      ></input-component>
    `;
  }
}

customElements.define('progress-panel-component', ProgressPanel);
