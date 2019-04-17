export function getPins(): object {
  const min = 111111111111
  const max = 9999999999999
  const pin = Math.floor(Math.random() * (+max - +min) + +min)
  const serial_no = Math.floor(Math.random() * (+max - +min) + +min)
  return { _pins: { pin, serial_no } }
}

export function timeStamp(): string {
  const date = new Date().getUTCDate(),
    hour = new Date().getUTCHours(),
    min = new Date().getUTCMinutes(),
    sec = new Date().getUTCSeconds(),
    mil_sec = new Date().getUTCMilliseconds()

  return `${date}-${hour}-${min}-${sec}-${mil_sec}`
}
