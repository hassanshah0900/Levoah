export type Roles = "admin" | "user";

declare global {
  interface CustomJwtSessionClaims {
    user_role?: Roles;
  }
}
