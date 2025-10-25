import Constants from "./Constants";

export const convertNumberToString = (
  value,
  isRounded = true,
  delimiter = ".",
  decimalDelimiter = ","
) => {
  if (typeof value === "string") {
    return value;
  }
  if (value || value === 0) {
    const valueConverted = isRounded ? Math.round(value) : value;
    return valueConverted
      ?.toString()
      ?.replace(".", decimalDelimiter)
      ?.replace(Constants.REGEX.formatMoney, delimiter);
  }
  return "0";
};
export const convert123 = (n) => {
  return n.toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, "$1.");
};
export const convertStringToNumber = (value) => {
  try {
    if (value) {
      return Number.parseInt(value.replace(/(\.|,)/g, ""), 10);
    }
    return 0;
  } catch (error) {
    return 0;
  }
};
export function formatCash(stringMoney) {
  const delimiter = ",";
  if (stringMoney.length !== 0) {
    return stringMoney
      .split("")
      .reverse()
      .reduce(
        (prev, next, index) => (index % 3 ? next : `${next}${delimiter}`) + prev
      );
  }
  return null;
}

export const convertStringMoneyToNumber = (value) => {
  try {
    if (value) {
      return Number.parseInt(value.toString().replace(/\,/g, ""), 10);
    }
    return 0;
  } catch (error) {
    return 0;
  }
};
