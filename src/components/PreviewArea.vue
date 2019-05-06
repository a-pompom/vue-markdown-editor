<template>
	<div class="previewArea">
		<div class="previewArea__title">
			<h2 class="previewArea__title__text">{{ markupTitle }}</h2>
			
			<h3 class="previewArea__title__date">{{ currentDate }}</h3>
			<h4 class="previewArea__title__tag">{{ markupTag }}</h4>
		</div>
		<div class="previewArea__body">
			<div v-html="markupText"></div>
		</div>
		
	</div>
</template>


<script>
	export default {
		props: {
			markupTitle: String,
			markupTagArray: Array,
			markupTextArray: Array
		},
		
		data: function() {
			return {
				markupTag: "",
				markupText: ""
				
			}
		},
		
		computed: {
			currentDate() {
				let today = new Date();
				let dd = String(today.getDate()).padStart(2, '0');
				let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
				let yyyy = today.getFullYear();
				return yyyy + "-" + mm + "-" + dd;
			}
		},
		
		watch: {
			markupTagArray: {
				handler: function(o, n) {
					this.createTagForPreview();
				},
				deep: true
			},
			markupTextArray: {
				handler: function(o, n) {
					this.createHTMLForPreview();
				},
				deep: true
				
			}
		},
		
		methods: {
			createTagForPreview() {
				this.markupTag = "";
				this.markupTagArray.forEach((element, index) => {
					let delimiter = index === this.markupTagArray.length - 1 ? "" : " ,"
					this.markupTag += element + delimiter;
				})
			},
			createHTMLForPreview: function() {
				this.markupText = "";
				this.markupTextArray.forEach((element) => {
					this.markupText += element;
				});
			}
		},
		updated() {
			//コードスニペットに対して動的にハイライトを設定
			document.querySelectorAll('pre code').forEach((block) => {
				hljs.highlightBlock(block);
		  	});
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
			padding-bottom: 20px;
			
			&__text {
				text-align: center;
			}
			
			&__date {
				padding-bottom: 5px;
				border-bottom: 1px solid #e3e3e3;
			}
			
			&__tag {
				
			}
		}
		
		&__body {
			height: 70%;
			border: 1px solid #000;
			border-radius: 5px;
			padding: 10px;
			margin-left: 5%;
			overflow-y: scroll;
		}
		
	}
	
	.main-text {
		border-bottom: 2px solid #e3e3e3;
		padding-bottom: 5px;
	}
	
	.quote {
		border-left: 4px solid #e3e3e3;
		padding-left: 10px;
		margin: 0;
		color: #7a7a7a;
	}
</style>