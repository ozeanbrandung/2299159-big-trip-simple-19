import View from './view';

export default class RadioGroupView extends View {
  constructor() {
    super();

    //this.classList.add('');
  }

  /**
   * @param {string} value //value input-а
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
    //TODO: если не взять в скобки this.querySelectorAll('[type="radio"]') то почему-то не работает
    (this.querySelectorAll('[type="radio"]')).forEach((view, index) => {
      view.disabled = flags[index];
      //console.log(flags[index])
    });
  }
}

customElements.define(String(RadioGroupView), RadioGroupView);
