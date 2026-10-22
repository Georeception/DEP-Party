import {
  getMembershipAmount,
  isFreeRegistrationPeriod,
  membershipPlans,
} from './membershipPlans';

describe('membership plans', () => {
  test('offers five general plans and five youth and disability plans', () => {
    expect(membershipPlans).toHaveLength(5);
    expect(membershipPlans.filter((plan) => plan.youthAmount !== null)).toHaveLength(5);
    expect(membershipPlans.some((plan) => plan.id === 'mwananchi')).toBe(false);
  });

  test('uses the supplied general and youth/PWD rates', () => {
    const mca = membershipPlans.find((plan) => plan.id === 'mca');
    const governor = membershipPlans.find((plan) => plan.id === 'governor');

    expect(getMembershipAmount(mca, 'general')).toBe(5000);
    expect(getMembershipAmount(mca, 'youth_pwd')).toBe(2500);
    expect(getMembershipAmount(governor, 'general')).toBe(50000);
    expect(getMembershipAmount(governor, 'youth_pwd')).toBe(25000);
  });

  test('keeps registration free through 30 November in Nairobi time', () => {
    expect(isFreeRegistrationPeriod(new Date('2026-11-30T20:59:59.000Z'))).toBe(true);
    expect(isFreeRegistrationPeriod(new Date('2026-11-30T21:00:00.000Z'))).toBe(false);
  });
});
