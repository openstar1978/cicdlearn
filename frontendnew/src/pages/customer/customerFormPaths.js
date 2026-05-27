export const CUSTOMER_FORM_PATH = '/customers/form';

export function buildCustomerFormSearch(accountRef) {
  const params = new URLSearchParams();
  params.set('m_accountrefchanged', 'YES');
  params.set('txt_loadleasedatafromdb', 'YES');
  params.set('txt_accountref', String(accountRef || '').trim());
  return `${CUSTOMER_FORM_PATH}?${params.toString()}`;
}

export function buildCustomerFormLocation(accountRef, extra = {}) {
  const params = new URLSearchParams();
  params.set('m_accountrefchanged', extra.m_accountrefchanged ?? 'YES');
  params.set('txt_loadleasedatafromdb', extra.txt_loadleasedatafromdb ?? 'YES');
  params.set('txt_accountref', String(accountRef || '').trim());
  if (extra.txt_mode) params.set('txt_mode', extra.txt_mode);
  if (extra.txt_nobuttons) params.set('txt_nobuttons', extra.txt_nobuttons);
  return { pathname: CUSTOMER_FORM_PATH, search: params.toString() };
}
