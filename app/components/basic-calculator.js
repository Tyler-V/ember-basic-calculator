import Component from '@ember/component';

export default Component.extend({
  text: '',

  actions: {
    clear() {
      this.set('text', '');
    },
    update(value) {
      let text = this.get('text');
      text += value;
      this.set('text', text);
    }
  }
});
