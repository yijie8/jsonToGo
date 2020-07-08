const jsonOption = {
  omitempty: 'omitempty'
};

// to struct
const buildin = {
  string: 'string',
  bytes: 'byte',
  int: 'int', int8: 'short', int16: 'int', int32: 'int', int64: 'long',
  uint: 'Unsigned int', uint8: 'unsigned short', uint16: 'Unsigned int', uint32: 'Unsigned int', uint64: 'Unsigned int',
  bool: 'bool',
  float32: 'float', float64: 'float',
  interface: 'string',
  time: 'time.Time',
  slice: 'slice',
  struct: 'struct',
  type: 'type',
};

//json to tars
const buildin_json = {
  string: 'string',
  bytes: 'byte',
  int: 'int', int8: 'short', int16: 'int', int32: 'int', int64: 'long',
  uint: 'Unsigned int', uint8: 'unsigned short', uint16: 'Unsigned int', uint32: 'Unsigned int', uint64: 'Unsigned int',
  bool: 'bool',
  float32: 'float', float64: 'float',
  interface: 'string',
  time: 'time.Time',
  slice: 'slice',
  struct: 'struct',
  type: 'type',
};

//struct to tars
const buildin_struct = {
  string: 'string',
  bytes: 'byte',
  int: 'int', int8: 'short', int16: 'int', int32: 'int', int64: 'long',
  uint: 'Unsigned int', uint8: 'unsigned short', uint16: 'Unsigned int', uint32: 'Unsigned int', uint64: 'Unsigned int',
  bool: 'bool',
  float32: 'float', float64: 'float',
  interface: 'string',
  "time.Time": 'string',
  slice: 'slice',
  struct: 'struct',
  type: 'type',
};

// Sanitizes and formats a string to make an appropriate identifier in Go
function format(str) {
  if (!str)
    return '';
  else if (str.match(/^\d+$/))
    str = 'Num' + str;
  else if (str.charAt(0).match(/\d/)) {
    let numbers = {
      '0': 'Zero_', '1': 'One_', '2': 'Two_', '3': 'Three_',
      '4': 'Four_', '5': 'Five_', '6': 'Six_', '7': 'Seven_',
      '8': 'Eight_', '9': 'Nine_'
    };
    str = numbers[str.charAt(0)] + str.substr(1);
  }
  return toProperCase(str).replace(/[^a-z0-9]/ig, '') || 'NAMING_FAILED';
}

// Proper cases a string according to Go conventions
function toProperCase(str) {
  // https://github.com/golang/lint/blob/5614ed5bae6fb75893070bdc0996a68765fdd275/lint.go#L771-L810
  const commonInitialisms = [
    "ACL", "API", "ASCII", "CPU", "CSS", "DNS", "EOF", "GUID", "HTML", "HTTP",
    "HTTPS", "ID", "IP", "JSON", "LHS", "QPS", "RAM", "RHS", "RPC", "SLA",
    "SMTP", "SQL", "SSH", "TCP", "TLS", "TTL", "UDP", "UI", "UID", "UUID",
    "URI", "URL", "UTF8", "VM", "XML", "XMPP", "XSRF", "XSS"
  ];

  return str.replace(/(^|[^a-zA-Z])([a-z]+)/g, function (unused, sep, frag) {
    if (commonInitialisms.indexOf(frag.toUpperCase()) >= 0)
      return sep + frag.toUpperCase();
    else
      return sep + frag[0].toUpperCase() + frag.substr(1).toLowerCase();
  }).replace(/([A-Z])([a-z]+)/g, function (unused, sep, frag) {
    if (commonInitialisms.indexOf(sep + frag.toUpperCase()) >= 0)
      return (sep + frag).toUpperCase();
    else
      return sep + frag;
  });
}

export {
  buildin,
  buildin_json,
  buildin_struct,
  jsonOption,
  format,
}
