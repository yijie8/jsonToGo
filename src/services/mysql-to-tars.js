import Parser from 'sql-ddl-to-json-schema';
import { buildin as go, format } from './golang';
import { buildin as sql } from './mysql';

// DDL Example
// const statement = `
// CREATE TABLE users (
//   id integer(11) NOT NULL AUTO_INCREMENT COMMENT 'id主键',
//   nickname longtext NOT NULL,
//   deleted_at TIMESTAMP NULL,
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
//   updated_at TIMESTAMP,
//   PRIMARY KEY (id)
// ) ENGINE MyISAM COMMENT 'All system users';
//
// ALTER TABLE users ADD UNIQUE KEY unq_nick (nickname);
//
// CREATE TABLE test (
//   id INT(11) NOT NULL AUTO_INCREMENT,
//   PRIMARY KEY (id)
// ) ENGINE MyISAM COMMENT 'All system users';
// `;

function mysqlToGo(statement, typename, options) {
  if (statement.trim() === '') {
    return {
      go: '',
    };
  }
  let data;
  try {
    let parser2 = new Parser('mysql');
    parser2.feed(statement);
    data = parser2.toCompactJson();
  } catch (e) {
    return {
      go: '',
      error: e
    };
  }
  return {
    go: data.map(d => mysqlToGo0(d, options)).join('\n\n'),
  };
}

function mysqlToGo0(data, options) {
  let goStr = '';

  const {name, columns} = data;

  let schemaOptions = data.options;
  if (schemaOptions && 'comment' in schemaOptions) {
    comment('Comment: ' + schemaOptions.comment);
    line();
  }

  append(`${go.type} ${format(name)} ${go.struct} {`);
  line();

  // compute length
  let lengthRecord = {
    nameLength: 0,
    typeLength: 0
  };
  let offset = 0;
  let lengthRecorder = [];
  for (let c of columns) {
    const {name, type, options} = c;
    if (options.comment || options.default) {
      for (let i = 0; i < offset; i++) {
        lengthRecorder.push({...lengthRecord});
      }
      lengthRecord = {
        nameLength: 0,
        typeLength: 0
      };
      offset = 0;
    }
    let n = format(name);
    let t = parseDataType(type.datatype);
    if (lengthRecord.nameLength < n.length) {
      lengthRecord.nameLength = n.length;
    }

    if (lengthRecord.typeLength < t.length) {
      lengthRecord.typeLength = t.length;
    }
    offset++;
  }
  for (let i = 0; i < offset; i++) {
    lengthRecorder.push({...lengthRecord});
  }

  // gen
  for (let i = 0; i < columns.length; i++) {
    parseColumn(columns[i], i);
    line();
  }
  append('}');

  function parseColumn(column, index) {
    const {name, type, options} = column;
    tab();
    if (options.comment) {
      comment("Comment: " + options.comment);
      line();
      tab();
    }
    if (options.default) {
      comment("Default: " + options.default);
      line();
      tab();
    }
    let camelName = format(name);
    append(camelName, lengthRecorder[index].nameLength);
    append(' ');
    if (options.nullable) {
      append('*');
    }
    append(parseDataType(type.datatype), lengthRecorder[index].typeLength);

    tag(name);
  }

  function append(str, length) {
    goStr += str;
    if (length) {
      goStr += ' '.repeat(length - str.length);
    }
  }

  function tab() {
    append('\t')
  }

  function line() {
    append('\n')
  }

  function comment(v) {
    append(`// ${v}`)
  }

  function tag(keyName) {
    if (!options || !options.tags || options.tags.length === 0) {
      return
    }
    append(' `');
    let tagResult = '';
    let tags = options.tags;
    for (let tag of tags) {
      tagResult += `${tag.key}:"${keyName}`;
      tagResult += '" '
    }
    append(tagResult.trim());
    append('`');
  }

  return goStr;
}

function parseDataType(datatype) {
  function match(array) {
    for (let v of array) {
      if (datatype.includes(v)) {
        return true;
      }
    }
    return false;
  }

  if (match([sql.bool])) {
    return go.bool;
  }
  if (match([sql.bit, sql.int, sql.dec])) {
    return go.int;
  }
  if (match([sql.real, sql.float, sql.double])) {
    return go.float64
  }
  if (match([sql.date, sql.timestamp, sql.year])) {
    return go.time
  }
  if (match([sql.char, sql.text, sql.enum, sql.blob, sql.set])) {
    return go.string
  }
  if (match(sql.binary)) {
    return go.bytes
  }
  throw new Error(`unknown datatype ${datatype}`)
}

export default mysqlToGo;
