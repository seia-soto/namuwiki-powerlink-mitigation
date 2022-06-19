import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const isCI = typeof process.env.CI !== 'undefined';

const sourceDist = path.resolve(process.cwd(), 'dist');

const findDevsToReject = () => {
	const files = fs.readdirSync(sourceDist);

	for (let i = 0; i < files.length; i++) {
		if (files[i].includes('dev')) {
			throw new Error('USER_ERR_DEV_RSRC: this commit includes development resources!');
		}
	}
};

const checksum = () => {
	const source = fs.createReadStream(path.resolve(sourceDist, 'bundle.user.js'));
	const checksum = fs.readFileSync(path.resolve(sourceDist, 'checksum'));
	const hasher = crypto.createHash('md5');

	source.on('data', chunk => hasher.update(chunk));
	source.on('end', () => {
		source.close();

		const hash = hasher.digest('hex');

		if (hash !== checksum) {
			throw new Error('USER_ERR_CHECKSUM_MISMATCH: this commit includes mismatched checksum!');
		}
	});
};

(() => {
	console.time('post-check');

	if (isCI) {
		console.time('ci-exclusive-check');

		findDevsToReject();

		console.timeEnd('ci-exclusive-check');
	}

	checksum();

	console.timeEnd('post-check');
	process.exit(0);
})();
