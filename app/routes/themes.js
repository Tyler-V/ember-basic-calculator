import {
  set
} from '@ember/object';
import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.store.findAll('theme');
  },

  setupController(controller, model) {
    set(controller, 'themes', model);
  },
});
