import { randomBytes } from 'crypto';

export function generateRandomStringId(length: number) {
    const idRandomBytes = randomBytes(length);
	const randomString = idRandomBytes.toString("hex");
	return randomString;
}
