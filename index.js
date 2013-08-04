if ( ! window['moment']) require('moment');

var argsToString = require('sg-arguments-to-string')
  , memoize = require('memoize')
  , contains = require('contains')
  , type = require('type')
  , isEmpty = require('sg-is-empty')

var cast = memoize(function(_value, _castType, _default, _values, _additionalProperties) {

	var parsedValue
	  , valueType
	  , value
	  , values = type(_values) == 'array' ? _values : [];

	try { valueType = _value.constructor } catch(e){}

	if (valueType === _castType || _castType === '*') {

		value = _value;

	} else {

		switch(true) {

			case _castType == Array && ! isEmpty(_value):

				value = [_value];

			break;

			case _castType == Boolean:

				try {

					value = /^(true|1|y|yes)$/i.test(_value.toString()) ? true : undefined

				}catch(e) {}

				value = type(value) == 'boolean' ? value : ( ! type(_default) == 'undefined' && ! type(_default) == 'null' ? _default : false )

			break;

			case _castType == Date:

				try {

					value = new Date(_value || undefined);
					value = isNaN(value.getTime()) ? null : value;

				}catch(e){}

			break;

			case _castType == 'Moment':
			
				value = moment(_value);

				if (value && value.isValid() && type(_additionalProperties) == 'object' && contains(Object.keys(_additionalProperties), '_dateFormat')) {

					value = value.format(_additionalProperties._dateFormat);

				}

			break;
			
			case _castType == String:

				if ( ! isEmpty(_value)) {

					try {

						value = JSON.stringify(_value);
						if ( type(value) == 'undefined' ) throw '';

					} catch(e) {

						try { value = _value.toString() } catch(e){}

					}

				}

			break;

			case _castType == Number:

				try {

					value = parseFloat(_value);
					if (isNaN(value)) value = undefined;

				} catch(e){ value = undefined }

			break;

			default:

				try { value = cast(JSON.parse(_value), _castType) } catch(e) {}

			break;

		}

	}

	if (values.length > 0 && ! contains(values, value)) value = values[0];

	return type(value) == 'undefined' || type(value) == 'null' ? _default : value;

}, argsToString);

module.exports = cast;