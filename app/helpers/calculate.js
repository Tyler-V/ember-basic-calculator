import {
  helper
} from '@ember/component/helper';

export function calculate([text]) {
  const ADD = '+';
  const SUBTRACT = '−';
  const MULTIPLY = '×';
  const DIVIDE = '÷';
  const numberRegex = '(\\d*\\.?\\d+)';

  let canCalculate = (text, regex) => {
    return new RegExp(`${numberRegex}\\s([${regex}])\\s${numberRegex}`).test(text);
  }

  if (!canCalculate(text, `${ADD}|${SUBTRACT}|${MULTIPLY}|${DIVIDE}`))
    return '';

  let calculate = (text, regex) => {
    let match = text.match(new RegExp(`${numberRegex}\\s([${regex}])\\s${numberRegex}`));
    if (!match)
      return text;

    const operation = match[0];
    const firstValue = Number(match[1]);
    const operator = match[2];
    const secondValue = Number(match[3]);

    let computation;
    if (operator === ADD) {
      computation = firstValue + secondValue;
    } else if (operator === SUBTRACT) {
      computation = firstValue - secondValue;
    } else if (operator === MULTIPLY) {
      computation = firstValue * secondValue;
    } else if (operator === DIVIDE) {
      computation = firstValue / secondValue;
    }

    return text.replace(operation, computation);
  }

  while (canCalculate(text, `${MULTIPLY}|${DIVIDE}`)) {
    text = calculate(text, `${MULTIPLY}|${DIVIDE}`);
  }

  while (canCalculate(text, `${ADD}|${SUBTRACT}`)) {
    text = calculate(text, `${ADD}|${SUBTRACT}`);
  }

  return parseFloat(text);
}

export default helper(calculate);
