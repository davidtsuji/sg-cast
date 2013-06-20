require('sgArgumentsToString');
require('moment');

var _ = require('underscore')

window.sg = window['sg'] || {};

window.sg.cast = _.memoize(function(_value, _castType, _default, _values, _additionalProperties) {

	var $this = this
	  , parsedValue
	  , valueType
	  , value
	  , values = _.isArray(_values) ? _values : [];

	try { valueType = _value.constructor } catch(e){}

	if (valueType === _castType || _castType === '*') {

		value = _value;

	} else {

		switch(true) {

			case _castType == Array && ! _.isNull(_value) && ! _.isUndefined(_value):

				value = [_value];

			break;

			case _castType == Boolean:

				try {

					value = /^(true|1|y|yes)$/i.test(_value.toString()) ? true : undefined

				}catch(e) {}

				value = _.isBoolean(value) ? value : ( ! _.isUndefined(_default) && ! _.isNull(_default) ? _default : false )

			break;

			case _castType == Date:

				try {

					value = new Date(_value || undefined);
					value = isNaN(value.getTime()) ? null : value;

				}catch(e){}

			break;

			case _castType == 'Moment':
			
				value = moment(_value);

				if (value && value.isValid() && _.isObject(_additionalProperties) && _.has(_additionalProperties, '_dateFormat')) {

					value = value.format(_additionalProperties._dateFormat);

				}

			break;
			
			case _castType == String:

				try {

					value = JSON.stringify(_value);
					if ( _.isUndefined(value) ) throw '';

				} catch(e) {

					try { value = _value.toString() } catch(e){}

				}

			break;

			case _castType == Number:

				try {

					value = parseFloat(_value);
					if (isNaN(value)) value = undefined;

				} catch(e){ value = undefined }

			break;

			default:

				try { value = $this.cast(JSON.parse(_value), _castType) } catch(e) {}

			break;

		}

	}

	if (values.length > 0 && ! _.contains(values, value)) value = values[0];

	return _.isUndefined(value) || _.isNull(value) || value == 'null' ? _default : value;

}, sg.argumentsToString);