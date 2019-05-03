<template>
	<div id="app">
		<div class="app__header">
			<h2>test</h2>
			<hr>
		</div>
		
		<div class="app__area">
			<app-mark-down-area
				v-bind:markdownText="markdownText"
				v-on:bodyChanged="changeMarkdownBody"
				v-on:bodyTabPressed="setTab"
			>	
			</app-mark-down-area>

			<app-preview-area
				v-bind:markdownText="markdownText"
				v-bind:markupTextArray="markupTextArray"
				v-bind:test="test"
			>
			</app-preview-area>
		</div>
		<div class="app__footer">
			<button class="button--save">書き出し</button>
		</div>
		
  		<app-mark-down-converter
  			v-bind:markdownText="markdownText"
  			v-on:converted="getConvertedText"
  		>	
  		</app-mark-down-converter>
	</div>
</template>

<script>
import MarkDownArea from './components/MarkDownArea.vue';
import PreviewArea from './components/PreviewArea.vue';
import MarkDownConverter from './components/MarkDownConverter.vue';
	
export default {
	data: function() {
		return {
			markdownText: "test",
			markupTextArray: [],
			test: "test"
		};	
	},
	components: {
  		appMarkDownArea: MarkDownArea,
		appPreviewArea: PreviewArea,
		appMarkDownConverter: MarkDownConverter
		
  },
	methods: {
		changeMarkdownBody: function(value) {
			this.markdownText = value;
		},
		
		setTab: function() {
			this.markdownText += "    ";
		},
		
		getConvertedText: function(convertedArray) {
			console.log('converted method');
			this.markupTextArray = convertedArray;
			
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
