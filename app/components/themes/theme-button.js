import Component from '@ember/component';
import {
  inject as service
} from '@ember/service';

export default Component.extend({
  router: service(),
  themes: service(),

  actions: {
    changeTheme() {
      this.themes.change(this.get('theme'));
      this.router.transitionTo('calculator');
    }
  }
});
