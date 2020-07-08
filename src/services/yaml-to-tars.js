import yaml from 'js-yaml';
import jsToGo from './js-to-tars';

function yamlToTars(json, typename, options) {
  if (json.trim() === '') {
    return {
      go: '',
    };
  }
  let data;
  try {
    data = yaml.load(json);
  } catch (e) {
    return {
      go: '',
      error: e.message
    };
  }
  return jsToGo(data, typename, options);
}

export default yamlToTars;
