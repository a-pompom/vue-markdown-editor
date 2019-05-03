<template>
	<div class="previewArea">
		<div class="previewArea__title">
			<h2 class="previewArea__title__text">タイトル</h2>
			
			<h3 class="previewArea__title__date">2019/05/01</h3>
			<h4 class="previewArea__title__tag">tag1</h4>
		</div>
		<div class="previewArea__body">
			<div v-html="markupText">
				
			</div>
		</div>
		
	</div>
</template>


<script>
	import stringUtil from '../util/stringUtil.js';
	export default {
		props: {
			markdownText: String,
			markupTextArray: Array,
			test: String
		},
		
		data: function() {
			return {
				markupText: ""
			}
		},
		
		watch: {
			markupTextArray: {
				handler: function(o, n) {
					console.log('preview' + this.markupTextArray);
					this.createHTMLForPreview();
				},
				deep: true
				
			},
			test: function() {
				console.log('test is changed');
			}
		},
		
		methods: {
			createHTMLForPreview: function() {
				this.markupText = "";
				this.markupTextArray.forEach((element) => {
					if (stringUtil.getFirstChar(element) !== "<") {
						stringUtil.insert(element, 0, "<p>");
						element += "</p>";
					}
					this.markupText += element;
					//this.markupText += "¥n";
				});
			}
		}
	};
</script>


<style lang="scss">
	.previewArea {
		width: 45%;
		height: 100%;
		
		&__title {
			height: 15%;
			border: 1px solid #000;
			border-radius: 10px;
			padding: 10px;
			margin-left: 5%;
			margin-bottom: 5%;
			
			&__text {
				text-align: center;
			}
			
			&__date {
				padding-bottom: 5px;
				border-bottom: 1px solid #e3e3e3;
			}
			
			&__tag {
				margin-bottom: 5px;
			}
		}
		
		&__body {
			height: 70%;
			border: 1px solid #000;
			border-radius: 5px;
			padding: 10px;
			margin-left: 5%;
		}
		
	}
	
	.main-text {
		border-bottom: 2px solid #e3e3e3;
		padding-bottom: 5px;
	}
	
	.quote {
		border-left: 4px solid #e3e3e3;
		padding-left: 10px;
		color: #7a7a7a;
	}
</style>