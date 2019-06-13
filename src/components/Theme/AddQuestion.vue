<template>

  <b-modal
  v-on:hide="cancel()"
  v-model="show"
  size="xl"
  centered
  title="Crear Pregunta De Tema"
  header-bg-variant="info"
  header-text-variant="light"
  body-bg-variant="light"
  body-text-variant="dark"
  footer-bg-variant="light"
  footer-text-variant="dark">

  <AddQuestionResponse :show="showAddQuestionResponse" v-on:success="validResponseAdded" v-on:close="closeModals"/>

  <b-form>

    <b-container fluid>

      <b-alert v-model="showAlert" variant="danger" dismissible>
        {{ errorMsg }}
      </b-alert>

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
          :items="form.responses"
          :fields="fields"
          aria-describedby="input-live-feedback"
          required>
          <template slot="Validez" slot-scope="data">
            <i v-if="data.item.valid" class="far fa-check-circle"/>
            <i v-else class="far fa-times-circle"/>
          </template>
          <template slot="Borrar" slot-scope="data">
            <i class="fas fa-user-times show-hand-pointer" v-on:click="removeResponse(data.item.character)" title="Borrar Administrador"></i>
          </template>
        </b-table>
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
    themeId: String
  },
  data() {
    return {
      showAlert: false,
      errorMsg: '',
      form: {
        number: undefined,
        question: undefined,
        responses: [],
      },
      showAddQuestionResponse: false,
      fields: [
        { key: 'character', label: 'Letra' },
        { key: 'response', label: 'Respuesta' },
        'Validez',
        'Borrar'
      ]
    };
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

      if(!this.form.responses || this.form.responses.length < 1){

        return false;
      }

      var valids = this.form.responses.map(resp => resp.valid);

      var numberOfValids = 0;

      valids.forEach(resp => {
        if(resp){
          numberOfValids++;
        }
      });

      return numberOfValids === 1;
    },
  },
  methods: {
    addResponse(){
      this.showAddQuestionResponse = true;

      return true;
    },
    validResponseAdded(newResponse){

      this.showAddQuestionResponse = false;
      var exist = !!this.form.responses.find(resp => resp.character === newResponse.character);

      if(!exist){
        this.form.responses.push(newResponse);

        return true;
      }
      else{
        this.errorMsg = 'Letra Repetida';
        this.showAlert = true;

        return false;
      }
    },
    closeModals(){

      this.showAddQuestionResponse = false;

      return true;
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

        return true;
      }

      return false;
    },
    onSubmit() {

      if(!!this.numberState && !!this.questionState && !!this.responsesState){

        return axios({
          url: this.$store.getters.getBackendURLBase + '/api/theme/' + this.themeId + '/question',
          method: 'post',
          headers: {
            auth: localStorage.token
          },
          data: this.form
        })
        .then(() => this.$emit('success'))
        .catch(err => {

          switch(err.response.status){
            case 409: {
              this.errorMsg = 'Letra o pregunta duplicados';
              break;
            }
            default: {
              this.errorMsg = 'Error desconocido';
            }
          }

          this.showAlert = true;

          return false;
        });
      }
      else {
        if(!this.responsesState){
          this.errorMsg = 'Es necesaria una pregunta valida';
          this.showAlert = true;
        }

        return false;
      }
    },
    cancel() {
      this.form = {
        number: undefined,
        question: undefined,
        responses: [],
      };

      return this.$emit('close');
    }
  },
  components: {
    AddQuestionResponse
  }
};
</script>
