const defineAbility = require('../middlewares/authorization/defineAbility');

describe('CASL: Authorization Tests', () => {
  test('Student: Can read free TCode but not paid (unless valid customer)', () => {
    const abilityFree = defineAbility('student', 'free', false);
    const abilityLogin = defineAbility('student', 'login', false);
    const abilityPaid = defineAbility('student', 'paid', false);
    const abilityPaidValidCustomer = defineAbility('student', 'paid', true);

    // ✅ Student should be able to read free TCode
    expect(abilityFree.can('read', 'Tcode')).toBe(true);

    // ✅ Student should be able to read login TCode (since they are logged in)
    expect(abilityLogin.can('read', 'Tcode')).toBe(true);

    // ❌ Student should NOT be able to read paid TCode unless they are a valid customer
    expect(abilityPaid.can('read', 'Tcode')).toBe(false);

    // ✅ Student should be able to read paid TCode if they are a valid customer
    expect(abilityPaidValidCustomer.can('read', 'Tcode')).toBe(true);
  });

  test('Teacher: Can read and update all TCodes', () => {
    const abilityTeacher = defineAbility('teacher', 'free', false);
    const abilityTeacherPaid = defineAbility('teacher', 'paid', false);

    // ✅ Teachers should always be able to read any TCode
    expect(abilityTeacher.can('read', 'Tcode')).toBe(true);
    expect(abilityTeacherPaid.can('read', 'Tcode')).toBe(true);

    // ✅ Teachers should be able to update TCodes
    expect(abilityTeacher.can('update', 'Tcode')).toBe(true);
  });

  test('Admin: Can manage all TCodes', () => {
    const abilityAdmin = defineAbility('admin', 'free', false);

    // ✅ Admins should have full control (manage = CRUD)
    expect(abilityAdmin.can('manage', 'Tcode')).toBe(true);
    expect(abilityAdmin.can('update', 'Tcode')).toBe(true);
  });

  test('Unauthenticated User: Can only read free TCode', () => {
    const abilityUnauthenticatedFree = defineAbility(null, 'free', false);
    const abilityUnauthenticatedLogin = defineAbility(null, 'login', false);
    const abilityUnauthenticatedPaid = defineAbility(null, 'paid', false);

    // ✅ Unauthenticated users should be able to read free TCode
    expect(abilityUnauthenticatedFree.can('read', 'Tcode')).toBe(true);

    // ❌ Unauthenticated users should NOT be able to read login/paid TCodes
    expect(abilityUnauthenticatedLogin.can('read', 'Tcode')).toBe(false);
    expect(abilityUnauthenticatedPaid.can('read', 'Tcode')).toBe(false);
  });
});
