const crypto = require("crypto");

const MAX_PARTITION_KEY_LENGTH = 256
const TRIVIAL_PARTITION_KEY = "0"

const sanitizeKey = ( key ) => {

  if( typeof key !== "string" )
    key = JSON.stringify( key )

  if( key.length > MAX_PARTITION_KEY_LENGTH )
    key = hashKey( key )

  return key

}

const getKey = ( event ) => event ? event.partitionKey ?? hashKey( JSON.stringify( event ) ) : TRIVIAL_PARTITION_KEY

const hashKey = ( key ) => crypto.createHash("sha3-512").update( key ).digest( 'hex' )

const deterministicPartitionKey = ( event ) => {
  
  // get the key form input
  let candidate = getKey( event )

  // make key to fit requirements
  candidate = sanitizeKey( candidate )

  return candidate
}



module.exports = { deterministicPartitionKey }