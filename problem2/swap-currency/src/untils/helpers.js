export const parseErrorResponse = ({ data }) => {
  if (!data || !data?.errors) {
    return null;
  }
  const errors = data?.errors;
  return Object.entries(errors).reduce((carry, [key, value]) => {
    const error = key
      .split(".")
      .reverse()
      .reduce((ca, cu) => ({ [cu]: ca }), value.join(", "));

    return {
      ...carry,
      ...error,
    };
  }, {});
};
