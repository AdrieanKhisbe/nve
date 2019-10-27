import isPlainObj from 'is-plain-obj'

// Validate `versionRange` and `versionRanges`. They can start with `v` or not.
// Further validation is done by `get-node`.
export const validateRanges = function(versionRanges) {
  if (!Array.isArray(versionRanges)) {
    throw new TypeError('Versions are missing')
  }
}

// Validate input parameters
export const validateBasic = function({ versionRange, command, args, opts }) {
  validateRange(versionRange)

  if (typeof command !== 'string') {
    throw new TypeError(`Second argument must be a command: ${command}`)
  }

  if (!isStringArray(args)) {
    throw new TypeError(`Third argument must be an array of strings: ${args}`)
  }

  if (!isPlainObj(opts)) {
    throw new TypeError(`Last argument must be an options object: ${opts}`)
  }
}

const validateRange = function(versionRange) {
  if (typeof versionRange !== 'string') {
    throw new TypeError(`Invalid version: ${versionRange}`)
  }
}

const isStringArray = function(args) {
  return Array.isArray(args) && args.every(isString)
}

const isString = function(arg) {
  return typeof arg === 'string'
}
