/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

const SAFE_PART = 0x1fffffffff;
const COUNT = 4;
const arr = [0, 0, 0, 0, 0];
const primes = [3, 7, 17, 19];

module.exports = (str, range) => {
	if (range > SAFE_PART) throw new Error("Hash is unstable to such big ranges");
	arr.fill(0);
	for (let i = 0; i < str.length; i++) {
		const c = str.charCodeAt(i);
		for (let j = 0; j < COUNT; j++) {
			const p = (j + COUNT - 1) % COUNT;
			arr[j] = (arr[j] + c * primes[j] + arr[p]) & SAFE_PART;
		}
		for (let j = 0; j < COUNT; j++) {
			const q = arr[j] % COUNT;
			arr[j] = arr[j] ^ (arr[q] >> 1);
		}
	}
	for (let j = COUNT - 1; j > 0; j--) {
		arr[j - 1] = (arr[j - 1] + arr[j]) % range;
	}
	return arr[0];
};
