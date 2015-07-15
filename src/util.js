/**
 * Convenience function for `getElementsByClassName`
 * @param {string} cls DOM class
 * @param {Element} [el] Optional element to call into
 */
export function byClass(cls, el) {
  if (el) return [].slice.call(el.getElementsByClassName(cls));
  return [].slice.call(document.getElementsByClassName(cls));
}

/**
 * Convenience function for `getElementById`
 * @param {string} cls DOM class
 * @param {Element} [el] Optional element to call into
 */
export function byId(id, el) {
  if (el) return el.getElementById(id);
  return document.getElementById(id);
}

/**
 * Convenience function for setting `innerHTML`
 * @param {Element} el      DOM element
 * @param {string} content innerHTML content
 */
export function setContent(el, content) {
  el.innerHTML = content;
}

/**
 * Convenience function for `addEventListener`
 * @param  {Element}   el        DOM element
 * @param  {string}   eventName Event name to listen for
 * @param  {Function} cb        Event handler
 */
export function on(el, eventName, cb) {
  el.addEventListener(eventName, cb);
}
