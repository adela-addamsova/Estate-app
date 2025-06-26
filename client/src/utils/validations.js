/* Validations of forms 2nd step */
function isValidFullName(fullName) {
  return /\b\w+\b\s+\b\w+\b/.test(fullName.trim());
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidCzechPhone(phone) {
  const czechPhoneRegex = /^(601|602|603|604|605|606|607|608|609|702|72[0-9]|73[0-9]|77[0-9]|79[0-9])\d{6}$/;
  return czechPhoneRegex.test(phone);
}

export function validateStep2(form) {
  const newErrors = {};

  if (!isValidFullName(form.fullName)) {
    newErrors.fullName = 'Zadejte prosím celé jméno.';
  }

  if (!isValidEmail(form.email)) {
    newErrors.email = 'Zadejte prosím validní emailovou adresu.';
  }

  if (!isValidCzechPhone(form.phone)) {
    newErrors.phone = 'Zadejte prosím validní telefonní číslo.';
  }

  return newErrors;
}
