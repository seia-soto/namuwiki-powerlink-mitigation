// @ts-expect-error
// eslint-disable-next-line no-undef
const frame: typeof window = unsafeWindow || window;

const state = {
	secret: Math.random() + (Date.now() * Math.random()).toString(36),
};

const log = new Proxy(
	console.log,
	{
		apply(target, thisArg, argArray) {
			Reflect.apply(target, thisArg, ['[namuwiki-powerlink-mitigation]', ...argArray]);
		},
	},
);

frame.open = new Proxy(
	frame.open,
	{
		apply(target, thisArg, argArray) {
			const [href] = argArray as string[];

			const bypassHandler = () => Reflect.apply(target, thisArg, argArray);

			if (argArray.indexOf(state.secret) >= 0) {
				return href;
			}

			return bypassHandler();
		},
	},
);

frame.HTMLTableElement.prototype.appendChild = new Proxy(
	frame.HTMLTableElement.prototype.appendChild,
	{
		apply(target, thisArg: HTMLTableElement, argArray) {
			const [child] = argArray as HTMLElement[];
			const bypassHandler = () => Reflect.apply(target, thisArg, argArray);

			if (
				!(child instanceof HTMLElement)
				|| !child.querySelectorAll('img').length
			) {
				return bypassHandler();
			}

			const innerLinks = child.querySelectorAll('a');

			for (const link of innerLinks) {
				const original = frame.open;
				let isPowerlinkAd = false;

				frame.open = new Proxy(
					frame.open,
					{
						apply(target, thisArg, argArray) {
							argArray.push(state.secret);

							const result = Reflect.apply(target, thisArg, argArray);

							if (
								typeof result === 'string'
								&& (
									result.includes('saedu.naver.com/adbiz/searchad/')
									|| result.includes('adcr.naver.com/adcr?x=')
								)
							) {
								isPowerlinkAd = true;
							}

							return result;
						},
					},
				);

				link.click();

				frame.open = original;

				if (isPowerlinkAd) {
					setTimeout(() => {
						log('removing the target element');

						thisArg.remove();
					}, 1);

					return child;
				}
			}
		},
	},
);
