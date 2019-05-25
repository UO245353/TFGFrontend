<template>
  <b-modal
  v-on:hide="cancel()"
  v-model="show"
  size="xl"
  centered
  title="Eliminar Tema"
  header-bg-variant="info"
  header-text-variant="light"
  body-bg-variant="light"
  body-text-variant="dark"
  footer-bg-variant="light"
  footer-text-variant="dark">

  <b-container fluid>
    <b-row class="my-1">

      <b-col sm="12" class="text-left">
        Confirme que desea eliminar este tema
      </b-col>

    </b-row>

    <br>

    <b-row class="my-1">

      <b-col sm="3">
        <label for="id" class="float-left text-left">Id</label>
      </b-col>

      <b-col sm="9">
        <b-label id="id" class="float-left text-left">{{this.themeData._id}}</b-label>
      </b-col>

    </b-row>

    <b-row class="my-1">

      <b-col sm="3">
        <label for="number" class="float-left text-left">Numero</label>
      </b-col>

      <b-col sm="9">
        <b-label id="number" class="float-left text-left">{{this.themeData.number}}</b-label>
      </b-col>

    </b-row>

    <b-row class="my-1">

      <b-col sm="3">
        <label for="title" class="float-left text-left">Titulo</label>
      </b-col>

      <b-col sm="9">
        <b-label id="email" class="float-left text-left">{{this.themeData.title}}</b-label>
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
  name: 'DeleteTheme',
  props: {
    show: String,
    themeData: Object
  },
  methods: {
    onSubmit() {

      return axios({
        url: 'http://localhost:23456/api/theme/' + this.themeData._id,
        method: 'delete',
        headers: {
          auth: localStorage.token
        }
      })
      .then((resp) => this.$emit('success'));
    },
    cancel() {
      this.$emit('close');
    }
  }
};
</script>
