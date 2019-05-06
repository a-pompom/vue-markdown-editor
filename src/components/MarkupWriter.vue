<template>
<!--	
	HTML書き出し処理
	入力内容の変換結果をもとに画面にプレビューとして表示するものとは別にHTMLファイルを生成
	ダウンロードリンクを通じてダウンロード可能とする
-->
	<div></div>
</template>


<script>
	export default {
		props: {
			markupTextArray: Array
		},
		data() {
			return {
				markupText: ""
			}
		},
		
		watch: {
			//内容が更新される度にダウンロードコンテンツ、URLを更新
			markupTextArray: {
				handler: function(o, n) {
					this.createDLLink();
				},
				deep: true
			}
		},
		
		methods: {
			/**
			 * 変換結果をダウンロードできるようHTML、ダウンロードリンクを生成する
			 */
			createDLLink() {
				//出力結果は毎回初期化
				this.markupText = "";
				
				this.markupTextArray.forEach((element) => {
					this.markupText += element;
					this.markupText += "\n";
				});
				
				//Blobでstring→HTMLへ変換し、DLリンクを生成
				let blob = new Blob([ this.markupText ], { "type" : "text/html" });
				window.URL = window.URL || window.webkitURL;
				
				this.$emit('dlURLCreated', window.URL.createObjectURL(blob));
			}
		}
	}
</script>


<style lang="scss">
</style>