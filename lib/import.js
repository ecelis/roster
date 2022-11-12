const zlib = require('zlib')
const {
  createReadStream
} = require('fs')

const unserialize = require('locutus/php/var/unserialize')

const src = createReadStream('./mock/TEST2021.ianseo')
// const dest = createWriteStream('TEBT2021.txt')

const chunks = []
let buffer
let serialized = ''

src.once('error', err => {
  console.error(err)
})

src.once('end', () => {
  buffer = Buffer.concat(chunks)
  serialized = zlib.inflateSync(buffer).toString()
  console.log('-------- serialized data begin --------')
  console.log(serialized)
  console.log('-------- serialized data end --------')
  unserialize(serialized)
  /* console.log('-------- raw data begin --------')
    console.log(raw)
    console.log('-------- raw data end --------')
*/
})

src.on('data', chunk => {
  chunks.push(chunk)
})
