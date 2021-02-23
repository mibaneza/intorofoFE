export function ValidateRol(role: string): string {
    switch (role) {
      case 'ROLE_CEO': {
        return  'ceo';
        break;
      }
      case 'ROLE_SENIOR': {
        return'senior';
        break;
      }
      case 'ROLE_ADMIN': {
        return  'admin';
        break;
      }
      case 'ROLE_SUPPORT': {
        return 'support';
        break;
      }
      default: {
        return  'user';
        break;
      }
    }
}
