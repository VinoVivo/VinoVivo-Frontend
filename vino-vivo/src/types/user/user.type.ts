export interface RealmAccess {
    roles: string[];
  }
  
  export interface DecodedToken {
    exp?: number;
    iat?: number;
    realm_access?: RealmAccess;
    name?: string;
    preferred_username?: string;
    email?: string;
  }
  