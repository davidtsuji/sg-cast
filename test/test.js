var cast = require('sg-cast')
  , type = require('type')
  , contains = require('contains')

test('cast() test', function() {

	var myBoolean = true
	  , myArray = [1,2,3]
	  , myString = 'test string'
	  , myNumber = 1
	  , myObject = {a: 'a'}
	  , myDate = new Date()

	ok( cast(myArray,   Array)   === myArray,   "myArray"   );
	ok( cast(myBoolean, Boolean) === myBoolean, "myBoolean" );
	ok( cast(myString,  String)  === myString,  "myString"  );
	ok( cast(myNumber,  Number)  === myNumber,  "myNumber"  );
	ok( cast(myObject,  Object)  === myObject,  "myObject"  );
	ok( cast(myDate,    Date)    === myDate,    "myDate"    );

	// # Defaults
	ok( cast(null, String, 'orange') === 'orange', 'bad value, no values, use the default' )
	ok( cast(null, String, null, ['red', 'green', 'blue']) === 'red', 'bad value, no values, use the default' )
	ok( cast(null, String, 'orange', ['red', 'green', 'blue']) === 'red', 'bad value, no values, use the default' )

	// # Array
	// Cast from different types
	ok( cast('1,2,3',   Array, [4,5,6]).constructor === Array,  "cast failed, so apply the default" );
	ok( cast('[1,2,3]', Array, [4,5,6]).constructor === Array,  "cast failed, so apply the default" );


	// # Boolean
	// Cast from different types
	ok( cast('true',    Boolean) === true,  "cast a String as a Boolean" );
	ok( cast('y',       Boolean) === true,  "cast a String as a Boolean" );
	ok( cast('yes',     Boolean) === true,  "cast a String as a Boolean" );
	ok( cast(1,         Boolean) === true,  "cast a Number as a Boolean" );
	ok( cast('n',       Boolean) === false, "cast a String as a Boolean" );
	ok( cast(0,         Boolean) === false, "cast a Number as a Boolean" );
	ok( cast(undefined, Boolean) === false, "cast a undefined as a Boolean" );
	ok( cast(null,      Boolean) === false, "cast a null as a Boolean" );


	// # Date
	// Cast from different types
	ok( cast('19 oct 1980', Date).toJSON() === '1980-10-18T14:00:00.000Z', "cast a String as a Date" );
	ok( cast('1980-10-18T14:00:00.000Z', Date).constructor === Date, "cast a String as a Date" );
	ok( cast('1980-10-18T14:00:00.000Z', Date).getTime() === 340725600000, "cast a String as a Date" );
	ok( cast('', Date) === undefined, "cast an empty String as a Date" );
	ok( cast(undefined, Date) === undefined, "cast undefined as a Date" );
	ok( cast(null, Date) === undefined, "cast null as a Date" );
	

	// # Number
	// Cast from different types
	ok( cast('1',       Number, 0) === 1,  "cast a String as a Number" );
	ok( cast('-11.5',   Number, 0) === -11.5,  "cast a String as a Number" );
	ok( cast('+11.5',   Number, 0) === 11.5,  "cast a String as a Number" );
	ok( cast('a1+11.5', Number) === undefined,  "cast a String as a Number" );


	// # Object
	// Cast from different types
	ok( cast('{"a":{"b":"b"}}', Object).a.b === 'b',  "cast a String as an Object" );


	// # String
	// Cast from different types
	ok( cast(12, String) === '12', "cast a String as an Object" );
	ok( cast({a:'a'}, String) === '{"a":"a"}', "cast a String as an Object" );	// # String
	

	// Cast from anything to a dynamic type
	ok( cast([1,2,3], '*')[1] === 2, "cast a number as a dynamic type" );
	ok( cast(false, '*') === false, "cast a boolean as a dynamic type" );
	ok( cast('bam', '*') === 'bam', "cast a string as a dynamic type" );
	ok( cast(12, '*') === 12, "cast a number as a dynamic type" );
	ok( JSON.stringify(cast({a:'a', b:{c:'c'}}, '*')) === '{"a":"a","b":{"c":"c"}}', "cast a object as a dynamic type" );
	ok( cast(new Date().getFullYear(), '*') === 2013, "cast a date as a dynamic type" );

});