export function findInputError(errors, name) {
  console.log(errors);
  const filtered = Object.keys(errors)
    .filter((key) => {
      return key === name;
    })
    .reduce((cur, key) => {
      return Object.assign(cur, { error: errors[key] });
    }, {});
  return filtered;
}
