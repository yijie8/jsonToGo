import jsonToGo from "@/services/json-to-tars";
import { onChange } from "@/models/helpers";
import { ALL, JSON, DB, Config, Nested } from '@/services/js-options'

const innerState = {
  treeData: [{
    ...ALL,
    children: [JSON, DB],
  }, {
    ...Config,
    children: [Nested],
  }],
  select: [JSON.key],
  input: '',
  show: '',
  name: 'json',
  showHandler: jsonToGo,
  hasName: true,
  hasPrefix: true,
  annotations: [],
  structName: 'Tars',
};

export default {
  namespace: 'jsonStructMapping',

  state: {
    ...innerState
  },

  reducers: {
    input(state, {payload}) {
      return onChange({...state, ...payload});
    },
  }
}
