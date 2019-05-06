<template>
	<div id="app">
	
		<!-- ヘッダ -->
		<div class="app__header">
			<h2>Markdown Editor</h2>
			<hr>
		</div>
		
		<div class="app__area">
			<!-- タイトル、マークダウンテキストを入力する箇所
			 	入力されたテキストはマークアップへと変換されて表示する
				event -[タブキー押下, エンターキー押下]
				props -[タイトル, マークダウンテキスト] 
			-->
			<app-mark-down-area
				v-bind:markdownText="markdownText"
				v-bind:markdownTitle="markdownTitle"
				v-bind:markdownTag="markdownTag"
				
				v-on:titleChanged="changeTitle"
				v-on:tagChanged="changeTag"
				v-on:bodyChanged="changeMarkdownBody"
				v-on:bodyTabPressed="setTab"
			>	
			</app-mark-down-area>

			<!-- マークアップ形式へ変換された文字列を表示
				event -[出力ボタンクリック]
				props -[タイトル, タグ, マークアップ形式に変換されたテキスト] 
			-->
			<app-preview-area
				v-bind:markupTitle="markupTitle"
				v-bind:markupTagArray="markupTagArray"
				v-bind:markupTextArray="markupTextArray"
			>
			</app-preview-area>
		</div>
		
		<!-- フッタ -->
		<div class="app__footer">
			<a v-bind:href="dlURL" download="article.html" class="button--save">書き出し</a>
			
		</div>
		
		
		<!-- ロジックコンポーネント -->
		
		<!-- マークダウンテキスト→マークアップテキストへ変換
				event -[変換完了]
				props -[変換対象のテキスト] 
			-->
  		<app-mark-down-converter
  			v-bind:markdownText="markdownText"
  			v-on:converted="getConvertedText"
  		>	
  		</app-mark-down-converter>
  		
  		<!-- マークアップテキストをもとにHTMLファイル、ダウンロードリンクを生成
				event -[ダウンロードリンク生成完了]
				props -[書き出し対象のタイトル、タグ、テキスト] 
			-->
  		<app-markup-writer
  			v-bind:markupTextArray="markupTextArray"
  			v-on:dlURLCreated="setDLURL"
  		>
  		</app-markup-writer>
	</div>
</template>

<script>
import MarkDownArea from './components/MarkDownArea.vue';
import PreviewArea from './components/PreviewArea.vue';
import MarkDownConverter from './components/MarkDownConverter.vue';
import MarkupWriter from './components/MarkupWriter.vue';
import * as stringUtil from './util/stringUtil.js';
	
export default {
	data: function() {
		return {
			//マークダウン用
			markdownTitle: "",
			markdownTag: "",
			markdownText: "",
			
			//マークアップ用
			markupTitle: "title",
			markupTagArray: [],
			markupTextArray: [],
			
			//書き出し用
			dlURL: ""
		};	
	},
	
	components: {
  		appMarkDownArea: MarkDownArea,
		appPreviewArea: PreviewArea,
		appMarkDownConverter: MarkDownConverter,
		appMarkupWriter: MarkupWriter
		
  	},
	
	methods: {
		/**
		 * タイトルを更新する
		 * @param {string} title 更新後のタイトル
		 */
		changeTitle(title) {
			this.markupTitle = title;
			this.markdownTitle = title;
			
		},
		
		/**
		 * タグを更新する
		 * @param {string} tagText 更新後のタグ
		 */
		changeTag(tagText) {
			//タグは配列で管理した方が扱いやすいのでカンマで分割
			this.markupTagArray = tagText.split(',');
			this.markdownTag = tagText;
		},
		
		/**
		 * 子要素で変更されたマークダウンテキストの内容を反映
		 * @param {string} mdText 変更されたテキスト
		 */
		changeMarkdownBody: function(mdText) {
			//子要素でwatchを利用して変更を検知するためにemitで渡された値をセット
			this.markdownText = mdText;
		},
		
		/**
		 * タブ押下時の処理をスペース4つ挿入で上書きする
		 */
		setTab: function() {
			//TODO? 任意の位置に挿入できるようにしたい
			this.markdownText += "    ";
		},
		
		/**
		 * 変換結果を子から受け取りdataプロパティへセットする
		 * @param {Array} convertedArray 1行ずつマークアップテキストを格納した配列
		 */
		getConvertedText: function(convertedArray) {
			this.markupTextArray = convertedArray;
			
		},
		
		/**
		 * 動的に生成されたHTMLダウンロード用のURLをhref属性にセットする
		 * @param {string} url ダウンロードURL
		 */
		setDLURL(url) {
			this.dlURL = url;
		}
	}
}
</script>

<style lang="scss">
	#app {
		width: inherit;
		height: inherit;
	}
	
	.app__header {
		width: 90%;
		height: 7%;
		margin: 5px auto;
	}
	
	.app__area {
		@include flex-center;
		width: inherit;
		height: 83%;
	}
	
	.app__footer {
		width: inherit;
		height: 8%;
	}
</style>
