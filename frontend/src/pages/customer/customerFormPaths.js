/**
 * React route + query string aligned with legacy `cust_form.asp` links, e.g.
 * cust_form.asp?m_accountrefchanged=YES&txt_loadleasedatafromdb=YES&txt_accountref=ABBEYHEY
 */

export const CUSTOMER_FORM_PATH = '/customers/form'

/** @param {string} accountRef */
export function buildCustomerFormSearch(accountRef) {
  const ref = String(accountRef ?? '').trim()
  const p = new URLSearchParams()
  p.set('m_accountrefchanged', 'YES')
  p.set('txt_loadleasedatafromdb', 'YES')
  p.set('txt_accountref', ref)
  return `${CUSTOMER_FORM_PATH}?${p.toString()}`
}

/**
 * @param {string} accountRef
 * @param {Record<string, string>} [extra] e.g. txt_nobuttons: 'YES', txt_mode: 'edit'
 */
export function buildCustomerFormLocation(accountRef, extra = {}) {
  const ref = String(accountRef ?? '').trim()
  const p = new URLSearchParams()
  p.set('m_accountrefchanged', extra.m_accountrefchanged ?? 'YES')
  p.set('txt_loadleasedatafromdb', extra.txt_loadleasedatafromdb ?? 'YES')
  p.set('txt_accountref', ref)
  if (extra.txt_mode) p.set('txt_mode', extra.txt_mode)
  if (extra.txt_nobuttons) p.set('txt_nobuttons', extra.txt_nobuttons)
  return { pathname: CUSTOMER_FORM_PATH, search: p.toString() }
}
