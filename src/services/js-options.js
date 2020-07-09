const ALL = {
  title: 'all annotations',
  value: 'all',
  key: 'all',
};

const TARS = {
  title: 'tars',
  value: 'tars',
  key: 'tars',
};
const STRUCT = {
  title: 'struct',
  value: 'struct',
  key: 'struct',
};

const JSON = {
  title: 'json',
  value: 'json',
  key: 'json',
};

const DB = {
  title: 'db',
  value: 'db',
  key: 'db',
};

const YAML = {
  title: 'yaml',
  value: 'yaml',
  key: 'yaml',
};

const Config = {
  title: 'config',
  value: 'config',
  key: 'config',
};

const Nested = {
  title: 'nested',
  value: 'nested',
  key: 'nested',
};

function isNested(select) {
  return select.includes('nested');
}

class Options {
  static data = {

    struct: {
      key: 'struct'
    },
    json: {
      key: 'json'
    },
    tars: {
      key: 'tars'
    },
    db: {
      key: 'db',
      isSnake: true
    },
    yaml: {
      key: 'yaml'
    }
  };

  static getTags(names) {
    return names.filter(value => Options.data[value]).map(value => Options.data[value]);
  }

  static getOption(list, select) {
    let tags = Options.getTags(select && select[0] === 'all' ?
      list.map(value => value.key) : select);
    return {
      tags,
      nested: isNested(select),
    };
  }
}

export { ALL, JSON, DB, YAML, STRUCT, TARS, Options, Config, Nested, isNested };
