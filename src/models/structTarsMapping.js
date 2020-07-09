import structToTars from "@/services/struct-to-tars";
import { onChange } from "@/models/helpers";
import { ALL, YAML, DB, Config, Nested, JSON, TARS, STRUCT } from '@/services/js-options'

const innerState = {
  treeData: [{
    ...ALL,
    children: [JSON, YAML, DB, TARS],
  }, {
    ...Config,
    children: [Nested],
  }],
  select: [STRUCT.key],
  input: `type DictData struct {
	DictCode  int    \`gorm: "primary_key;AUTO_INCREMENT" json: "dictCode" example: "1"\` //字典编码
	DictSort  int    \`gorm: "type:int(4);" json: "dictSort"\`                           //显示顺序
	DictLabel string \`gorm: "type:varchar(128);" json: "dictLabel"\`                    //数据标签
	DictValue string \`gorm: "type:varchar(255);" json: "dictValue"\`                    //数据键值
	DictType  string \`gorm: "type:varchar(64);" json: "dictType"\`                      //字典类型
	CssClass  string \`gorm: "type:varchar(128);" json: "cssClass"\`                     //
	ListClass string \`gorm: "type:varchar(128);" json: "listClass"\`                    //
	IsDefault string \`gorm: "type:varchar(8);" json: "isDefault"\`                      //
	Status    string \`gorm: "type:int(1);" json: "status"\`                             //状态
	Default   string \`gorm: "type:varchar(8);" json: "default"\`                        //
	CreateBy  string \`gorm: "type:varchar(64);" json: "createBy"\`                      //
	UpdateBy  string \`gorm: "type:varchar(64);" json: "updateBy"\`                      //
	Remark    string \`gorm: "type:varchar(255);" json: "remark"\`                       //备注
	Params    string \`gorm: "-" json: "params"\`
	DataScope string \`gorm: "-" json: "dataScope"\`
	CreatedAt time.Time  \`json: "createdAt"\`
	UpdatedAt time.Time  \`json: "updatedAt"\`
	DeletedAt *time.Time \`sql: "index" json: "deletedAt"\`
}`,
  show: '',
  name: 'struct',
  annotations: [],
  showHandler: structToTars,
};

export default {
  namespace: 'structTarsMapping',

  state: {
    ...onChange(innerState)
  },

  reducers: {
    input(state, { payload }) {
      return onChange({ ...state, ...payload });
    },
  }
}
