var base32 = module.exports

const PAD = '='
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'

function encodingLength( value ) {
  var bytes = ( Buffer.byteLength( value ) * 8 ) / 5
  return bytes % 8 ? 8 * Math.ceil( bytes / 8 ) : bytes
}

function encode( buffer, offset, length ) {

  var value = ''
  var state = 0
  var bits = 0

  offset = offset || 0
  length = length || ( buffer.length - offset )

  for( var i = 0; i < length; i++ ) {
    state = ( state << 8 ) | buffer[ offset + i ]
    bits += 8
    while( bits >= 5 ) {
      value += ALPHABET[ ( state >>> ( bits - 5 ) ) & 0x1F ]
      bits -= 5
    }
  }

  if( bits ) {
    value += ALPHABET[ ( state << ( 5 - bits ) ) & 0x1F ]
  }

  if( value.length % 8 ) {
    value += PAD.repeat( 8 - value.length % 8 )
  }

  encode.bytes = value.length

  return value

}

function decodingLength( value ) {

  var bits = value.length * 5
  var offset = -1

  // Substract any padding
  while( ~( offset = value.indexOf( PAD, offset + 1 ) ) ) {
    bits -= 5
  }

  return Math.floor( bits / 8 )

}

function decode( value ) {

  var offset = 0
  var length = decodingLength( value )
  var buffer = Buffer.alloc( length )

  var state = 0
  var bits = 0
  var pos = 0
  var index = 0
  var padding = false

  while( offset < value.length ) {

    if( value[ offset ] === PAD ) {
      offset++
      padding = true
      continue
    }

    if( padding ) {
      throw new Error( `Unexpected character "${ value[ offset ] }" after padding` )
    }

    pos = ALPHABET.indexOf( value[ offset ] )

    if( pos === -1 ) {
      throw new Error( `Invalid character "${value[ offset ]}" at offset ${offset}` )
    }

    state = ( state << 5 ) | pos
    bits += 5

    if( bits >= 8 ) {
      buffer[ index++ ] = ( state >>> ( bits - 8 ) ) & 0xFF
      bits -= 8
    }

    offset++

  }

  decode.bytes = offset

  return buffer

}

base32.encode = encode
base32.encode.bytes = 0
base32.encodingLength = encodingLength

base32.decode = decode
base32.decode.bytes = 0
base32.decodingLength = decodingLength
