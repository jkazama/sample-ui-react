export const formatAmount = (v: string): string => {
  if (v) {
    return v.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  } else if (v === "0") {
    return "0";
  } else {
    return "";
  }
};
