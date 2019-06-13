<template>
  <div id="theme-questions" class="logged-height">

    <AddQuestion :themeId="themeId" :show="showAddQuestion" v-on:success="addQuestionSuccess" v-on:close="closeModels"/>
    <DeleteQuestion :themeId="themeId" :questionData="deleteQuestionData" :show="showRemoveQuestion" v-on:success="removeQuestionSuccess" v-on:close="closeModels"/>

    <b-alert v-model="showAlert" variant="danger" dismissible>
      {{ errorMsg }}
    </b-alert>

    <b-row>
      <b-col cols="12">
        <Nav :questions="true" :themeId="themeId"/>
      </b-col>
    </b-row>
    <br>
    <b-row>
      <b-col cols="10">
        <p class="text-left" style="padding-left: 1rem;">Listado de Preguntas</p>
      </b-col>
      <b-col cols="2">
        <p class="fas fa-user-plus show-hand-pointer" v-on:click="addQuestion" title="Nueva Pregunta"></p>
      </b-col>
    </b-row>
    <b-row v-for="question in theme.questions" role="tablist">
      <b-col cols="12">
        <Question :number="question.number" :question="question.question" :responses="question.responses" v-on:removeQuestion="removeQuestion"/>
      </b-col>
    </b-row>
    <br>
  </div>
</template>

<script>
import axios from 'axios';
import Nav from '@/components/Theme/Nav.vue';
import Question from '@/components/Theme/Question.vue';
import AddQuestion from '@/components/Theme/AddQuestion.vue';
import DeleteQuestion from '@/components/Theme/DeleteQuestion.vue';

export default {
  name: 'theme-questions',
  data() {
    return {
      showAlert: false,
      errorMsg: '',
      themeId: this.$route.params.themeId,
      theme: {},
      showAddQuestion: false,
      showRemoveQuestion: false,
      deleteQuestionData: {}
    }
  },
  methods: {
    removeQuestion(questionData){
      this.deleteQuestionData = questionData;
      this.showRemoveQuestion = true;

      return true;
    },
    removeQuestionSuccess(){
      this.deleteQuestionData = {};

      this.closeModels();

      return location.reload();
    },
    addQuestion(){
      this.showAddQuestion = true;

      return true;
    },
    addQuestionSuccess(){

      this.closeModels();

      return location.reload();
    },
    closeModels(){

      this.showAddQuestion = false;
      this.showRemoveQuestion = false;

      return true;
    }
  },
  created() {

    return axios({
      url: this.$store.getters.getBackendURLBase + '/api/theme/' + this.themeId,
      method: 'get',
      headers: {
        auth: localStorage.token
      }
    })
    .then(resp => {

      this.theme = resp.data.obj

      this.isListNotLoaded = false;
      this.isListUpdated = true;

      return true;
    })
    .catch(err => {

      switch(err.response.status){
        case 401: {
          this.errorMsg = 'Operacion no autorizada, token invalido';
          break;
        }
        default: {
          this.errorMsg = 'Error desconocido';
        }
      }

      this.showAlert = true;

      return false;
    });
  },
  components: {
    Nav,
    Question,
    AddQuestion,
    DeleteQuestion
  }
};
</script>
