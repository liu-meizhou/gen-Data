### boolean
``` js
genData({
	type: 'boolean'
})
// true | false
```

### number
``` js
genData({
	type: 'number',
	typeOption: {
		min: 0,
		max: 10,
		fixed: 2
	}
})
// 1.82 mock('number|0-10.2')

genData({
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
// 1.82 mock('number|0-10.2-10')
```

### string
``` js
genData({
	type: 'string',
	typeOption: {
		charSet: '*',
		len: 3
	}
})
// ***

genData({
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
genData({
	type: 'dateTime',
	typeOption: {
		dataType: 'number',
		accuracy: 's',  // 'ms'
		startTime: '2022-10-11'
	}
})
// xxxxx

genData({
	type: 'dateTime',
	typeOption: {
		dataType: 'string',
		format: 'YYYY-MM-DD HH:mm:ss',
		startTime: '2022-10-11',
		endTime: '2023-09-01'
	}
})
// 2023-02-20 12:32:55
```

### object
``` js
genData({
	type: 'object',
	typeOption: {
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

genData({
	type: 'object',
	typeOption: {
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
		len: 2 // 支持object {min: xx, max: xx}
	}
})
// 取abcd其中2个生成
/*
{
	a: 5,
	d: 196
}
*/
```

### tree
``` js
genData({
	type: 'tree',
	typeOption: {
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
		len: 2, // 支持object {min: xx, max: xx}
		childrenKey: 'children',
		childrenLen: 2, // 支持object {min: xx, max: xx}
		layer: 2, // 支持object {min: xx, max: xx}
	}
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
genData({
	type: 'array',
	typeOption: {
		len: 2, // 支持object {min: xx, max: xx}
		type: 'string',
		typeOption: {
			len: {
				min: 2,
				max: 10
			}
		}
	}
})
/*
['dwada', 'dwad']
*/
```

