function newRequestId(): number {
  return Math.round(Math.random() * 10000000000000000)
}

export {
  newRequestId,
}
