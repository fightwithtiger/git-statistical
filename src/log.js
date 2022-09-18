export function drawTable(arrMap) {
  function getRealLength(str) {
    let length = 0
    for (let i = 0; i < str.length; i++) {
      length += (str.charCodeAt(i) > 127 ? 2 : 1)
    }
    return length
  }

  function getArrAttr(el) {
    return {
      keyLen: getRealLength(` ${el[0]}  `),
      valLen: getRealLength(` ${el[1]}  `),
      key: ` ${el[0]}  `,
      val: ` ${el[1]}  `,
    }
  }

  function getObjAttr(el) {
    return Object
      .keys(el)
      .map(e => ({
      keyLen: getRealLength(` ${e}  `),
      valLen: getRealLength(` ${el[e]}  `),
      key: ` ${e}  `,
      val: ` ${el[e]}  `,
    }))
  }

  const parsedMap = arrMap.map(e => Array.isArray(e) ? getArrAttr(e) : getObjAttr(e))
  let maxKeyLen = 0
  let maxValLen = 0
  parsedMap.forEach(e => {
    if (Array.isArray(e)) {
      e.forEach(c => {
        maxKeyLen = c.keyLen > maxKeyLen ? c.keyLen : maxKeyLen
        maxValLen = c.valLen > maxValLen ? c.valLen : maxValLen
      })
    } else {
      maxKeyLen = e.keyLen > maxKeyLen ? e.keyLen : maxKeyLen
      maxValLen = e.valLen > maxValLen ? e.valLen : maxValLen
    }
  })

  const divider = `+${Array(maxKeyLen).fill('-').join('')}-${Array(maxValLen).fill('-').join('')}+\n`
  const str = parsedMap.map(e => {
    if (Array.isArray(e)) {
      return e.map(c => {
        c.keyLen < maxKeyLen && (c.key = c.key + Array(maxKeyLen - c.keyLen).fill(' ').join(''))
        c.valLen < maxValLen && (c.val = c.val + Array(maxValLen - c.valLen).fill(' ').join(''))
        return `|${c.key}|${c.val}|`
      }).join('\n') + '\n'
    } 

    e.keyLen < maxKeyLen && (e.key = e.key + Array(maxKeyLen - e.keyLen).fill(' ').join(''))
    e.valLen < maxValLen && (e.val = e.val + Array(maxValLen - e.valLen).fill(' ').join(''))
    return `|${e.key}|${e.val}|\n`
  }).join(divider)

  console.log(`${divider}${str}${divider}`)
}
