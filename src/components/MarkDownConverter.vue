<template>
	<div></div>
</template>

<script>
	import stringUtil from '../util/stringUtil.js';
	export default {
		props: {
			markdownText: String
		},
		data: function() {
			return {
				markdownTextArray: [],
				convertedHTMLTextArray: []
			}
		},
		
		watch: {
			markdownText: function() {
				this.markdownTextArray = this.markdownText.split(/\r\n|\r|\n/);
				this.convertedHTMLTextArray = [];
				
				this.markdownTextArray.forEach((element) =>{
					console.log('element is ' + element);
					if (stringUtil.isNullOrEmpty(element)) {
						return;
					}
					this.markdownConvertToHTML(element);
				});
				
				this.$emit("converted", this.convertedHTMLTextArray);
			}
		},
		
		methods: {
			markdownConvertToHTML: function(mdText) {
				mdText = this.convertHeading(mdText);
				this.convertedHTMLTextArray.push(mdText);
			},
				
			convertHeading: function(mdText) {
				let headingSymbol = mdText.substring(0, mdText.indexOf(' '));
				if (headingSymbol === "#") {
					return "<h2>" + mdText + "</h2>";
				}
				
				return mdText;
			}
		}
	};
</script>


<style lang="scss">
</style>