// @ts-expect-error
// eslint-disable-next-line no-undef
const frame: typeof window = unsafeWindow || window;

const key = 'INITIAL_STATE';
const state = {
	[key]: [] as unknown[],
	fired: false,
	warningShown: false,
};

const appendWarning = () => {
	if (state.warningShown) {
		return;
	}

	const ruid = (Date.now() * Math.random() * Math.atanh(Date.now())).toString(36).slice(0, 6);

	frame.document.querySelector('div#app>div[id]>div+div')?.insertAdjacentHTML(
		'beforebegin',
		`
<div id="${ruid}">
  <style>
    #${ruid} { padding: 2px 16px; }
  </style>
  <p>
    <strong>namuwiki-powerlink-mitigation</strong>
    광고 값이 정상적으로 차단되지 않았을 수 있습니다.
    아래에서 속성 값을 복사하여
    <a
      href="https://github.com/seia-soto/namuwiki-powerlink-mitigation/issues"
    >여기</a>에서 제보해주세요.
    <br/>

    <button>속성 값 보기</button>
  </p>
</div>
`,
	);

	const inserted = frame.document.getElementById(ruid);

	inserted
		?.querySelector('button')
		?.addEventListener('click', () => {
			const content = JSON.stringify({
				[key]: state[key],
				ua: navigator.userAgent,
			})
				.replace(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/g, 'IP_ADDR_HIDDEN');

			frame.prompt('Please copy to clipboard', content);
		}, {once: true});

	state.warningShown = true;
};

const defusePowerlink = (root: object) => {
	for (const property in root) {
		if (typeof root[property] === 'object') {
			root[property] = defusePowerlink(root[property]);
		} else if (property === 'enable_ads' && !isNaN(root[property])) {
			console.log('[namuwiki-powerlink-mitigation] defused namuwiki powerlink');

			root[property] = '0';
			state.fired = true;
		}
	}

	return root;
};

Object.defineProperty(
	frame,
	key,
	{
		get() {
			return state[key][state[key].length - 1];
		},
		set(v) {
			state[key].push(defusePowerlink(v));

			if (!state.fired) {
				appendWarning();
			}
		},
	},
);
