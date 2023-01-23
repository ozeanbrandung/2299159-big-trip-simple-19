//import View from '../view';
import {html} from '../../utils';
import RadioGroupView from '../radio-group-view';
import {pointIconsMap} from '../../maps';
import './point-type-view.css';

export default class PointTypeView extends RadioGroupView {
  constructor() {
    super();

    this.classList.add('event__type-wrapper');

    //рядовые обработчики событий можем вешать прям во вьюхах
    //bind не нужен нам все равно типа this здесь будет сохраняться осбытие прям на вьюшке и происходит
    this.addEventListener('change', this.handleChange);
    //У нас уже есть событие keydown которое происходит на документе - оно закрывает форму полностью
    //нам нужно перехватить его всплытие и закрыть открытый дропдаун
    this.addEventListener('keydown', this.handleKeydown);
    //событие blur событие потери фокуса - оно не всплывает! третий аргумент означет что событие мы захватываем!
    this.addEventListener('blur', this.handleBlur, true);
    //событие клик мы не сможем использовать потому что при перемещении с клавиатуры оно оказывается тоже будет срабатывать так что
    //нам придется использовать другое событие
    this.addEventListener('pointerup', this.handlePointerUp);
    this.addEventListener('pointerdown', this.handlePointerDown);
  }

  /**
   * @param {string} value
   */
  setValue(value) {
    //исполняем что делал родительский класс
    super.setValue(value);
    //далее код который будет менять иконку
    //если иконка вообще есть
    if (pointIconsMap[value]) {
      //const src = pointIconsMap[value];
      //const imgElem = this.querySelector('.event__type-icon');
      //imgElem.src = src;
      //более короткая запись:
      /**
       * @type {HTMLImageElement}
       */
      (this.querySelector('.event__type-icon')).src = pointIconsMap[value];
    }
  }

  /**
   * @override
   */
  createHtml() {
    return html`
      <label class="event__type  event__type-btn" for="event-type-toggle-1" tabindex="-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>

<!--          <div class="event__type-item">-->
<!--            <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">-->
<!--            <label class="event__type-label  event__type-label&#45;&#45;taxi" for="event-type-taxi-1">Taxi</label>-->
<!--          </div>-->

<!--          <div class="event__type-item">-->
<!--            <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">-->
<!--            <label class="event__type-label  event__type-label&#45;&#45;bus" for="event-type-bus-1">Bus</label>-->
<!--          </div>-->

<!--          <div class="event__type-item">-->
<!--            <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">-->
<!--            <label class="event__type-label  event__type-label&#45;&#45;train" for="event-type-train-1">Train</label>-->
<!--          </div>-->

<!--          <div class="event__type-item">-->
<!--            <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">-->
<!--            <label class="event__type-label  event__type-label&#45;&#45;ship" for="event-type-ship-1">Ship</label>-->
<!--          </div>-->

<!--          <div class="event__type-item">-->
<!--            <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">-->
<!--            <label class="event__type-label  event__type-label&#45;&#45;drive" for="event-type-drive-1">Drive</label>-->
<!--          </div>-->

<!--          <div class="event__type-item">-->
<!--            <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>-->
<!--            <label class="event__type-label  event__type-label&#45;&#45;flight" for="event-type-flight-1">Flight</label>-->
<!--          </div>-->

<!--          <div class="event__type-item">-->
<!--            <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">-->
<!--            <label class="event__type-label  event__type-label&#45;&#45;check-in" for="event-type-check-in-1">Check-in</label>-->
<!--          </div>-->

<!--          <div class="event__type-item">-->
<!--            <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">-->
<!--            <label class="event__type-label  event__type-label&#45;&#45;sightseeing" for="event-type-sightseeing-1">Sightseeing</label>-->
<!--          </div>-->

<!--          <div class="event__type-item">-->
<!--            <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">-->
<!--            <label class="event__type-label  event__type-label&#45;&#45;restaurant" for="event-type-restaurant-1">Restaurant</label>-->
<!--          </div>-->
        </fieldset>
      </div>
    `;
  }

