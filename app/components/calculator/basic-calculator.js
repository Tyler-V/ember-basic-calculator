import Component from '@ember/component';
import {
  inject as service
} from '@ember/service';
import {
  calculate
} from '../../helpers/calculate';

export default Component.extend({
  router: service(),
  themes: service(),
  operators: service(),

  operation: '',
  result: '',

  actions: {
    update(value) {
      let operation = this.get('operation');
      let result = this.get('result');
      if (value === this.operators.ADD || value === this.operators.SUBTRACT ||
        value === this.operators.MULTIPLY || value === this.operators.DIVIDE) {
        if (!operation || operation.charAt(operation.length - 1) == ' ')
          return;
        if (result)
          operation = result;
        operation += ' ' + value + ' ';
      } else {
        if (result) {
          operation = '';
        } else {
          if (value === '.') {
            const split = operation.split(' ');
            if (split && split[split.length - 1].indexOf('.') >= 0)
              return;
          }
          if (value === '0') {
            if (operation[operation.length - 1] === '0')
              return;
          }
        }
        if (operation && operation[operation.length - 1] === '0') {
          if ((operation.length == 1) || (operation.length > 1 && operation[operation.length - 2] === ' '))
            operation = operation.slice(0, -1);
        }
        operation += value;
      }
      this.set('result', '');
      this.set('operation', operation);
    },

    back() {
      let result = this.get('result');
      let operation = this.get('operation');
      if (result || !operation)
        return;
      if (isNaN(parseInt(operation.charAt(operation.length - 1))) &&
        operation.charAt(operation.length - 1) !== '.') {
        operation = operation.slice(0, -3);
      } else {
        operation = operation.slice(0, -1);
      }
      this.set('operation', operation);
    },

    clear() {
      this.set('operation', '');
      this.set('result', '');
    },

    calculate() {
      const operation = this.get('operation');
      this.set('result', calculate([operation]));
    },

    routeToThemes() {
      this.router.transitionTo('themes');
    }
  }
});
