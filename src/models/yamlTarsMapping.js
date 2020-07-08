import { onChange } from "@/models/helpers";
import yamlToGo from '@/services/yaml-to-tars'
import { ALL, YAML, DB, Config, Nested } from '@/services/js-options'

const innerState = {
  treeData: [{
    ...ALL,
    children: [YAML, DB],
  }, {
    ...Config,
    children: [Nested],
  }],
  select: [YAML.key],
  input: '',
  show: '',
  name: 'yaml',
  showHandler: yamlToGo,
  hasName: true,
  hasPrefix: true,
  annotations: [],
  structName: 'Tars',
};

export default {
  namespace: 'yamlTarsMapping',

  state: {
    ...innerState
  },

  reducers: {
    input(state, {payload}) {
      return onChange({...state, ...payload});
    },
  }
}
