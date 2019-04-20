/** Contains application settings */
export const config = {
  /** Brand name for displaying it on layout elements and titles */
  brandName: "Strive",
  apiUrl: "http://localhost:10002",
  alerts: {
    /** Period in milliseconds for any alert to fade away automatically */
    autoDismissTimeout: 5000
  },
  cookies: {
    user: {
      /** Name for the key of cookie with user info */
      keyName: "user",
      /** Period in days for cookie with user info to be removed */
      expires: 7
    }
  }
};
