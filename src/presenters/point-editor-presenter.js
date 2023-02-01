import NewPointEditorPresenter from './new-point-editor-presenter';

/**
 * @extends {NewPointEditorPresenter<PointEditorView>}
 */
export default class PointEditorPresenter extends NewPointEditorPresenter {
  constructor() {
    super(...arguments);
    //console.log(this)
  }

  //перезапишем handleNavigation родительский
  /**
   * @override
   */
  handleNavigation() {
    //без всяких условий сразу вызываем close
    //потому что может быть открыт только один редактор
    //так что если что-то уже открыто, то мы все закрываем
    this.view.close(false);

    if(this.location.pathname === '/edit') {
      //this.location возврашает url obj
      //console.log(this.location)
      const id = this.location.searchParams.get('id');
      const pointData = this.pointsModel.findById(id);

      //радактору тоже присваиваем point id
      this.view.dataset.id = id;
      this.view.open();
      this.updateView(pointData);
    }
  }

  /**
   * @override
   */
  async save(point) {
    point.id = this.view.dataset.id;
    await this.pointsModel.update(point);
  }

  //TODO: у кнопки удалить тоже стоит type=reset и по удалении тоже событие reset автоматически посылается
  /**
   * @override
   * @param {Event} event
   */
  async handleViewReset(event) {
    event.preventDefault();
    this.view.awaitDelete(true);
    try {
      const pointId = this.view.dataset.id;
      await this.pointsModel.delete(pointId);
      this.view.close();
    }
    catch (exception) {
      this.view.uiBlockerView.shake();
      // eslint-disable-next-line no-console
      console.log(exception);
    }

    this.view.awaitDelete(false);
  }
}

//customElements.define(String(PointEditorPresenter), PointEditorPresenter);
