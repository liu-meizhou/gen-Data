``` js
import { mock } from "src/main";
```

### boolean
``` js
mock.boolean()
// true | false
```

### number
``` js
mock.number({
	min: 0,
	max: 10,
	fixed: 2
})
// 1.82

mock.number({
	min: 0,
	max: 10,
	fixed: '2-4'   // 小数点保留2-3位
})
// 1.823

mock.gen({
	type: 'number',
	typeOption: {
		min: 0,
		max: 10,
		fixed: {
			min: 2,
			max: 10
		}
	}
})
// 1.82
```

### string
``` js
mock.string({
	charSet: '*',
	len: 3
})
// ***

mock.gen({
	type: 'string',
	typeOption: {
		charSet: '0123456789',
		len: {
			min: 1,
			max: 10
		}
	}
})
// 86123 (生成由数字组成的字符串,长度1-10位)
```

### dateTime
``` js
mock.dateTime({
	accuracy: 's',  // 'ms'
	startTime: '2022-10-11'
})
// xxxxx时间戳

mock.gen({
	type: 'dateTime',
	typeOption: {
		format: 'YYYY-MM-DD HH:mm:ss',
		startTime: '2022-10-11',
		endTime: '2023-09-01'
	}
})
// 2023-02-20 12:32:55
```

### object
``` js
mock.object({
	template: {
		a: 'number',
		b: 'string',
		c: 'array',
		d: {
			type: 'number'，
			typeOption: {
				min: 100
			}
		}
	}
})
/*
{
	a: 5,
	b: 'sdas3424',
	c: ['23', 'ddlsajd'],
	d: 196
}
*/

mock.object({
	template: {
		a: 'number',
		b: 'string',
		c: 'array',
		d: {
			type: 'number'，
			typeOption: {
				min: 100
			}
		}
	},
	count: 2 // 支持object {min: xx, max: xx}  'min-max'  表示从template生成key的数量
})
/*
{
	a: 5,
	d: 196
}
*/
```

### tree
``` js
mock.tree({
	template: {
		a: 'number',
		b: 'string',
		c: 'array',
		d: {
			type: 'number'，
			typeOption: {
				min: 100
			}
		}
	},
	count: 2, // 支持object {min: xx, max: xx}  'min-max'  表示从template生成key的数量
	childrenKey: 'children',
	childrenLen: 2, // 支持object {min: xx, max: xx}  'min-max'  children的长度
	childrenLayer: 2, // 支持object {min: xx, max: xx}  'min-max'  这颗树的层数
})
/*
{
	a: 5,
	b: 'sdas3424',
	c: ['23', 'ddlsajd'],
	d: 196,
	children: [{
		a: 5
		...
	}]
}
*/
```

### array
``` js
mock.array({
	len: '2-4', // 支持object {min: xx, max: xx}  'min-max'  数组长度
	type: 'string',
	typeOption: {
		len: {
			min: 2,
			max: 10
		}
	}
})
/*
['dwada', 'dwad']
*/
```

