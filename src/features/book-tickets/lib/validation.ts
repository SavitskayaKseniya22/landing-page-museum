export function isValidPhoneNumber(value: string) {
  const phone = value.trim();
  return /^\+?[\d ().-]{7,20}$/.test(phone) && phone.replace(/\D/g, "").length >= 7;
}

export function isValidCardNumber(value: string) {
  if (!/^[\d -]+$/.test(value)) return false;
  const digits = value.replace(/[ -]/g, "");
  if (!/^\d{13,19}$/.test(digits) || /^0+$/.test(digits)) return false;
  let sum = 0;
  for (let index = digits.length - 1; index >= 0; index -= 1) {
    let digit = Number(digits[index]);
    if ((digits.length - 1 - index) % 2 === 1) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }
  return sum % 10 === 0;
}

export function isValidExpiry(month: string, year: string, now = new Date()) {
  if (!/^(0?[1-9]|1[0-2])$/.test(month) || !/^\d{4}$/.test(year)) return false;
  return (
    Number(year) > now.getFullYear() || (Number(year) === now.getFullYear() && Number(month) >= now.getMonth() + 1)
  );
}