  /**
   * @param {OptionViewState} state
   */
  createOptionHtml(state) {
    return html`
      <div class="event__type-item">
        <input
          id="event-type-${state.value}-1"
          class="event__type-input  visually-hidden"
          type="radio"
          name="event-type"
          value="${state.value}"
        >
        <label
          class="event__type-label  event__type-label--${state.value}"
          for="event-type-${state.value}-1"
          tabindex="-1"
        >
          ${state.title}
        </label>
      </div>
    `;
  }

  /**
   * @param {OptionViewState[]} states
   */
  setOptions(states) {
    const optionsHtml = states.map(this.createOptionHtml).join('');
    this.querySelector('legend').insertAdjacentHTML('afterend', optionsHtml);
    //this.querySelector('fieldset').insertAdjacentHTML('beforeend', optionsHtml);
  }

  open(){
    /**
     * @type {HTMLInputElement}
     */
    (this.querySelector('.event__type-toggle')).checked = true;

    /**
     * @type {HTMLInputElement}
     */
    (this.querySelector('.event__type-input')).focus();
  }

  close(){
    /**
     * @type {HTMLInputElement}
     */
    (this.querySelector('.event__type-toggle')).checked = false;
  }

  /**
   * @param {Event & {target: HTMLInputElement}} event
   */
  handleChange(event) {
    //эту штуку мы добавили от бага, который возникал при открытии дропдауна - исчезало выделение выбранных оферов
    if(event.target.type === 'checkbox') {
      //любой стоящий в очереди на событие чендж не получит его
      return event.stopImmediatePropagation();
    }
    //debugger
    //this.setValue(this.getValue())
    //TODO: при тапе почему-то кароч не работает вся эта история
    //TODO: change срабатывает прямо при открытии дропдауна - и затем сюда приходит event.target.value === 'on'
    //TODO: а при клике не происходит вообще ничего)))
    this.setValue(event.target.value);
  }

  /**
   * @param {KeyboardEvent} event
   */
  handleKeydown(event) {
    //без квэри селектора (который означает тупа что дропдаун открыт) не закрывается потом вся форма
    if (event.key === 'Escape' && this.querySelector('.event__type-toggle:checked')) {
      // событие по документу скатилось вниз сюда, а мы его всплытие обратно должны остановить
      // (форма как бы родительский компоент и он должен не получить event если у нас открыт этот вьюшник
      event.stopPropagation();
      this.close();
    } else if (event.key === ' ') {
      this.open();
    }
  }

  /**
   * @param {FocusEvent & {relatedTarget: Element}} event
   */
  //вообще этот метод будет отвечать за то что дропдаун будет выключаться на outer click или на перемещение табами за пределы выпадашки
  //target - элемент потерявший блюр, relatedTarget - кандидат на получение блюра (следующий элемент который получит фокус)
  handleBlur(event) {
    //contains - метод который проверяет есть ли у данного элемента или его потомков какой-то элемент в структуре
    if (!this.contains(event.relatedTarget)) {
      this.close();
    }
  }

  //проверяем что пользователь кликнул или тапнул именно по пункту меню а не где-то еще
  handlePointerUp(event) {
    //querySelector делает поиск вниз по дереву, а делает поиск вверх по дереву
    if (event.target.closest('.event__type-item')) {
      //TODO: и еще забавно что без нижней строки change происходит а с нижней нет!
      //this.setValue(event.target.closest('.event__type-item').querySelector('input').value)
      this.close();
    }
  }

  //TODO: добавила потому что выбор в выпадашке с тачпада не работает!
  handlePointerDown(event) {
    const elem = event.target.closest('.event__type-item');
    if (elem) {
      this.setValue(elem.querySelector('input').value);
      //TODO: а еще почему-то change не происходит тут при тапах, а при клике и перемещении с табами происходит
      this.dispatchEvent(new Event('change'));
    }
  }
}

customElements.define(String(PointTypeView), PointTypeView);
