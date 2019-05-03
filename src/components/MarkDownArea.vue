<template>
	<div class="markdownArea">
		<div class="markdownArea__title">
			<textarea id="markdownTitle" placeholder="title" class="markdownArea__title__text"
				
			></textarea>
			<textarea id="markdownTag" placeholder="tag" class="markdownArea__title__tag"></textarea>
			
		</div>
		<div class="markdownArea__body">
			<textarea id="markdownBody" class="markdownArea__body__text"
				v-model="markdownBodyTextArea"
				v-on:keydown.prevent.tab="test"
				
			></textarea>
		</div>
	</div>	
</template>


<script>
	export default {
		props: {
			markdownText: String	
		},
		computed: {
			markdownBodyTextArea: {
				get: function() {
					return this.markdownText;
				},
				set: function(value) {
					this.$emit('bodyChanged', value);
				}
			}	
		},
		methods: {
			test: function() {
				console.log('tab run');
				this.$emit('bodyTabPressed');
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