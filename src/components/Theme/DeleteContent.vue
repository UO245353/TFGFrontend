<template>
  <b-modal
  v-on:hide="cancel()"
  v-model="show"
  size="xl"
  centered
  title="Eliminar Contenido"
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
        Confirme que desea eliminar este contenido
      </b-col>

    </b-row>

    <br>

    <b-row class="my-1">

      <b-col sm="3">
        <label for="number" class="float-left text-left">Numero</label>
      </b-col>

      <b-col sm="9">
        <b-label id="number" class="float-left text-left">{{sectionData.number}}</b-label>
      </b-col>

    </b-row>

    <b-row class="my-1">

      <b-col sm="3">
        <label for="title" class="float-left text-left">Titulo</label>
      </b-col>

      <b-col sm="9">
        <b-label id="title" class="float-left text-left">{{sectionData.title}}</b-label>
      </b-col>

    </b-row>

    <b-row class="my-1">

      <b-col sm="3">
        <label for="responses" class="float-left text-left">Contenido</label>
      </b-col>

      <b-col sm="9">
        <b-label id="responses" class="float-left text-left"> {{ sectionData.content }} </b-label>
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
  name: 'DeleteContent',
  props: {
    show: String,
    themeId: String,
    sectionData: Object
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
        url: this.$store.getters.getBackendURLBase + '/api/theme/' + this.themeId + '/section',
        method: 'delete',
        headers: {
          auth: localStorage.token
        },
        data: this.sectionData
      })
      .then(() => this.$emit('success'))
      .catch(err => {

        switch(err.response.status){
          case 404: {
            this.errorMsg = 'Contenido no encontrado';
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
