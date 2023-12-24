export function validUsername(str: string) {
  const regex = /[^A-Za-z0-9]/;
  return !regex.test(str);
}
