export function parseValidationErrors(errors: any): { [key: string]: string } {
  return errors.reduce((acc, err) => {
    acc[err.property] = Object.values(err.constraints).join(', ');
    return acc;
  }, {})
};
