/*
 * Copyright © 2025-2026 Metreeca srl
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Criteria form value lexicon.
 *
 * Classifies form-encoded criteria values once for both the decoding grammar and the encoder, so any string the
 * encoder writes bare decodes back as the same string. The module is internal: none of its members is public API.
 *
 * @module
 */


/**
 * Matches a language tag. A value ending in `@` and such a tag decodes as a one-entry dictionary keyed by the tag.
 */
export const TagPattern = /^[a-zA-Z]{2,8}(?:-[a-zA-Z0-9]{1,8})*$/;

/**
 * Matches the text the decoder reads as a JSON number.
 */
export const NumberPattern = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/;

/**
 * Texts the decoder reads as JSON literals, or as the multi-valued wildcard, rather than as strings.
 */
const Keywords: ReadonlySet<string> = new Set([
	"true", "false", "null", "*"
]);


/**
 * Checks whether a string decodes as itself when written without quotes.
 *
 * @param value The string to check
 *
 * @returns `true` if `value` may be written without quotes; `false` if it must be double-quoted to decode as itself
 */
export function isBare(value: string): boolean {

	const suffix = /@([^@]*)$/.exec(value)?.[1];

	return !(Keywords.has(value)
		|| NumberPattern.test(value)
		|| (value.startsWith("\"") && value.endsWith("\""))
		|| (suffix !== undefined && TagPattern.test(suffix))
	);

}
