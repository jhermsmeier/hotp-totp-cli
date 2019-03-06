var crypto = require( 'crypto' )

function normalize( value ) {
  return value.trim().toLowerCase()
}

function getAlgoritm( value ) {
  var hashes = crypto.getHashes()
  var wanted = normalize( value )
  var hash = hashes.find(( name ) => {
    return wanted === normalize( name )
  })
  if( !hashes.includes( hash ) ) {
    throw new Error( `Hash algorithm "${options.algorithm}" not supported by platform` )
  }
  return hash
}

module.exports = getAlgoritm
