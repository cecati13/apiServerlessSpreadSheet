export function hideCharactersPhone(phone) {
  const large = phone.length;
  const firstPart = phone[0];
  const penultimatePart = phone[large - 2];
  const lastPart = phone[large - 1];
  let arrayPhone = [firstPart];

  let cycle = large - 3;
  let pair = true;
  while (cycle != 0) {
    arrayPhone.push("*");
    if (pair) {
      arrayPhone.push(" ");
    }
    pair = !pair;
    cycle--;
  }
  arrayPhone.push(penultimatePart);
  arrayPhone.push(lastPart);
  const assamblePhone = arrayPhone.toString().replace(/,/g, "");
  return assamblePhone;
}

export function hideCharactersEmail(email) {
  const arrPartsEmail = email.split("@");
  const firstPart = arrPartsEmail[0];
  const large = firstPart.length;
  let arrayAssambleFirstPart = [firstPart[0]];
  const lastPart = firstPart[large - 1];

  let cycle = large - 2;
  while (cycle != 0) {
    arrayAssambleFirstPart.push("*");
    cycle--;
  }
  arrayAssambleFirstPart.push(lastPart);
  const assambleFirstPart = arrayAssambleFirstPart.toString().replace(/,/g, "");
  const assambleEmail = assambleFirstPart + "@" + arrPartsEmail[1];
  return assambleEmail;
}

export function areHideCharacters(obj) {
  const result = { ...obj };
  if (result.telefono.includes("*")) {
    delete result.telefono;
  }
  if (result.email.includes("*")) {
    delete result.email;
  }
  return result;
}
