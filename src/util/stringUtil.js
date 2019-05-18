/**
 * 文字列が空かどうか判定する
 * @param   string     value  判定対象文字列
 * @returns boolean    true...空 false...空でない
 */
export function	isNullOrEmpty(value) {
		//以下の場合空とみなす
		//null, 空文字, スペースのみで構成
		if (value === null) {
			return true;
		}
		if (value === "") {
			return true;
		}
		if (value.replace(" ", "") === "") {
			return true;
		}
		//いずれにも該当しない場合は空でないと判定
		return false;
	}
	
/**
 * 文字列の一文字目を取得する
 * @param   {string} value 対象文字列
 * @returns {string} 一文字目
 */
export function	getFirstChar (value) {		
		return value.slice(0, 1);
	}

/**
 * 文字列の任意の位置に指定文字列を挿入する
 * @param   {string} value       挿入元の文字列
 * @param   {number} index       挿入箇所
 * @param   {string} insertValue 挿入する文字列
 * @returns {string} 挿入後の文字列
 */
export function	insert(value, index, insertValue) {
		return value.slice(0, index) + insertValue + value.slice(index);
	}

/**
 * テキストをベースにHTMLタグつきのテキストを生成する
 * @param   {string} value 変換元テキスト
 * @param   {string} tag 生成するHTMLタグ
 * @param   {boolean} hasCloseTag 閉じタグを描画するか
 * @param   {string} attrClass クラス名(optional)                              
 * @param   {string} attr 属性名＋値(optional)
 * @returns {string} HTML形式のテキスト
 */
export function insertHTMLTag(value, tag, hasCloseTag, attrClass, attr) {
	let taggedText = "";
	//開始タグ
	taggedText += '<' + tag;
	//属性(optional)
	taggedText += attr ? (' ' + attr + ' ') : ('');
	//クラス(optional)
	taggedText += attrClass ? ' class="' + attrClass + '">' : '>';
	//テキスト
	taggedText += value;
	//閉じタグ
	taggedText += hasCloseTag ? ('</' + tag + '>') : '';
	
	return taggedText;
}

/**
 * 文字列の先頭から最初のスペースまでの部分文字列を取得する
 * @param   {string} value 分割対象文字列
 * @returns {string} スペースを含まない→空文字 含む→部分文字列　
 */
export function	substrByFirstSpace(value) {
		return value.substring(0, value.indexOf(' '));
	}

/**
 * 特定の記号で囲まれた文字列を取得する
 * @param   {string}   value 記号で囲まれた文字列
 * @param   {string} start 開始記号
 * @param   {string} end   終了記号
 * @param   {boolean} escapeMode 文字のエスケープが必要か
 * @returns {string} 囲まれた文字列
 */
export function getWrappedText(value, start, end, escapeMode) {
	start = escapeMode ? "\\" + start : start;
	end = escapeMode ? "\\" + end : end;
	let pattern = new RegExp("(?<=" + start + ").*?(?=" + end +  ")", "g");
	return value.match(pattern)[0];
	
}