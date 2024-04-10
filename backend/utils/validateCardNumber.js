function validateCardNumber(number) {
  const noSpaces = number.replace(/\D/g, '');
  let sum = 0;
  let shouldDouble = false;

  for (let i = noSpaces.length - 1; i >= 0; i--) {
    let digit = parseInt(noSpaces.charAt(i));

    if (shouldDouble) {
      if ((digit *= 2) > 9) digit -= 9;
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return (sum % 10) === 0;
}
module.exports = validateCardNumber; 
// Visa: 4111 1111 1111 1111
// MasterCard: 5555 5555 5555 4444
// American Express (Amex): 3782 822463 10005
// Discover: 6011 1111 1111 1117