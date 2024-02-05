<template>
  <div>
    <SelectButton v-model="question.type" :options="slideOptions" optionLabel="name" optionValue="value" class="w-full mb-5"/>

    <h1 class="text-center mb-4">
      <span class="mr-2" v-if="question.type == 'text'">{{ question.title }}</span>
      <Button class="" label="Speak"  @click.prevent="speak">
        <font-awesome-icon :icon="['fas', 'volume-high']" />
      </Button>
    </h1>

    <div>
      <template v-for="choice in remainingChoices" >
        <Button :label="choice.title" class="mr-2" severity="secondary" @click.prevent="selectChoice(choice.id)" />
      </template>
    </div>

    <div class="mt-2">
      <template v-for="choice in selectedChoices" >
        <Button :label="choice.title" class="mr-2" @click.prevent="removeChoice(choice.id)" />
      </template>
    </div>

    <Button class="mt-2 w-full" label="Check Answer"  @click.prevent="checkAnswer" />

    <template v-if="status == 'correct'">
      <p>Yay congrats</p>
    </template>
    <template v-if="status == 'incorrect'">
      <p>Ooops sorry that's incorrect</p>
    </template>

  </div>
</template>

<script>
import Button from 'primevue/button';
import SelectButton from 'primevue/selectbutton';


export default {

  components: {
    Button,
    SelectButton
  },

  data(){
    return {
      question: {
        type: "text",
        title: "míng tiān jiàn",
        speech: "明天見",
        choices: [
          {id: 1, title: "明"},
          {id: 2, title: "天"},
          {id: 3, title: "見"},
          {id: 4, title: "年"}
        ],
        answer: [1, 2, 3]
      },
      answer: [],
      status: "unanswered"
    }
  },

  created(){
    this.loadSpeechSynthesis();
  },

  computed: {
    slideOptions(){
      return [
        { name: 'Text', value: 'text' },
        { name: 'Listening', value: 'listening' },
      ]
    },

    remainingChoices(){
      let remaining = []
       this.question.choices.map((choice) => {
        if(!this.answer.includes(choice.id)){
          remaining.push(choice);
        }
      })

      return remaining;
    },
    selectedChoices(){
      let selected = []

      this.answer.map((a) => {
        this.question.choices.map((choice) => {
          if (choice.id == a){
            selected.push(choice);
          }
        })
      })

      return selected;
    }
  },

  methods: {
    selectChoice(choiceId){
      this.answer.push(choiceId)
    },
    removeChoice(choiceId){
      this.answer.splice(this.answer.indexOf(choiceId), 1);
    },
    checkAnswer(){
      if (JSON.stringify(this.question.answer) === JSON.stringify(this.answer)){
        this.status = "correct"
      } else {
        this.status = "incorrect"
      }
    },
    speak(){
      const word = this.question.speech;
      // Feature detect
      if (
        window.speechSynthesis &&
        typeof SpeechSynthesisUtterance !== undefined
      ) {
        const synth = window.speechSynthesis;
        // get all the voices available on your browser
        const voices = synth.getVoices();

        // find a voice that can speak chinese
        const voice = voices.
        filter((voice) => voice.lang.indexOf('zh-TW') === 0)[0];

        // const voice = voices.filter((voice) => {
        //   return voice.name == "Google 國語（臺灣）"
        // })[0]
        // make the browser speak if it can!
        if ( voice ) {
          const utterThis = new SpeechSynthesisUtterance(word);
          utterThis.voice = voice;
          synth.speak(utterThis);
        } else {
          const utterThis = new SpeechSynthesisUtterance('I\'m afraid I cannot speak Mandarin yet.');
          utterThis.voice = voices[0];
          synth.speak(utterThis);
        }
      }
    },
    loadSpeechSynthesis(){
      window.speechSynthesis.getVoices();
    }
  }
}
</script>
