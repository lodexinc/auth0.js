function attribute(o, attr, type, text) {
  if (o && typeof o[attr] !== type) {
    throw new Error(text);
  }
}

function variable(o, type, text) {
  if (typeof o !== type) {
    throw new Error(text);
  }
}

function value(o, values, text) {
  if (values.indexOf(o) === -1) {
    throw new Error(text);
  }
}

function check(o, config, attributes) {
  if (!config.optional || o) {
    variable(o, config.type, config.message);
  }
  if (config.type === 'object' && attributes) {
    Object.keys(attributes).forEach(function (a) { // eslint-disable-line
      if (!attributes[a].optional || o[a]) {
        if (!attributes[a].condition || attributes[a].condition(o)) {
          attribute(o, a, attributes[a].type, attributes[a].message);
          if (attributes[a].values) {
            value(o[a], attributes[a].values, attributes[a].value_message);
          }
        }
      }
    });
  }
}

module.exports = {
  check: check,
  attribute: attribute,
  variable: variable,
  value: value
};