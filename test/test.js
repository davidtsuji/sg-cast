require('sgCast');

test('sg.cast() test', function() {

	var schema = {

		aString  : String,
		aNumber  : { _type : Number },
		aBoolean : Boolean,
		aArray   : Array,
		aObject  : Object,

	}
	
	var myBoolean = true
	  , myArray = [1,2,3]
	  , myString = 'test string'
	  , myNumber = 1
	  , myObject = {a: 'a'}
	  , myDate = new Date()

	ok( sg.cast(myArray,   Array)   === myArray,   "myArray"   );
	ok( sg.cast(myBoolean, Boolean) === myBoolean, "myBoolean" );
	ok( sg.cast(myString,  String)  === myString,  "myString"  );
	ok( sg.cast(myNumber,  Number)  === myNumber,  "myNumber"  );
	ok( sg.cast(myObject,  Object)  === myObject,  "myObject"  );
	ok( sg.cast(myDate,    Date)    === myDate,    "myDate"    );


	// # Array
	// Cast from different types
	ok( sg.cast('1,2,3',   Array, [4,5,6]).constructor === Array,  "cast failed, so apply the default" );
	ok( sg.cast('[1,2,3]', Array, [4,5,6]).constructor === Array,  "cast failed, so apply the default" );


	// # Boolean
	// Cast from different types
	ok( sg.cast('true',    Boolean) === true,  "cast a String as a Boolean" );
	ok( sg.cast('y',       Boolean) === true,  "cast a String as a Boolean" );
	ok( sg.cast('yes',     Boolean) === true,  "cast a String as a Boolean" );
	ok( sg.cast(1,         Boolean) === true,  "cast a Number as a Boolean" );
	ok( sg.cast('n',       Boolean) === false, "cast a String as a Boolean" );
	ok( sg.cast(0,         Boolean) === false, "cast a Number as a Boolean" );
	ok( sg.cast(undefined, Boolean) === false, "cast a undefined as a Boolean" );
	ok( sg.cast(null,      Boolean) === false, "cast a null as a Boolean" );


	// # Date
	// Cast from different types
	ok( sg.cast('19 oct 1980', Date).toJSON() === '1980-10-18T14:00:00.000Z', "cast a String as a Date" );
	ok( sg.cast('1980-10-18T14:00:00.000Z', Date).constructor === Date, "cast a String as a Date" );
	ok( sg.cast('1980-10-18T14:00:00.000Z', Date).getTime() === 340725600000, "cast a String as a Date" );
	ok( sg.cast('', Date) === undefined, "cast an empty String as a Date" );
	ok( sg.cast(undefined, Date) === undefined, "cast undefined as a Date" );
	ok( sg.cast(null, Date) === undefined, "cast null as a Date" );
	

	// # Number
	// Cast from different types
	ok( sg.cast('1',       Number, 0) === 1,  "cast a String as a Number" );
	ok( sg.cast('-11.5',   Number, 0) === -11.5,  "cast a String as a Number" );
	ok( sg.cast('+11.5',   Number, 0) === 11.5,  "cast a String as a Number" );
	ok( sg.cast('a1+11.5', Number) === undefined,  "cast a String as a Number" );


	// # Object
	// Cast from different types
	ok( sg.cast('{"a":{"b":"b"}}', Object).a.b === 'b',  "cast a String as an Object" );


	// # String
	// Cast from different types
	ok( sg.cast(12, String) === '12', "cast a String as an Object" );
	ok( sg.cast({a:'a'}, String) === '{"a":"a"}', "cast a String as an Object" );	// # String
	

	// Cast from anything to a dynamic type
	ok( sg.cast([1,2,3], '*')[1] === 2, "cast a number as a dynamic type" );
	ok( sg.cast(false, '*') === false, "cast a boolean as a dynamic type" );
	ok( sg.cast('bam', '*') === 'bam', "cast a string as a dynamic type" );
	ok( sg.cast(12, '*') === 12, "cast a number as a dynamic type" );
	ok( JSON.stringify(sg.cast({a:'a', b:{c:'c'}}, '*')) === '{"a":"a","b":{"c":"c"}}', "cast a object as a dynamic type" );
	ok( sg.cast(new Date().getFullYear(), '*') === 2013, "cast a date as a dynamic type" );

});