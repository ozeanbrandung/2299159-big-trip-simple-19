import View from './view';

export default class RadioGroupView extends View {
  constructor() {
    super();
  }

  /**
   * @param {string} value
   */
  setValue(value) {
    /**
     * @type {HTMLInputElement}
     */
    const view = this.querySelector(`[value="${value}"]`);

    if (view) {
      view.checked = true;
    }
  }

  getValue() {
    const selected = this.querySelector('[type="radio"]:checked');
    if (selected) {
      return selected.value;
    }
    return '';
  }

  /**
   * @param {boolean[]} flags
   */
  setDisability(flags) {
    /**
     * @type {NodeListOf<HTMLInputElement>}
     */
    (this.querySelectorAll('[type="radio"]')).forEach((view, index) => {
      view.disabled = flags[index];
    });
  }
}

customElements.define(String(RadioGroupView), RadioGroupView);
