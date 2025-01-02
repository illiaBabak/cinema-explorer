type ObjType = {
  [key: string]: string;
};

export const getKeyByValue = (object: ObjType, value: string): string | undefined =>
  Object.keys(object).find((key) => object[key] === value);
