import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import http from 'node:http';
import fsSync from 'node:fs';
import path from 'node:path';
import chokidar from 'chokidar';
import esbuild from 'esbuild';
import serve from 'serve-handler';

const isDev = typeof process.env.DEBUG !== 'undefined';

const cwd = process.cwd();
const sourceRoot = path.resolve(cwd, 'src');
const sourceDist = path.resolve(cwd, 'dist');

const files = {
	dist: {
		bundle: path.resolve(sourceDist, 'bundle.js'),
		header: path.resolve(sourceDist, 'header.js'),
		script: path.resolve(sourceDist, 'bundle.user.js'),
		checksum: path.resolve(sourceDist, 'checksum'),
	},
	source: {
		entry: path.resolve(sourceRoot, 'index.ts'),
	},
};

if (isDev) {
	files.dist.bundle = path.resolve(sourceDist, 'bundle.dev.js');
	files.dist.script = path.resolve(sourceDist, 'bundle.dev.user.js');
	files.dist.checksum = path.resolve(sourceDist, 'checksum.dev');

	const devHeader = path.resolve(sourceDist, 'header.dev.js');

	if (fsSync.existsSync(devHeader)) {
		files.dist.header = devHeader;
	}
}

const locks = {
	build: 0,
	buildQueue: 0,
};

const transform = async () => {
	await esbuild
		.build({
			entryPoints: [files.source.entry],
			outfile: files.dist.bundle,
			platform: 'browser',
			format: 'iife',
			bundle: true,
			minify: !isDev,
		});
};

const merge = () => new Promise(resolve => {
	const checksum = crypto.createHash('md5');

	const out = fsSync.createWriteStream(files.dist.script, {encoding: 'utf-8'});
	const header = fsSync.readFileSync(files.dist.header);
	const bundle = fsSync.createReadStream(files.dist.bundle);

	out.write(header);
	out.write('\n');

	checksum.update(header);
	checksum.update('\n');

	bundle.on('data', chunk => {
		out.write(chunk);
		checksum.update(chunk);
	});
	bundle.on('end', () => {
		bundle.close();
		out.close();

		fsSync.writeFileSync(files.dist.checksum, checksum.digest('hex'));

		resolve();
	});
});

const build = async () => {
	if (locks.build) {
		locks.buildQueue = 1;

		return;
	}

	locks.build = 1;

	console.time('build');

	await transform();
	await merge();

	console.timeEnd('build');

	locks.build = 0;

	if (locks.buildQueue) {
		locks.buildQueue = 0;

		return build();
	}
};

const hash = content => crypto.createHash('md5').update(content).digest('hex');

const watch = async () => {
	const hashes = {};

	const handleBuild = async location => {
		const content = await fs.readFile(location, 'utf-8');
		const lastHash = hash(content);

		if (lastHash !== hashes[location]) {
			console.log('diff: %s (hash: %s)', location, lastHash);

			hashes[location] = lastHash;

			await build();
		}
	};

	chokidar.watch(sourceRoot, {persistent: true})
		.on('unlink', async location => {
			console.log('del: %s', location);

			delete hashes[location];
		})
		.on('add', handleBuild)
		.on('change', handleBuild);

	const server = http.createServer((req, res) => serve(req, res, {public: sourceDist}));

	server.listen(9090, () => {
		const {address, port} = server.address();

		console.log('deploy: %s', address + port);
	});
};

const script = async () => {
	if (isDev) {
		await build();
		await watch();
	} else {
		await build();
	}
};

script();
