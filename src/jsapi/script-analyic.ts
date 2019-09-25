export default function analyicScript() {
  let doc = document
  let scripts = doc.getElementsByTagName('script')
  let query = null,
    src
  if (scripts.length) {
    for (let i = 0, l = scripts.length; i < l; i++) {
      src = scripts[i].getAttribute('src')
      if (src && src.indexOf('jsapi.') > 0) {
        query = src.substring(src.indexOf('?') + 1)
        if (query) {
          query = query.split('&')
        }
      }
    }
  }
  return query
}
