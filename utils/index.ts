export const yup = (tag: string) => (d: any) => {
  // eslint-disable-next-line no-console
  console.log(`${tag}`, d);
  return d;
};

export const nope = (tag: string) => (d: any) => {
  // eslint-disable-next-line no-console
  console.error(`Oh No!! [${tag}]`, d);
  return d;
};
