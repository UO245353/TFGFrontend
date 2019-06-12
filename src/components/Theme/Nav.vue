<template>
  <div class='Nav'>
    <b-nav tabs fill align="center">
      <b-nav-item v-on:click="contentsActive()" v-bind:active="contents">Contenido</b-nav-item>
      <b-nav-item v-on:click="questionsActive()" v-bind:active="questions">Preguntas</b-nav-item>
    </b-nav>
  </div>
</template>

<script>

export default {
  name: 'Nav',
  props: {
    contents: Boolean,
    questions: Boolean,
    themeId: String
  },
  methods: {
    contentsActive(){
      this.contents = true;
      this.questions = false;
      this.$router.push('/theme/'+ this.themeId +'/contents');
    },
    questionsActive(){
      this.contents = false;
      this.questions = true;
      this.$router.push('/theme/'+ this.themeId +'/questions');
    }
  }
};
</script>
