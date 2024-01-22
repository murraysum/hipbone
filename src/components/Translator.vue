<template>
  <div>
    {{ translated }} <br />
    {{ original }} <br />
    <input type="text" v-model="original" @input="translate"/>

    <button @click.prevent="copyToClipboard">
      Copy
    </button>
  </div>
</template>

<script>

  import pinyin from "pinyin";

  export default {
    data(){
      return {
        original: "",
        translated: null
      }
    },

    methods: {
      translate(){
        this.translated = pinyin(this.original).flat(3).join(" ");
      },
      copyToClipboard(){
        this.$clipboard(`${this.translated}\n${this.original}`)
      }
    }
  }
</script>
