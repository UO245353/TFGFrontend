<template>


  <b-modal
  v-on:hide="cancel()"
  v-model="show"
  size="xl"
  centered
  title="Pregunta Tema"
  header-bg-variant="info"
  header-text-variant="light"
  body-bg-variant="light"
  body-text-variant="dark"
  footer-bg-variant="light"
  footer-text-variant="dark">

  <AddQuestionResponse :show="showAddQuestionResponse" v-on:success="validResponseAdded" v-on:close="closeModals"/>

  <b-form>

    <b-container fluid>

      <b-form-row class="my-1">

        <b-col sm="3">
          <label for="number">Numero</label>
        </b-col>

        <b-col sm="9">
          <b-form-input
          id="number"
          type="number"
          :state="numberState"
          placeholder="Numero"
          v-model="form.number"
          aria-describedby="input-live-feedback"
          number
          required></b-form-input>
          <b-form-invalid-feedback id="input-live-feedback">
            Debe de ser un numero
          </b-form-invalid-feedback>
        </b-col>

      </b-form-row>

      <b-form-row class="my-1">

        <b-col sm="3">
          <label for="question">Pregunta</label>
        </b-col>

        <b-col sm="9">
          <b-form-input
          id="question"
          type="text"
          :state="questionState"
          placeholder="Pregunta"
          v-model="form.question"
          aria-describedby="input-live-feedback"
          required></b-form-input>
          <b-form-invalid-feedback id="input-live-feedback">
            La pregunta debe contener al menos 1 caracter
          </b-form-invalid-feedback>
        </b-col>

      </b-form-row>

      <b-form-row class="my-1">

        <b-col sm="3">
          <label for="responses">Respuestas</label>
        </b-col>

        <b-col sm="8">
          <b-table
          id="responses"
          outlined
          hover
          responsive
          :hidden="form.responses.length < 1"
          :state="responsesState"
          :items="form.responses"
          :fields="fields"
          aria-describedby="input-live-feedback"
          required>
          <template slot="Borrar" slot-scope="data">
            <i class="fas fa-user-times show-hand-pointer" v-on:click="removeResponse(data.item.character)" title="Borrar Administrador"></i>
          </template>
        </b-table>
          <b-form-invalid-feedback id="input-live-feedback">
            Es necesaria al menos una respuesta valida
          </b-form-invalid-feedback>
        </b-col>

        <b-col sm="1">
          <i class="fas fa-plus-circle show-hand-pointer d-flex align-items-center justify-content-center" v-on:click="addResponse()" title="Crear Pregunta"></i>
        </b-col>

      </b-form-row>

    </b-container>
  </b-form>
  <div slot="modal-footer" class="w-100">

    <b-button
    variant="secondary"
    size="sm"
    class="float-left"
    v-on:click="cancel()">Cancelar</b-button>

    <b-button
    variant="primary"
    size="sm"
    class="float-right"
    v-on:click="onSubmit()">Crear</b-button>

  </div>
</b-modal>
</template>

<script>

import axios from 'axios';
import AddQuestionResponse from '@/components/Theme/AddQuestionResponse.vue';

export default {
  name: 'AddQuestion',
  props: {
    show: String,
  },
  computed: {
    numberState() {

      if(!this.form.number){

        return null;
      }

      return /^\d{1,}$/.test(this.form.number);
    },
    questionState() {

      if(!this.form.question){

        return null;
      }

      return /^(?=\w.*).{1,}$/.test(this.form.question);
    },
    responsesState() {
      console.log(this.form.responses);
      if(!this.form.responses || this.form.responses.length < 1){

        return false;
      }

      return !!this.form.responses.find(resp => !!resp.valid);
    },
  },
  data() {
    return {
      form: {
        number: undefined,
        question: undefined,
        responses: [],
      },
      showAddQuestionResponse: false,
      fields: [
        { key: 'character', label: 'Letra' },
        { key: 'response', label: 'Respuesta' },
        { key: 'valid', label: 'Valida' },
        'Borrar'
      ]
    };
  },
  methods: {
    addResponse(){
      console.log('hola');
      this.showAddQuestionResponse = true;
    },
    validResponseAdded(newResponse){

      this.showAddQuestionResponse = false;

      this.form.responses.push(newResponse);
    },
    closeModals(){

      this.showAddQuestionResponse = false;
    },
    removeResponse(character){

      var deleteIndex = -1;

      for(var i = 0; i < this.form.responses.length; i++){
        if(this.form.responses[i].character === character){
          deleteIndex = i;
          break;
        }
      }

      if(deleteIndex > -1){
        this.form.responses.splice(deleteIndex, 1);
      }
    },
    onSubmit() {

      if(!!this.numberState && !!this.questionState && !!this.responsesState){
        console.log('valid');
        /*return axios({
          url: this.$store.getters.getBackendURLBase + '/api/theme',
          method: 'post',
          headers: {
            auth: localStorage.token
          },
          data: this.form
        })
        .then((resp) => this.$emit('success'));*/
      }
    },
    cancel() {
      this.form = {
        number: undefined,
        question: undefined,
        responses: [],
      };
      this.$emit('close');
    }
  },
  components: {
    AddQuestionResponse
  }
};
</script>
