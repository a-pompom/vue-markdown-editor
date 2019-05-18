import * as stringUtil from './stringUtil.js';

/**
 * マークダウン用の記法をマークアップテキストで表示しないためにカットする
 * @param   {string}   targetText 変換対象テキスト
 * @param   {string} symbol カット対象
 * @returns {string} カット後のテキスト
 */
export function cutSymbol(targetText, symbol) {
	let cutIndex = (targetText.indexOf(' ') + 1);
	return targetText.substring(cutIndex);
}

/**
 * 閉じタグを付与するためにリスト、引用などの列挙型の記法が連続して記述されているか判定
 * @param   {string} currentSymbol 直前で記述された記号
 * @param   {string} textSymbol    新たに記述された記号 
 * @returns {boolean} 一致→true 一致しない→false
 */
export function hasSameSymbol(currentSymbol, textSymbol) {
	if (currentSymbol === textSymbol) {
		return true;
	}
	return false;
}

/**
 * 列挙型の閉じタグを生成する
 * @param   {string} renderMode 記法(例: 順序なしリスト→ul)
 * @returns {string} close tag
 */
export function getCloseTag(renderMode) {
	let closeTag = "";
	switch(renderMode) {
		case "ul":
			closeTag = '</ul>';
			break;
		case "ol":
			closeTag = '</ol>';
			break;
		default:
			break;
	}
	return closeTag;
}