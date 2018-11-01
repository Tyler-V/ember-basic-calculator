import Service from '@ember/service';
import {
  inject as service
} from '@ember/service';

export default Service.extend({
  store: service(),
  current: null,

  init() {
    this._super(...arguments);
    this.store.findAll('theme').then(themes => {
      const random = Math.floor(Math.random() * Math.floor(themes.get('length')));
      this.set('current', themes.objectAt(random));
    });
  },

  change(theme) {
    this.set('current', theme);
  },
});
