import {StacheElement} from 'can';
import tpl from './tpl.stache';

export default class XComp extends StacheElement {
	static get view() {
		return tpl;
	}

	static get props() {
		return {
			message: {
				type: String,
				default: 'Hello Imported'
			}
		};
	}
}

customElements.define('x-comp', XComp);
