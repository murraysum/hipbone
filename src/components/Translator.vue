<template>
  <div style="width: 500px;">
    <h1>Translator</h1>
    <Card class="mb-2">
      <template #content>
        <p class="m-0">
          {{ translated }}
        </p>
        <p class="m-0">
          {{ original }}
        </p>
      </template>
    </Card>

    <InputText type="text" v-model="original" placeholder="Type Chinese" @input="translate" class="w-full"/>

    <div class="mt-2">
      <Button @click.prevent="copyToClipboard" label="Copy" class="w-full" />
    </div>
  </div>
</template>

<script>

  import pinyin from "pinyin";

  import Button from 'primevue/button';
  import Card from 'primevue/card';
  import InputText from 'primevue/inputtext';

  export default {
    data(){
      return {
        original: "",
        translated: null
      }
    },

    components: {
      Button,
      Card,
      InputText
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
