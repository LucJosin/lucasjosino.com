const CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_';

/**
 * Generate a hash name
 * @param maxSize The max size of hash
 * @returns A string with the hash name
 */
function getHash(maxSize: number): string {
  let result = '';

  for (let i = 0; i < maxSize; i++) {
    result += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
  }

  return result;
}

/**
 * Creates a new hash generator class.
 */
export default class HashRenamer {
  /** The max size of the generated hash name */
  private maxSize = 8;

  /** A map from original CSS names to their renamed equivalents. */
  renames = new Map<string, string>();

  /** A lists containing all hashed names */
  values: string[] = [];

  /** Prefix to include before the hashed name */
  cssPrefix: string;

  /**
   * Creates a new hash generator class.
   * @param cssPrefix Prefix to include before the hashed name
   */
  constructor(cssPrefix: string) {
    this.cssPrefix = cssPrefix;
  }

  rename(key: string): string {
    let value = this.renames.get(key);

    // The key will be invalid when a hashed name is used as key
    const isInvalid = this.values.includes(key);

    if (isInvalid) return key;
    if (value) return value;

    value = this.cssPrefix + getHash(this.maxSize);

    this.renames.set(key, value);
    this.values.push(value);

    return value;
  }
}
