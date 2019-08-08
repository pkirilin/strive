/**
 * Validation statuses
 *
 * default - no highlighting
 * valid - highlights as valid ("green") field
 * invalid - highlights as invalid ("red") field
 */
export const validationStatuses = {
  default: "default",
  valid: "valid",
  invalid: "invalid"
};

/** Regex validation constants */
export const validationRegexes = {
  /** RFC 5322 general email regex */
  EMAIL: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

  /** Common username regex */
  USERNAME: /^(?=.{4,20}$)(?![0-9_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/
};
