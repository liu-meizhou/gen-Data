# JSONSchema

新版 支持 sf-vue 的插件已经更名为 @sfx/json-schema (原 @sxf/pineapple)

原有的 @sxf/pineapple 还会进行bug 的修复，但不会进行BUG的更新。

<!-- omit in toc -->
## First

根据多个版本的经验，因前后端预研框架的差异，是无法100%做到一套JSONSchema 前后端都能适用的。使用者需要做好心理准备。

JSONSchema：指明的是JSONSchema 草案

JsonSchema: 指明的是本工具。

以上请在文档中注意大小写的区别。

<!-- omit in toc -->

## Reference

- [Reference](#reference)
- [Browser Compatibility](#browser-compatibility)
  - [In modern browser](#in-modern-browser)
  - [In IE11](#in-ie11)
- [FQA](#fqa)
- [Getting started with `VanillaJs`](#getting-started-with-vanillajs)
  - [step 1 安装](#step-1-安装)
  - [step 2 使用](#step-2-使用)
- [Getting started with `sf-vue-component`](#getting-started-with-sf-vue-component)
  - [step 1 安装](#step-1-安装-1)
  - [step2 初始化](#step2-初始化)
  - [step 3 使用](#step-3-使用)
- [JsonSchema constructor, methods and properties](#jsonschema-constructor-methods-and-properties)
  - [new JsonSchema(config: Config)](#new-jsonschemaconfig-config)
  - [jsonSchema.validate(value: any, schema: SchemeObj): Result](#jsonschemavalidatevalue-any-schema-schemeobj-result)
  - [jsonSchema.addErrorFilter(filter: ErrorFilter): void](#jsonschemaadderrorfilterfilter-errorfilter-void)
  - [jsonSchema.addMsgFormat(name: string, validationFn: MsgFormat, force?: boolean): void](#jsonschemaaddmsgformatname-string-validationfn-msgformat-force-boolean-void)
  - [jsonSchema.addRule(name: string, validationFn: MsgFormat, force?: boolean): void](#jsonschemaaddrulename-string-validationfn-msgformat-force-boolean-void)
  - [jsonSchema.ajv: Ajv](#jsonschemaajv-ajv)
- [SfVue constructor and methods](#sfvue-constructor-and-methods)
  - [new SfVue(schema: SchemaObject, params?: any, config?: Config)](#new-sfvueschema-schemaobject-params-any-config-config)
  - [sfVue.validateByPath(path: string, value: any)](#sfvuevalidatebypathpath-string-value-any)
- [Features](#features)
  - [msgs](#msgs)
  - [dependOn](#dependon)
  - [separator](#separator)
  - [separatorReg](#separatorreg)
  - [alias](#alias)
  - [preset formats](#preset-formats)
  - [msgFormat](#msgformat)
- [Types](#types)
  - [Config](#config)
  - [MsgsConfig](#msgsconfig)
  - [ErrorVariables](#errorvariables)
  - [ErrorFilter](#errorfilter)
  - [Result](#result)
  - [Alias](#alias-1)
  - [AliasObject](#aliasobject)
  - [MsgFormat](#msgformat-1)
- [:key: Migrate from @sxf/pineaple](#key-migrate-from-sxfpineaple)
  - [Breaking Changes](#breaking-changes)
  - [msgs 迁移](#msgs-迁移)
  - [dependOnAsRequired, defaultAsRequired 实现](#dependonasrequired-defaultasrequired-实现)

## Browser Compatibility

JsonSchema 的代码不多，打包压缩后是7K，但是因为其依赖的npm包（ajv, ajv-formats）中的代码不支持IE11，会导致JsonSchema 整体都不兼容IE11。

为此 JsonSchema 提供两份文件：

* index.esm.js：不包含ajv 等第三方包的，并在package.json 中有声明（默认值）
* index.legacy.js: 包含 ajv  ajv-formats 等第三方包，引入时需要手动补全完整路径。

除此之外还可以配置babel 转译第三方npm包（推荐尝试）

> http://code.sangfor.org/UED/FE-COMMON/discuss/QA/issues/45

### In modern browser

```ts
import { xxx } from '@sxf/json-schema';
```

### In IE11

```TS
import { xxx } from '@sxf/json-schema/dist/index.legacy';
```

## FQA

使用过程中有问题可以查看 FQA

## Getting started with `VanillaJs`

### step 1 安装

```shell
yarn add @sxf/json-schema
```

### step 2 使用

```ts
import { JsonSchema } from '@sxf/json-schema';

const config: Config;
const js = new JsonSchema(config);

const schema = {
    properties: {name: {type: string, maxLength: 15}}
};
js.validate({name: '张三'}, schema); // => {valid: true}:Result
js.validate({name: '名字超级无敌长超过长度限制的沙雕张三'}, schema); // => {valid: false, msg: '该输入项的长度超过限制'} :Result
```

> See: [Type Config](#config)
>
> See: [Type Result](#result)



## Getting started with `sf-vue-component`

### step 1 安装

```shell
yarn add @sxf/json-schema
```

### step2 初始化

```ts
import { SfVue } from '@sxf/json-schema';

/**
 * 在 sf-vue-component 的 form 初始化时初始化了一个 SfVue 实例。
 * 其中 SfVue 的构造函数参数为 pineapple 除去 validator 中的其他参数。
 * 初始化完毕后， form 组件 向子组件广播 SfVue 实例
 * 在 sf-vue 原本的校验机制的末尾，调用 SfVue 的实例进行schema 校验
 **/

Vue.use(SFVueComponent, {
    lang: "zh_CN",
    pineapple: {
        validator: SfVue,
        msgs: {}, // 全局错误消息
        alias: {}, // 别名
        errorFilters: {}, // 错误过滤器
        msgFormats: {}, // 自定义msgFormats
        ajv: {} // ajv 参数
    }
});
```

> See: [Feature msgs](#msgs)
>
> See: [Feature alias](#alias)
>
> See: [Feature msgFormats](#msgFormats)
>
> See: [Feature errorFilters](#errorFilters )



### step 3 使用

```html
<template>
    <sf-form
        :schema="schema"
        :params="params">
        <!-- params 不是必须，仅在dependOn时会使用，传入时请保证结构与schema 中的结构一致，否则会产生副作用 -->
        <sf-form-item prop="path"> <!-- 要校验数据在schema中的路径 -->
            <sf-textfield />
        </sf-form-item>
    </sf-form>
<!-- schema: schema数据 -->
<!-- params: 整个表单的数据，用于关联校验，如果所有表单项校验互不影响则可以不填 -->
<!-- path: 需要检验的属性路径 -->
</template>
```

## JsonSchema constructor, methods and properties

> JsonSchema 实例上有一些因设计缺陷标记为public 的方法，没有在文档中说明的请不要在业务中调用，以免造成不可预计的后果

### new JsonSchema(config: Config)

JsonSchema 实例的构造函数

```ts
import { JsonSchema } from '@sxf/json-schema';

const jsonSchema = new JsonSchema({});
```

> See: [Type Config](#Config)

### jsonSchema.validate(value: any, schema: SchemeObj): Result

validate 方法用于校验整个数据

```ts
import { JsonSchema } from '@sxf/json-schema';

const jsonSchema = new JsonSchema({});
const data1 = { name: '张三', age: 18};
const data2 = { name: '张三', age: 201};
const schema = {
    properties: {
        name: { type: 'string' },
        age: { type: 'number', maximum: }
    }
};

console.log(jsonSchema.validate(data1, schema)) // => {valid: true}
console.log(jsonSchema.validate(data2, schema)) // => {valid: false, '该输入项非法'}
```

> See: [Type Result](#Result)

### jsonSchema.addErrorFilter(filter: ErrorFilter): void

定义一个全局错误过滤器，用于过滤Ajv 校验之后的错误

```ts
const jsonSchema = new JsonSchema({});
const data1 = { name: '张三', age: 18};
const data2 = { name: '张三', age: 201};
const data2 = { name: '李四', age: 201};
const schema = {
    properties: {
        name: { type: 'string' },
        age: { type: 'number', maximum: }
    }
};

// 定义一个 错误过滤器，当名为李四时，忽略所有错误
const errorFilter1 = (err: ErrorObject, errorNodeSchema: AnySchemaObject, rootData: any) => {
    if (rootData.name === '李四') return false;
    return true;
}

jsonSchema.addErrorFilter(errorFilter1);

console.log(jsonSchema.validate(data1, schema)) // => {valid: true}
console.log(jsonSchema.validate(data2, schema)) // => {valid: false, '该输入项非法'}
console.log(jsonSchema.validate(data3, schema)) // => {valid: true} 
```

错误过滤器方面我们做一些全局的错误过滤，做这个事情的前提是，我们的功能已经没法通过 ajv 本身的方法去实现了。

比如 dependOn 功能，就是使用 errorFilter 特性实现。

> See: [Feature dependOn](#dependOn)
>
> See: [Feature errorFilter](#errorFilter)



### jsonSchema.addMsgFormat(name: string, validationFn: MsgFormat, force?: boolean): void

添加自定义的，带错误信息的format

```ts
const jsonSchema = new JsonSchema({});
jsonSchema.addMsgFormat('abc', (value) => {
    if (value.startWith('a')) return 'aaaaaa';
    if (value.startWith('b')) return 'bbbbbb';
    if (value.startWith('c')) return 'cccccc';
    return true;
});

const schema = {propreties: {name: {format: 'abc'}}};
jsonSchema.validate({name: 'a'}) // {valid: false, msg: 'aaaaa'}
jsonSchema.validate({name: 'b'}) // {valid: false, msg: 'bbbbb'}
jsonSchema.validate({name: 'c'}) // {valid: false, msg: 'ccccc'}
jsonSchema.validate({name: 'z'}) // {valid: true}
```

> See:[ Feature msgFormat](#msgformat)

### jsonSchema.addRule(name: string, validationFn: MsgFormat, force?: boolean): void

兼容性 API，addMsgFormat 的别名

### jsonSchema.ajv: Ajv

jsonSchema 返回的是 ajv 实例

See: [Ajv](https://ajv.js.org/api.html)

## SfVue constructor and methods

> **SfVue实例不建议在业务代码中直接使用，提供的API 都是为了方便 sf-vue-component 进行 jsonschema 校验**

### new SfVue(schema: SchemaObject, params?: any, config?: Config)

```ts
import { SfVue } from '@sxf/json-schema';

const schema: SchemaObject; // 在sf-vue-component 中接收 form 组件的 schema prop
const params: any; // 在sf-vue-component 中接收 form 组件的 params prop
const config: Config; // 在sf-vue-component 初始化时，的pineapple 参数

const sfVue = new SfVue(schema, params, config);
```

在 sf-vue-component 中的 form 表单的初始化过程中，会将form 上面定义的 schema， params，以及 sf-vue-component 初始化时传入的参数config
传入SfVue 的构造函数。

实例化之后，会将实例广播子组件（form-item组件）

### sfVue.validateByPath(path: string, value: any)

```ts

import { SfVue } from '@sxf/json-schema';


const schema: SchemaObject; // 在sf-vue-component 中接收 form 组件的 schema prop
const params: any; // 在sf-vue-component 中接收 form 组件的 params prop
const config: Config; // 在sf-vue-component 初始化时，的pineapple 参数

const sfVue = new SfVue(schema, params, config);

const path: string; // 接收 form-item 或者是 textfield 组件上的path 属性
const value: any; // textfield 实际的值

sfVue.validateByPath(path, value); // 该方法由 具体的 field 组件的 getErrors 调用
```

## Features

### msgs

`JsonSchema` 总结了多个项目的自定义错误信息的需求，结合 ajv 本身的错误机制形成了一套高可配置性的错误机制。

在`ajv`校验结束后，会出现一个.errors 属性，errors 就是校验的结果，其中每一个错误是一个ErrorObject。

> ErrorObject: https://ajv.js.org/api.html#error-objects

但是这个 ErrorObject 却无法在我们的业务中直接使用，因为缺乏自定义的能力。基于此种原因`JsonSchema`以ErrorObject 的keyword为关键字，查找一个字符串模板。

然后 结合 ErrorObject，拿到当前schema，当前校验的value等信息对字符串模板进行填充，最终得到了最后的错误信息。

example1: 字符串长度超过限制，出错的关键字为`maxLength `，就会调用 `maxLength `作为错误信息模板

example2: 必填项 没有填，出错的关键词为 `required`就会调用 `required` 作为 错误信息模板。

> 注意：当出错的关键字为 `type` 和 `format` 会进行一次'穿透'，如format:'email'，如果出错则会调用 email 作为错误信息的模板

#### msgs 模板定义

msgs 的定义是一个对象，key值为字符串也就是ajv ErrorObject 中的keyword。值也是一个字符串，可以用`${xx}` 标记用于填充的变量（类似于ES6 的字符串的模板）。

```ts
export interface MsgsConfig {
    [propName: string]: string;
}
const msgsExample: MsgsConfig = {
    default: '错误关键字${keyword}，关键字的值${keyValue}，数据中的值${value}' // ErrorVariables 类型标明了所有可以使用的变量
}

```

> See:  [Type ErrorVariables](#ErrorVariables)

#### global vs schema

在大多数的情况下，全局配置一个msgs 可以解决大部分的情况，小部分的需要单独定义错误信息的时候呢，可以通过直接在schema 里面定义即可解决。

```ts
const schema = {
    properties: {
        name: {
            type: 'string',
            minLength: 3,
            max: 1024
            msgs: { // 这里可以配置name属性错误信息模板
                minLength: '名称的的最小长度为${keyValue}',
                maxLength: '名称的的最大长度为${keyValue}',
            } 
        },
    	age: {
            type: 'number',
            maximum: 100,
            minimum: 1,
            message: '请输入合法的年龄'// 同时也有一种需求就是，不管任何时候都返回固定的错误信息，这个时候可以直接定义message 他具有最高的优先级。
        }
    }
}
```

#### preset global msgs config

下面是JsonSchema 内置的全局错误信息模板

```js
const defaultMsgsConfig: MsgsConfig = {
    default: '该输入项不合法',
    number: '该输入项必须为数字',
    string: '该输入项必须为字符串',
    integer: '该输入项必须为整数',
    boolean: '该输入项必须为布尔值',
    array: '该输入项必须为数组',
    required: '该输入项不能为空',
    // 数字相关
    multipleOf: '该输入项必须为是${keyValue}的整数倍',
    maximum: '该输入项的最大值为${keyValue}',
    minimum: '该输入项的最小值为${keyValue}',
    // 字符串相关
    maxLength: '该输入项的最大长度为${keyValue}个字符',
    minLength: '该输入项的最小长度为${keyValue}个字符',
    // 数组相关
    minItems: '该输入项最少输入${keyValue}行',
    maxItems: '该输入项最多输入${keyValue}行',
    uniqueItems: '该输入项不允许重复',
}
```

### dependOn

`dependOn`的字面意思是依赖于某一项，这在表单校验中是一个常见的场景。之前所有使用JSONSchema前后端统一校验工具的产品线基本上都实现了这一个功能。

`dependOn` 支持大部分的JS语法，可以当做正常的js看待

```ts
// 如果结婚了 则需要填写结婚日期
const schema = {
    properties: {
        marry: {
            type: 'boolean'
        },
        marryDate: {
            dependOn: 'marry' // 如果marry 字段为 true 则会进行校验
            type: 'string',
            format: 'date'
        }
    }
}

// 如果一个上班时间少于10天，则需要填写特殊说明
const schema2 = {
    properties: {
        workDays: {
            type: 'number'
        },
        note: {
            type: 'string',
            dependOn: 'workDays <= 10',
            mssage: '本月上班时间少于10天，请填写说明'
        },
    }
}
// 如果有嵌套结构， a.b.c（推荐） 或者 a['b']['c']（不推荐，写起来麻烦）
```

### separator

前端在处理多行文本框(textarea)时，有一个需求就是数据为一行一个。

这个时候textarea一般是为字符串，但是如果前后端一起校验的话，JSONSchema中的type 一定会被配置为 array。

针对于这个需求，可以在schema 中 定义`separator`。JsonSchema 在进行校验之前会以separator 进行字符串切割(String.split)成为数组。

```ts
import { JsonSchema } from '@sxf/json-schema';
const schema = {
    properties: {
        names: {
            type: 'array',
            separator: ',', // 以逗号切割
            items: {
                type: 'string'
            }
        }
    }
}
const data = {
    names: '胡一,王二,张三,李四'
}
const js = new JsonSchema({});
js.validate(data, schema) // => {valid: true}
```

> 当items 的type 定义为 number 是 ，JsonSchema 会将切割后的每个元素尝试转化为数字，如果转化不成功则会维持字符串。

### separatorReg

同 `separator` 只不过值为正则表达式

### alias

在使用 JSONSchema进行前后端统一校验时，往往由于框架不同的原因，导致定义的关键字的名称不同。比如之前版本的 `__separator__` 实际上就是 `separator`这个功能，`__depend__on__`实际上就是 `dependOn`这个功能。

为了避免大家在业务中进行冗余的schema 转换，JsonSchema 提供了 alias机制，相当于可以快速的给schema 关键字 重命名。

```ts
// 快捷版本
const alias: Alias = {
    '__separator__': 'separator', // 将schema 中 所有__separator__ 更名 为 separator
    '__depend__on__': 'dependOn',
    '__format__description': 'message'
}

// 完整版本
const alias: Alias = {
    '__separator__': {
        keyword: 'separator', // 需要修改的具体名称
        keep: false, // 是否在更名时，还同时保留原有字段
        condition: () => true // 更名的条件
    }, // 将schema 中 所有__separator__ 更名 为 separator
}
```

> See: [Type Alias](#Alias-1)

### preset formats

标准的JSONSchema草案中，规定了一些format，这些format ajv 内部已经实现。可以直接使用。

> https://www.npmjs.com/package/ajv-formats

另外 JsonSchema 工具本身也会内置一些 formats

* ip
* 正在补充中...

### msgFormat

自定义format是一个很常见的需求，在没有msgFormat 这个功能时可以这样实现。

> https://ajv.js.org/api.html#ajv-addformat-name-string-format-format-ajv

```ts
import { JsonSchema } from '@sxf/json-schema';

const js = new JsonSchema({
    ajv: {
        formats: {
            'xxx': ''
        }
    }
});
// or
js.ajv.addFormat(name, fn);
```

但是ajv 本身 的 format 机制存在一个较为明显的缺陷——无法返回自定义的错误信息。并且ajv format 的参数比较有限，无法支撑一些复杂的format。

所以JsonSchema 提供了 `msgFormat` 机制。这样format定义的函数可以自己返回错误信息。需要注意的是，msgFormat 返回的错误信息具有最高优先级，他将会作为最终的结果直接输出。

```ts
import { JsonSchema } from '@sxf/json-schema';

const js = new JsonSchema({
    msgFormats: {
        aaa: fn as MsgFormat
    }
});
// or
js.addMsgFormat(name, fn); // 这里注意 区别于 addFormat，这里不用调用ajv的实例 js.ajv
```

> See: [Type MsgFormat](#MsgFormat)



## Types

### Config

```ts
export interface Config {
    msgs?: MsgsConfig;
    alias?: Record<string, string>;
    ajv?: Options;
    filters?: ErrorFilter[];
    msgFormats?: Record<string, MsgFormat>
}
```

### MsgsConfig

```ts
export interface MsgsConfig {
    [propName: string]: string;
}
```

### ErrorVariables

```ts
export interface ErrorVariables {
    name: string; // 名称
    path: string; // 属性路径
    value: string; // 校验的值
    keyword: string; // 出错关键字
    keyValue: any; // 出错关键字的值
    index?: number; // 索引，数组出错时会有
}

```

### ErrorFilter

```ts
export type ErrorFilter = (
    err: ErrorObject, // ajv 错误对象
    errorNodeSchema: AnySchemaObject, // 发生错误当前节点的schema
    params: any, // 当前校验的整体对象
    schema: AnySchemaObject // 当前校验整体schema
) => boolean;
```

### Result

```ts
export interface Result {
    msg?: string;
    valid: boolean;
}
```

### Alias

```ts
export interface Alias {
    keyword: string;
    keep?: boolean;
    condition?: (data: string, schema: AnySchemaObject, core: Core) => boolean 
}
```
### AliasObject

```ts
export type AliasObject = Record<string, Alias | string>;
```

### MsgFormat

```ts
export type MsgFormat = (
    data: any,
    schema: AnySchemaObject,
    rootData: any,
    rootSchema: AnySchemaObject) => boolean | string;
```



## :key: Migrate from @sxf/pineaple

### Breaking Changes

* 移除构造函数参数 `trim`，即自动去除字符串的前后空格。校验中自动去除前后的空格对于用户体验影响并不是很大，甚至徒增数据传递和存储时的额外工作。
* 移除构造函数参数 `strict`，此前加入strict参数是因为 pineapple 语法的语法局限性较大。底层使用ajv 重构后，JSONSchema 有 `additionalProperties` `minProperties`等等字段可以限制
* 移除构造好函数 `messageFirst`，因为`msgs`机制完善，此项参数变得没有意义。
* 移除构造函数参数 `dependOnAsRequired`，此项可以简单的由业务方定制完成。
* 移除构造函数参数 `defaultAsRequired`，此项可以简单的由业务定制完成。

### msgs 迁移

msgs 迁移主要有三个部分要注意：

* `messageFirst`移除
* `msgs` key 值发生变化
* `msgs`错误模板的变量填充发生变化

####  `messageFirst`移除处理

`messageFirst`移除的主要原因是pineapple 关于类型错误信息的配置只能在全局配置一次。这样的话就会存在一个问题。举个例子：

字段A定义了stringLength 和 format，但是这里存在特殊需求，错误信息显示想区别于全局的关于stringLength的配置。而默认处理方式为，先处理能够匹配到的模板，如果无法匹配到再使用`message`字段的错误信息兜底。

这样一来，这个需求永远无法实现，因为一定会匹配到stringLenght(全局配置了)。

所以为了处理这种情况加了`messageFirst `配置，但是这使得无论任何情况都只能提示一种错误，也不是很优雅。

而`msgs`机制则允许在schema节点定义单个schema的错误信息模板，这样来了需求得到了更好的解决。

#### `msgs` key 值变化处理

主要是移除了`type`, `strict`这两个key，`type`移除是因为类型不够精准，`strict`移除是因为这个功能已经被废弃。

另外就是schema 类型的 错误key更加简化，都统一去除了type前缀。

原有key

```ts
export const SFVUE_MSGS: Msgs = {
    empty: '-',
    type: '-', // 无意义，新版移除
    typeArray: '-', // 更名为 array
    typeNumber: '-', // 更名为 number
    typeBoolean: '-', // 更名为 boolean
    typeString: '-', // 更名为 string
    default: '-',
    strict: '-', // 移除
    integer: '-',
    maximum: '-',
    minimum: '-',
    multipleOf: '-',
    maxLength: '-',
    minLength: '-',
    minItems: '-',
    maxItems: '-',
    uniqueItems: '-',
};
```

现有 key 值

```ts
export const DEFAULT_CONFIG: Config = {
    msgs: {
        default: '-',
        number: '-',
        string: '-',
        integer: '-',
        boolean: '-',
        array: '-',
        required: '-',
        // 数字相关
        multipleOf: '-',
        maximum: '-',
        minimum: '-',
        // 字符串相关
        maxLength: '-',
        minLength: '-',
        // 数组相关
        minItems: '-',
        maxItems: '-',
        uniqueItems: '-',
    }
};
```

#### `msgs`错误模板的变量填充发生变化

原有错误变量

```ts
interface Vars {
    name: string; // schema 的title属性
    value: any; // 校验的值
    maxLength: number;// schema 配置的 maxLength 值
    minLength: number;// schema 配置的 minLength 值
    ... : any // 其他schema配置的值
    length: number // 当出错为数组时 数组的长度
    path: stirng; // 当出错为strict 时，出错的路径
}
```

现有错误变量

```ts
export interface ErrorVariables {
    name: string; // 名称
    path: string; // 属性路径，数组出错时会有索引信息 /a/b/0
    value: string; // 校验的值
    keyword: string; // 出错关键字
    keyValue: any; // 出错关键字的值
}
```

除去 `name`, `value`相同外。出错关键字，和关键字的值统一为 keyword 和 keyValue，而不是之前具体的maxLength等。此外还统一新增了path，以及出错时的index。

为什么没有在数组出错时提供length 变量？因为数组长度可以通过value.length 拿到。



### dependOnAsRequired, defaultAsRequired 实现

dependOnAsRequired  意思是当dependOn满足时，当前字段不能为空。

JsonSchema 关于dependOn的实现为 先进行正常的校验，校验完毕后针对错误信息去验证schema中的dependOn，如果dependOn值存在且不为false，则会移除错误。

所以简单的，我们可以直接给配置了dependOn的属性，设置required 即可。

```ts
import { traverseSchema } from '@sxf/json-schema';

const schema = {
	properties: {
		name: {
			type: 'string'
		},
		age: {
			type: 'string'
		}
	}
}

// 代码仅供参考，不保证一定能运行
traverseSchema(schema, (node) => {
    if (!node.properties) return;
    Object
        .keys(node.properties)
    	.forEach(key = > {
        	if (node.properties[key].dependOn) {
        		node.required
                    ? node.required.push(key)
        			: node.required = [key];
        	}
    		if (node.properties[key].default !== void(0)) {
                node.required
                	? node.requried.push(key)
                	: node.required = [key];            }
        })
})
```

