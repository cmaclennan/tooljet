import { is, assert, object, number, string, array, any } from 'superstruct';
import _ from 'lodash';

const generateSchemaFromValidationDefinition = (definition) => {
  let schema;

  switch (definition.type) {
    case 'string': {
      schema = string();
      break;
    }
    case 'number': {
      schema = number();
      break;
    }
    case 'array': {
      const elementSchema = generateSchemaFromValidationDefinition(definition.element ?? {});
      schema = array(elementSchema);
      break;
    }
    case 'object': {
      const obJectSchema = Object.fromEntries(
        Object.entries(definition.object ?? {}).map(([key, value]) => {
          const generatedSchema = generateSchemaFromValidationDefinition(value);
          return [key, generatedSchema];
        })
      );
      schema = object(obJectSchema);
      break;
    }
    default:
      schema = any();
  }

  return schema;
};

const validate = (value, schema) => {
  const valid = is(value, schema);
  const errors = [];
  if (!valid) {
    try {
      assert(value, schema);
    } catch (structError) {
      errors.push(structError.message);
    }
  }
  return [valid, errors];
};

export const validateProperties = (resolvedProperties, propertyDefinitions) => {
  return Object.entries(resolvedProperties).map(([propertyName, value]) => {
    const validationDefinition = propertyDefinitions[propertyName]?.validation ?? {};
    const schema = generateSchemaFromValidationDefinition(validationDefinition);
    const [valid, errors] = validate(value, schema);
    return { propertyName, valid, errors };
  });
};
