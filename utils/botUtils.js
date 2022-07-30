/**
 * Formats mujltiple new-lines strings into 1 string (for better readability)
 * @param  {...string} lines Each text-line 
 * @returns string
 */
const newLiner = (...lines) => lines.join("\n");

/**
 * Formats and returns the valid Channel-mention, if it's undefined, then unknown Channel ofc.
 * @param {string|any} input ChannelId 
 * @returns "mention"-String
 */
const parseChannelMention = (input) => typeof input === "string" && input.length > 5 ? `<#${input}>` : `#Unknown-Channel`

/**
 * Formats and returns the valid User-mention, if it's undefined, then unknown User ofc.
 * @param {string|any} input User-Id 
 * @returns "mention"-String
 */
const parseUserMention = (input) => typeof input === "string" && input.length > 5 ? `<@!${input}>` : `@Unknown-User`

/**
 * Formats the message content and matches 
 * @param {string} str String to replace the REGEX 
 * @returns string
 */
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);

/**
 * Blocks the process
 * @param {number} ms 
 * @returns {Promise<*>}
 */
const delay = (ms) => new Promise(r => setTimeout(() => r(2)), ms);

/**
 * Formats an MS Timestamp to an UNIX Timestamp
 * @param {number} number 
 * @returns Number:UnixTimestamp
 */
const msUnix = (number) => Math.floor(number / 1000);

/**
 * Formats a Username for letters and numbers.
 * @param {string} username 
 * @returns Formatted Username, so it's valid for a filename
 */
const transformUsername = (username) => username.replace(/[^a-z0-9]/gi, '_').toLowerCase();

module.exports = {
    delay,
    newLiner, parseChannelMention, parseUserMention, escapeRegex, msUnix, transformUsername
}