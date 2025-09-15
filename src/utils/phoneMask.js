export function inputCallback() {
  let input = this.value.replace(/\D/g, '');

  if (input.startsWith('8')) {
    input = '7' + input.slice(1);
  } else if (!input.startsWith('7')) {
    input = '7' + input;
  }

  input = input.substring(0, 11);

  let formatted = '+7';
  if (input.length > 1) {
    formatted += ' (' + input.substring(1, 4);
  }
  if (input.length >= 5) {
    formatted += ') ' + input.substring(4, 7);
  }
  if (input.length >= 8) {
    formatted += '-' + input.substring(7, 9);
  }
  if (input.length >= 10) {
    formatted += '-' + input.substring(9, 11);
  }

  this.value = formatted;
}

export function focusCallback() {
  if (!this.value) {
    this.value = '+7 (';
  }
}

export function blurCallback() {
  if (this.value === '+7 (' || this.value === '+7') {
    this.value = '';
  }
}

export function applyPhoneMaskToInput(phoneInput) {
  if (phoneInput.dataset.maskApplied) return;

  phoneInput.dataset.maskApplied = "true";

  phoneInput.addEventListener('input', inputCallback);
  phoneInput.addEventListener('focus', focusCallback);
  phoneInput.addEventListener('blur', blurCallback);
}

export function applyPhoneMask() {
  const inputs = document.querySelectorAll('input[type="tel"]');
  inputs.forEach(applyPhoneMaskToInput);
}
