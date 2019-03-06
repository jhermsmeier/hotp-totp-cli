var base32 = require( './base32' )
var url = require( 'url' )

var protocol = 'otpauth:'
var base32Pattern = /([ABCDEFGHIJKLMNOPQRSTUVWXYZ234567]+\s*)*/i

function parseBase32( value ) {
  var key = value.replace( /[\s\r\n]+/g, '' ).toUpperCase()
  return base32.decode( key )
}

function parseKey( value ) {

  if( typeof value !== 'string' ) {
    throw new Error( 'Key must be a string' )
  }

  value = value.trim()

  if( value.startsWith( protocol ) ) {
    var options = url.parse( value, true )
    return {
      key: parseBase32( options.query.secret ),
      algorithm: options.query.algorithm,
      digits: options.query.digits ? +options.query.digits : undefined,
      counter: options.query.counter ? +options.query.counter : undefined,
      timeStep: options.query.period ? +options.query.period : undefined,
    }
  }

  if( base32Pattern.test( value ) ) {
    return { key: parseBase32( value ) }
  }

  throw new Error( 'Invalid key format' )

}

module.exports = parseKey
