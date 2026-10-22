export const FREE_REGISTRATION_END = '2026-11-30';

export const membershipCategories = [
  { id: 'general', label: 'General' },
  { id: 'youth_pwd', label: 'Youth & people with disability' },
];

export const membershipPlans = [
  {
    id: 'mca',
    title: 'MCA',
    position: 'Member of the County Assembly',
    description: 'For aspiring and serving Members of County Assembly.',
    generalAmount: 5000,
    youthAmount: 2500,
    features: ['County Assembly representation', 'Champion your community at county level'],
  },
  {
    id: 'mp',
    title: 'MP',
    position: 'Member of the National Assembly',
    description: 'For aspiring and serving Members of Parliament.',
    generalAmount: 10000,
    youthAmount: 5000,
    features: ['National representation', 'Shape policy and legislation'],
  },
  {
    id: 'women_rep',
    title: 'Women Rep',
    position: 'County Woman Representative',
    description: 'For aspiring and serving Women Representatives.',
    generalAmount: 10000,
    youthAmount: 5000,
    features: ['Represent women in Parliament', 'Advance opportunity and inclusion'],
  },
  {
    id: 'senator',
    title: 'Senator',
    position: 'Senator',
    description: 'For aspiring and serving Senators.',
    generalAmount: 10000,
    youthAmount: 5000,
    features: ['Represent your county in the Senate', 'Strengthen devolution and oversight'],
  },
  {
    id: 'governor',
    title: 'Governor',
    position: 'Governor',
    description: 'For aspiring and serving Governors.',
    generalAmount: 50000,
    youthAmount: 25000,
    features: ['Lead county government', 'Deliver accountable, people-centred leadership'],
  },
];

export const getMembershipAmount = (plan, category) => {
  if (!plan) return 0;
  return category === 'youth_pwd' ? plan.youthAmount : plan.generalAmount;
};

export const isFreeRegistrationPeriod = (now = new Date()) => {
  const parts = new Intl.DateTimeFormat('en', {
    timeZone: 'Africa/Nairobi',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now);
  const date = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  const nairobiDate = `${date.year}-${date.month}-${date.day}`;
  return nairobiDate <= FREE_REGISTRATION_END;
};
