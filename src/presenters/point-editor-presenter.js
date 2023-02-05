import NewPointEditorPresenter from './new-point-editor-presenter';

/**
 * @extends {NewPointEditorPresenter<PointEditorView>}
 */
export default class PointEditorPresenter extends NewPointEditorPresenter {
  constructor() {
    super(...arguments);
  }

  /**
   * @override
   */
  handleNavigation() {
    this.view.close(false);

    if(this.location.pathname === '/edit') {
      const id = this.location.searchParams.get('id');
      const pointData = this.pointsModel.findById(id);

      if (!pointData) {
        throw new Error(`Cannot edit point ${id} (it does not exist)`);
      }

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
      this.view.shake();
    }

    this.view.awaitDelete(false);
  }
}
