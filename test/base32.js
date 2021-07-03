var assert = require( 'assert' )
var base32 = require( '../lib/base32' )

describe( 'Base 32', function() {

  // See https://tools.ietf.org/html/rfc4648#section-10
  var values = [
    { data: '', base32: '' },
    { data: 'f', base32: 'MY======' },
    { data: 'fo', base32: 'MZXQ====' },
    { data: 'foo', base32: 'MZXW6===' },
    { data: 'foob', base32: 'MZXW6YQ=' },
    { data: 'fooba', base32: 'MZXW6YTB' },
    { data: 'foobar', base32: 'MZXW6YTBOI======' },
  ]

  specify( 'base32.encodingLength()', function() {
    values.forEach( function( test ) {
      specify( `"${test.data}"`, function() {
        assert.strictEqual( base32.encodingLength( test.data ), test.base32.length )
      })
    })
  })

  specify( 'base32.decodingLength()', function() {
    values.forEach( function( test ) {
      specify( `"${test.data}"`, function() {
        assert.strictEqual( base32.decodingLength( test.base32 ), test.data.length )
      })
    })
  })

  context( 'base32.encode()', function() {

    context( 'RFC 4648, Section 10.  Test Vectors', function() {
      values.forEach( function( test ) {
        specify( `"${test.data}" -> "${test.base32}"`, function() {
          assert.strictEqual( base32.encode( Buffer.from( test.data ) ), test.base32 )
          assert.strictEqual( base32.encode.bytes, test.base32.length )
        })
      })
    })

  })

  context( 'base32.decode()', function() {

    context( 'RFC 4648, Section 10.  Test Vectors', function() {
      values.forEach( function( test ) {
        specify( `"${test.base32}" -> "${test.data}"`, function() {
          assert.strictEqual( base32.decode( test.base32 ).toString(), test.data )
          assert.strictEqual( base32.decode.bytes, test.base32.length )
        })
      })
    })

  })

})
