import Component from '@ember/component';
import {
  inject as service
} from '@ember/service';

export default Component.extend({
  router: service(),
  themes: service(),
  text: '',

  actions: {
    clear() {
      this.set('text', '');
    },
    update(value) {
      let text = this.get('text');
      text += value;
      this.set('text', text);
    },
    changeTheme() {
      this.router.transitionTo('themes');
    }
  }
});
