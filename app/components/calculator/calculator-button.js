import Component from '@ember/component';

export default Component.extend({
  actions: {
    click() {
      this.get('update')(this.get('value'));
    }
  }
});
