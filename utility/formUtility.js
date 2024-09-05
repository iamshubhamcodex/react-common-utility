export const numberAccepter = (value) => {
  const strValue = value.toString();

  if (!isNaN(value) && strValue.indexOf(".") === -1 && strValue.length === 10) {
    return +value;
  }

  return typeof value === "string" && strValue.replace(/[^0-9]/g, "");
};
