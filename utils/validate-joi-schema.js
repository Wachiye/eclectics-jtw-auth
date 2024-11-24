export const validateJoiSChema = (data, schema, options) => {
  const { error, value } = schema.validate(data, {
    ...options,
    abortEarly: false,
  });
  if (error) {
    throw new Error(error.details[0]?.message);
  }
  return value;
};
