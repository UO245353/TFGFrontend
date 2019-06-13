<template>
  <b-modal
  v-on:hide="cancel()"
  v-model="show"
  size="xl"
  centered
  title="Eliminar Pregunta"
  header-bg-variant="info"
  header-text-variant="light"
  body-bg-variant="light"
  body-text-variant="dark"
  footer-bg-variant="light"
  footer-text-variant="dark">

  <b-container fluid>

    <b-alert v-model="showAlert" variant="danger" dismissible>
      {{ errorMsg }}
    </b-alert>

    <b-row class="my-1">

      <b-col sm="12" class="text-left">
        Confirme que desea eliminar esta pregunta
      </b-col>

    </b-row>

    <br>

    <b-row class="my-1">

      <b-col sm="3">
        <label for="number" class="float-left text-left">Numero</label>
      </b-col>

      <b-col sm="9">
        <b-label id="number" class="float-left text-left">{{this.questionData.number}}</b-label>
      </b-col>

    </b-row>

    <b-row class="my-1">

      <b-col sm="3">
        <label for="question" class="float-left text-left">Pregunta</label>
      </b-col>

      <b-col sm="9">
        <b-label id="question" class="float-left text-left">{{this.questionData.question}}</b-label>
      </b-col>

    </b-row>

    <b-row class="my-1">

      <b-col sm="3">
        <label for="responses" class="float-left text-left">Respuestas</label>
      </b-col>

      <b-col sm="9">
        <b-label id="responses" class="float-left text-left">
          <b-row>
            <b-col cols="2" class="text-left"><u>Letra</u></b-col>
            <b-col cols="8" class="text-left"><u>Respuesta</u></b-col>
            <b-col cols="2" class="text-left"><u>Validez</u></b-col>
          </b-row>
          <b-row v-for="response in questionData.responses">
            <b-col cols="2" class="text-left"> {{ response.character }} </b-col>
            <b-col cols="8" class="text-left"> {{ response.response }} </b-col>
            <b-col cols="2" class="text-left">
              <i v-if="response.valid" class="far fa-check-circle"/>
              <i v-else class="far fa-times-circle"/>
            </b-col>
          </b-row>
        </b-label>
      </b-col>

    </b-row>

  </b-container>

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
    v-on:click="onSubmit()">Borrar</b-button>

  </div>
</b-modal>
</template>

<script>
import axios from 'axios';

export default {
  name: 'DeleteQuestion',
  props: {
    show: String,
    themeId: String,
    questionData: Object
  },
  data() {

    return {
      showAlert: false,
      errorMsg: ''
    };
  },
  methods: {
    onSubmit() {

      return axios({
        url: this.$store.getters.getBackendURLBase + '/api/theme/' + this.themeId + '/question',
        method: 'delete',
        headers: {
          auth: localStorage.token
        },
        data: this.questionData
      })
      .then(() => this.$emit('success'))
      .catch(err => {

        switch(err.response.status){
          case 404: {
            this.errorMsg = 'Pregunta no encontrada';
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
    cancel() {

      return this.$emit('close');
    }
  }
};
</script>
