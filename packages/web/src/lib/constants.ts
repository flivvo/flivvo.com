export const APP_TITLE = "Flivvo";
export const DATABASE_PREFIX = "flivvo_v1";
export const EMAIL_SENDER = '"Flivvo" <noreply@acme.com>';

export const redirects = {
  toLogin: "/login",
  toSignup: "/signup",
  afterLogin: "/dashboard",
  afterLogout: "/",
  toVerify: "/verify-email",
  afterVerify: "/dashboard",
} as const;
