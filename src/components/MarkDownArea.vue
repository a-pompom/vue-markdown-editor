<template>
	<div class="markdownArea">
		<!-- タイトル領域  -->
		<div class="markdownArea__title">
			<!-- タイトル  -->
			<textarea id="markdownTitle" placeholder="title" class="markdownArea__title__text"
				v-model="markdownTitleTextArea"
			></textarea>
			<!-- タグ  -->
			<textarea id="markdownTag" placeholder="tag" class="markdownArea__title__tag"
				v-model="markdownTitleTag"
			></textarea>
			
		</div>
		
		<!-- 本文  -->
		<div class="markdownArea__body">
			<textarea id="markdownBody" class="markdownArea__body__text" ref="md_input"
			    v-model="markdownBodyText"
				v-on:keydown.prevent.tab="tabPressed"
				v-on:keydown.enter="enterPressed"
			></textarea>
		</div>
	</div>	
</template>


<script>
	export default {
		props: {
			markdownTitle: String,
			markdownTag: String,
			markdownText: String
		},
		
		//逐一変化を反映させる要素はcomputedに記述
		computed: {
			//タイトル
			markdownTitleTextArea: {
				get: function() {
					return this.markdownTitle;
				},
				set: function(value) {
					this.$emit('titleChanged', value);
				}
			},
			
			//タグ
			markdownTitleTag: {
				get: function() {
					return this.markdownTag;
				},
				set: function(value) {
					this.$emit('tagChanged', value);
				}
			},
			
			markdownBodyText: {
				get() {
					return this.markdownText;
				},
				set() {
				}
			}
		},
		
		methods: {
			/**
			 * タブキー押下時に発火する処理
			 */
			tabPressed: function() {
				this.$emit('bodyTabPressed', this.$refs.md_input.value);
			},
			
			/**
			 * エンターキー押下時に発火する処理 textareaのvalue値をrefsで渡して変換
			 */
			enterPressed: function() {
				this.$emit('bodyChanged', this.$refs.md_input.value);
			}
		}
	};
</script>


<style lang="scss">
	
	#markdownTitle {
		
	}
	
	.markdownArea {
		width: 45%;
		height: 100%;
		
		&__title {
			height: 15%;
			border: 1px solid #000;
			border-radius: 10px;
			padding: 10px;
			margin-bottom: 5%;
			padding-bottom: 20px;
			
			&__text {
				display: block;
				width: 100%;
				height: 40%;
				text-align: center;
				font-size: 1.5rem;
				margin: 5px auto;
			}
			
			&__tag {
				display: block;
				width: 90%;
				height: 30%;
				text-align: left;
				font-size: 1.3rem;
				margin: 3px auto;
			}
			
			&__date {
				text-align: left;
				margin: 10% 0px 100px 10px;
			}
		}
		
		&__body {
			height: 70%;
			border: 1px solid #000;
			border-radius: 5px;
			padding: 10px;
			
			&__text {
				display: block;
				width: 90%;
				height: 95%;
				margin: 5px auto;
				font-size: 1.5rem;
				
			}
		}
		
	}
</style>