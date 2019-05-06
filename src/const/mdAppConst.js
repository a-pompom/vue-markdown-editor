//定数

//行頭の記号で判定----------------------------------------------------------------------
//見出し
export const heading = {
	MAX_ATTRIBUTE: 6,
	MAX_MAIN_HEADING: 2
};

//リスト
export const mdList = {
	ACCEPT_SYMBOL_PATTERN: ["*", "-", "+"],
	ACCEPT_OL_REGEXP: /^[0-9]+[¥.]$/g	
};

//引用
export const quote = {
	ACCEPT_SYMBOL_PATTERN: [">"]
}

//行で判定-----------------------------------------------------------------------------
//下線
export const horizontalLine = {
	SYMBOL_COUNT: 3, //*** ---のように特定の記号が3つ並んだ状態で線を引く
	ACCEPT_SYMBOL_PATTERN: ["---", "***", "___"] //線を引くトリガーとなる記号のパターン
};

//コード
export const codeSnippet = {
	SYMBOL_COUNT: 3, //「```」のみトリガーとして受け付ける
	ACCEPT_SYMBOL_PATTERN: ["```"]
};

//部分文字で判定-----------------------------------------------------------------------
//リンク
export const link = {
	//[text](link)形式を含む文字列のみ受け付ける
	ACCEPT_REGEXP: /\[.*?\]\(.*?\)/g
};