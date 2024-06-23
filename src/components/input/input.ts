import classes from './input.module.css';

class InputElement extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['id', 'type', 'label'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(_attrName: string, oldValue: string | null, newValue: string | null) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    this.classList.add(classes.block);

    const id = this.getAttribute('id') || '';
    const type = this.getAttribute('type') || 'text';
    const label = this.getAttribute('label') || '';

    const inputTag = document.createElement('input');
    const labelTag = document.createElement('label');

    inputTag.id = id;
    inputTag.type = type;
    inputTag.ariaLabel = label;
    inputTag.classList.add(classes.input);

    labelTag.setAttribute('for', id);
    labelTag.textContent = label;
    labelTag.classList.add(classes.label);

    const excludedAttributes = ['id', 'type', 'label', 'class'];
    const validInputAttributes = Object.keys(HTMLInputElement.prototype);

    this.getAttributeNames().forEach((attr) => {
      if (!excludedAttributes.includes(attr)) {
        const valueAttr = this.getAttribute(attr);
        if (valueAttr !== null) {
          if (validInputAttributes.includes(attr)) {
            inputTag.setAttribute(attr, valueAttr);
          } else {
            console.error(`Attribute "${attr}" is not a valid attribute of InputElement.`);
          }
        }
      }
    });

    this.innerHTML = '';
    this.appendChild(inputTag);
    this.appendChild(labelTag);
  }
}

customElements.define('input-component', InputElement);
