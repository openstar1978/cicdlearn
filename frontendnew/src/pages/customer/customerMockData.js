export const MOCK_SECTORS = [
  { id: 1, description: 'Corporate IT' },
  { id: 2, description: 'Retail' }
];

export const MOCK_LEGAL_STATUSES = [
  { id: 10, parentId: 1, description: 'Limited Company' },
  { id: 11, parentId: 1, description: 'Partnership' },
  { id: 20, parentId: 2, description: 'Sole Trader' }
];

export const MOCK_CUSTOMERS = [
  {
    id: 0,
    accountRef: 'ABBEYHEY',
    name: 'Abbey Hey Demo Ltd',
    town: 'Manchester',
    county: 'Greater Manchester',
    postcode: 'M18 8AA',
    contact: 'Demo Contact',
    phone: '0161 555 0199',
    sectorId: 1,
    legalStatusId: 10,
    notes: 'Sample customer matching the legacy ACC REF example.',
    website: 'https://example.com',
    paperInvoices: true,
    emailInvoices: true,
    email: 'accounts@abbeyhey.demo'
  },
  {
    id: 1,
    accountRef: 'ACC1001',
    name: 'Acme Rentals Ltd',
    town: 'Manchester',
    county: 'Greater Manchester',
    postcode: 'M1 1AE',
    contact: 'Ms Jones',
    phone: '0161 555 0101',
    sectorId: 2,
    legalStatusId: 20,
    emailInvoices: true,
    email: 'hire@acme.demo'
  },
  {
    id: 2,
    accountRef: 'ACC2044',
    name: 'Brighton Tech Hire',
    town: 'Brighton',
    county: 'East Sussex',
    postcode: 'BN1 1AA',
    contact: 'Mr Patel',
    phone: '01273 555 0202',
    sectorId: 1,
    legalStatusId: 11,
    notes: 'Overdue balance on sample data.',
    paperInvoices: true
  }
];

export const MOCK_LEASE_ROWS = [
  {
    id: 100,
    accountRef: 'ABBEYHEY',
    name: 'Abbey Hey Demo Ltd',
    postcode: 'M18 8AA',
    contact: 'Demo Contact',
    phone: '0161 555 0199',
    leaseId: 4999,
    leaseDesc: 'Demo lease',
    startDate: '2025-01-01',
    endDate: '2028-12-31',
    paymentAmount: 199,
    leaseStatus: 'ActivePrim',
    termination: 'NO',
    payFreq: 'Monthly'
  },
  {
    id: 101,
    accountRef: 'ACC1001',
    name: 'Acme Rentals Ltd',
    postcode: 'M1 1AE',
    contact: 'Ms Jones',
    phone: '0161 555 0101',
    leaseId: 5001,
    leaseDesc: 'Office laptops x12',
    startDate: '2024-01-15',
    endDate: '2027-01-14',
    paymentAmount: 420,
    leaseStatus: 'ActivePrim',
    termination: 'NO',
    payFreq: 'Monthly'
  }
];

export function findCustomerByAccountRef(ref) {
  const normalized = String(ref || '')
    .trim()
    .toUpperCase();
  return MOCK_CUSTOMERS.find((customer) => customer.accountRef.toUpperCase() === normalized) || null;
}

export function leasesForAccount(accountRef) {
  const normalized = String(accountRef || '')
    .trim()
    .toUpperCase();
  return MOCK_LEASE_ROWS.filter((lease) => lease.accountRef.toUpperCase() === normalized);
}
