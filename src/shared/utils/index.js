import _ from "lodash";

/**
 * Find index by only comparing the value of the element and not type
 *
 * @param arary arrary of string or numbers
 * @param value string | number
 */
export const looseIndexOf = (arary, value) => {
  const newArr = _.map(arary, (a) => a.toString());
  const valueStr = value.toString();
  return newArr.indexOf(valueStr);
};

export const index = () => {};
