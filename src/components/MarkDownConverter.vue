<template>
	<div></div>
</template>

<script>
	import * as stringUtil from '../util/stringUtil.js';
	import * as helper from '../util/markdownConverterHelper.js';
	import * as appConst from '../const/mdAppConst.js';
	export default {
		props: {
			markdownText: String
		},
		data() {
			return {
				//変換前、変換後テキスト
				markdownTextArray: [],
				convertedHTMLTextArray: [],			
				codeBlockMode: false,
				//行頭で宣言されたマークダウン記法用の記号
				mdSymbol: "", 
				//リスト、引用など連続して同一要素を描画するフラグ、対象を管理
				renderMode: {mode: "", symbol: ""},
				
				//変換処理
				converterList: [
					//行頭の記号で判定
					//	見出し
					{convertFunc: this.convertHeading, useHeadSymbol: true}, 
					//	リスト
					{convertFunc: this.convertList, useHeadSymbol: true},
					//	引用
					{convertFunc: this.convertQuote, useHeadSymbol: true},
					//行で判定
					//	下線
					{convertFunc: this.convertHorizontalLine, useHeadSymbol: false}, 
					//	コードスニペット
					{convertFunc: this.convertCodeSnippet, useHeadSymbol: false},
					//部分文字で判定
					//	リンク
					{convertFunc: this.convertLink, useHeadSymbol: false}
				]
			}
		},
		
		watch: {
			/**
			 * エンターキーが押されると発火。 
			 */
			markdownText() {
				//行単位で処理するために改行コードで分割
				this.markdownTextArray = this.markdownText.split(/\r\n|\r|\n/);
				this.convertedHTMLTextArray = [];
				this.codeBlockMode = false;
				
				//「this」をvueインスタンスとするためアロー関数で処理
				this.markdownTextArray.forEach((element) =>{
					//差分で描画するとタグの並びに不整合が生じてしまうので、逐一全て再描画する
					this.markdownConvertToHTML(element);
				});
				
				//変換結果を渡し再描画
				this.$emit("converted", this.convertedHTMLTextArray);
			}
		},
		
		methods: {
			/**
			 * マークダウンテキストをマークアップテキストへ変換する
			 * @param {string} targetText 1行分のマークダウンテキスト
			 */
			markdownConvertToHTML(targetText) {
				//描画モードが変化した場合は閉じタグなどの終了処理を実行
				this.mdSymbol = stringUtil.substrByFirstSpace(targetText);
				if(!stringUtil.isNullOrEmpty(this.renderMode.symbol) &&
				   		!helper.hasSameSymbol(this.renderMode.symbol, this.mdSymbol)) {
					targetText = stringUtil.insert(targetText, 0, helper.getCloseTag(this.renderMode.mode));
					//描画モードを初期化
					this.renderMode.mode = "";
					this.renderMode.symbol = "";
				}
				
				//コードスニペット内では変換処理が不要となるのでスキップ　
				if (this.codeBlockMode) {
					//再度「```」が挿入されたときをコードスニペットの終了判定とするため監視
					targetText = this.convertCodeSnippet(targetText);
					targetText += "<br>";
					this.convertedHTMLTextArray.push(targetText);
					return;
				}
				
				//空文字の場合は変換する必要がないのでスキップ
				if (stringUtil.isNullOrEmpty(targetText)){
					targetText = "<br>";
					this.convertedHTMLTextArray.push(targetText);
					return;
				}
				
				//変換関数を行要素に逐一適用
				this.converterList.forEach((converter) => {
					//行頭の記号＋スペースで表される記法はmdSymbolが空だった時点で変換処理は不要となるのでスキップ
					if (converter.useHeadSymbol && stringUtil.isNullOrEmpty(this.mdSymbol)) {
						return;
					}

					targetText = converter.convertFunc(targetText);
				});
				
				
				//変換対象とならなかったプレーンなテキストは描画が崩れないよう<p>タグで囲う
				if (!this.codeBlockMode && stringUtil.getFirstChar(targetText) !== '<') {
					targetText = stringUtil.insertHTMLTag(targetText, 'p', true, '');
				}
				
				this.convertedHTMLTextArray.push(targetText);
			},
			
			//変換関数ここから-----------------------------------------
			
			/**
			 * 見出しの変換処理を行う
			 * @param   {string} targetText - マークダウンで記述された一行のテキスト
			 * @returns {string} 変換処理後のテキスト
			 */
			convertHeading(targetText) {
				//見出しとして「#」を対応するheadingタグへ変換
				if (this.mdSymbol.includes("#")) {
					//headingタグの属性部分は「#」記号の数と対応しているので、個数を取得
					let headingAttr = this.mdSymbol.split("#").length - 1;
					//「##」まではメインコンテンツとして下線を付与
					let classAttr = '';
					if (headingAttr <= appConst.heading.MAX_MAIN_HEADING) {
						classAttr += 'main-text';
					}
					
					// #はh6までにのみ対応		
					if (headingAttr <= appConst.heading.MAX_ATTRIBUTE) {
						//「# text」→「<h1 class="main-text">text</h1>のような形式で変換
						targetText = helper.cutSymbol(targetText, this.mdSymbol);
						targetText = stringUtil.insertHTMLTag(
							targetText, 'h' + headingAttr, true, classAttr);
					}
				}
				return targetText;
			},
			
			/**
			 * リスト表記の変換処理を行う
			 * @param   {string} targetText 処理対象テキスト
			 * @returns {string} 変換処理後のテキスト
			 */
			convertList(targetText) {
				//「1. text」のようなOL記法表記となっているか
				let hasOLSymbol = appConst.mdList.ACCEPT_OL_REGEXP.test(this.mdSymbol);
				// 「* text」のようなUL記法表記となっているか
				let hasULSymbol = appConst.mdList.ACCEPT_SYMBOL_PATTERN.indexOf(this.mdSymbol) >= 0
				//リスト表記が存在する場合はリストを描画
				//入れ子にも対応したい...
				if (hasOLSymbol || hasULSymbol) {
					//リストが新たに描画される場合はリストタグを付与
					if (stringUtil.isNullOrEmpty(this.renderMode.symbol)) {
						let mode = hasOLSymbol ? "ol" : "ul";
						this.renderMode.mode = mode;
						this.renderMode.symbol = this.mdSymbol;
						
						//タグは内から外へ付与されるのでli→ulの順で付与
						targetText = helper.cutSymbol(targetText, this.mdSymbol);
						targetText = stringUtil.insertHTMLTag(targetText, 'li', true, '');
						targetText = stringUtil.insertHTMLTag(targetText, mode, false, '');
						return targetText;
					}
					targetText = helper.cutSymbol(targetText, this.mdSymbol);
					targetText = stringUtil.insertHTMLTag(targetText, 'li', true, '');
					return targetText;
				}
				return targetText;
			},
			
			/**
			 * 引用表記の変換処理を行う
			 * @param   {string} targetText 処理対象テキスト
			 * @returns {string} 変換処理後のテキスト
			 */
			convertQuote(targetText) {
				//quoteクラスを付与したpタグへ変換することで実現
				if (appConst.quote.ACCEPT_SYMBOL_PATTERN.indexOf(this.mdSymbol) >= 0) {
					targetText = helper.cutSymbol(targetText, this.mdSymbol);
					targetText = stringUtil.insertHTMLTag(targetText, 'p', true, 'quote');
					this.renderMode.mode = "quote";
					this.renderMode.symbol = this.mdSymbol;
					
					return targetText;
				}
				return targetText;
			},
			
			/**
			 * 下線の変換処理を行う
			 * @param   {string} targetText 処理対象テキスト
			 * @returns {string} 変換処理後のテキスト
			 */
			convertHorizontalLine(targetText){
				//下線に変換する文字列パターンであった場合のみ、下線へ変換
				//それ以外はそのままreturn
				if (targetText.length !== appConst.horizontalLine.SYMBOL_COUNT) {
					return targetText;
				}
				if (appConst.horizontalLine.ACCEPT_SYMBOL_PATTERN.indexOf(targetText) >= 0) {
					targetText = "<hr>";
				}
				
				return targetText;
			},
			
			/**
			 * コードスニペットの変換処理を行う
			 * @param   {string} targetText 処理対象テキスト
			 * @returns {string} 変換処理後のテキスト
			 */
			convertCodeSnippet(targetText) {
				//行テキストがコードスニペット記法「```」か
				if (appConst.codeSnippet.ACCEPT_SYMBOL_PATTERN.indexOf(targetText) >= 0) {
					//1回目はコード埋め込み処理開始のためpre, codeタグを付与し、
					//2回目は処理終了のため閉じタグを挿入
					if (this.codeBlockMode){
						targetText = "</code></pre>";
						this.codeBlockMode = false;
						
						return targetText;
					}
					targetText = "<pre><code>";
					this.codeBlockMode = true;
					return targetText;
				}
				return targetText;
			},
			
			/**
			 * リンク形式文字列の変換処理を行う
			 * @param   {string} targetText 処理対象テキスト
			 * @returns {string} 変換処理後のテキスト
			 */
			convertLink(targetText) {
				//[text](url)形式で記述されているか
				if (appConst.link.ACCEPT_REGEXP.test(targetText)) {
					let linkText = targetText.match(appConst.link.ACCEPT_REGEXP)[0];
					let linkHTML = '';
					
					//[text](link)を<a href="link">text</a>へ変換
					let anchorText = stringUtil.getWrappedText(linkText, "[", "]", true);
					let url = stringUtil.getWrappedText(linkText, "(", ")", true);
					let attr = 'href="' + url + '"';
					
					linkHTML = stringUtil.insertHTMLTag(anchorText, 'a', true, '', attr);
					targetText = targetText.replace(linkText, linkHTML);
					
					return targetText;
				}
				return targetText;
			}
			
		}
	};
</script>


<style lang="scss">
</style>