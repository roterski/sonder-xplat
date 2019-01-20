import * as _ from 'lodash';

export const parseValidationErrors = (error) => {
  let errors = _.get(error, 'graphQLErrors[0].message.message');
  if (errors) {
    errors = errors.reduce((acc, err) => {
      acc[err.property] = Object.values(err.constraints).join(', ');
      return acc;
    }, {});
  }
  return errors;
};
