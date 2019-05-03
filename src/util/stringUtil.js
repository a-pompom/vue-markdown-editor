export default {
	/**
	 * 文字列が空かどうか判定する
	 * @param   string  value 判定対象文字列
	 * @returns boolean true...空 false...空でない
	 */
	isNullOrEmpty: function(value) {
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
	},
	
	/**
	 * 文字列の一文字目を取得する
	 * @param   {string}   value 対象文字列
	 * @returns {string} 一文字目
	 */
	getFirstChar(value) {
		return value.charAt(0);
	},
	
	/**
	 * 文字列の任意の位置に指定文字列を挿入する
	 * @param   {string} value 挿入元の文字列
	 * @param   {number} index  挿入箇所
	 * @param   {string} insertValue 挿入する文字列
	 * @returns {string} 挿入後の文字列
	 */
	insert(value, index, insertValue) {
		return value.slice(0, index) + insertValue + value.slice(index);
	}
}