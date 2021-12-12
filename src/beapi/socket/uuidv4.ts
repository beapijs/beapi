// Source From: https://dirask.com/posts/JavaScript-UUID-function-in-Vanilla-JS-1X9kgD

function uuidv4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
    
    return v.toString(16)
  })
}

export {
  uuidv4,
}
