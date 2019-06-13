<template>
  <b-modal
  v-on:hide="cancel()"
  v-model="show"
  size="xl"
  centered
  title="Eliminar Administrador"
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
        Confirme que desea eliminar a este administrador
      </b-col>

    </b-row>

    <br>

    <b-row class="my-1">

      <b-col sm="3">
        <label for="id" class="float-left text-left">Id</label>
      </b-col>

      <b-col sm="9">
        <b-label id="id" class="float-left text-left">{{this.adminData._id}}</b-label>
      </b-col>

    </b-row>

    <b-row class="my-1">

      <b-col sm="3">
        <label for="name" class="float-left text-left">Nombre</label>
      </b-col>

      <b-col sm="9">
        <b-label id="name" class="float-left text-left">{{this.adminData.name}}</b-label>
      </b-col>

    </b-row>

    <b-row class="my-1">

      <b-col sm="3">
        <label for="email" class="float-left text-left">Correo Electronico</label>
      </b-col>

      <b-col sm="9">
        <b-label id="email" class="float-left text-left">{{this.adminData.email}}</b-label>
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
  name: 'DeleteAdmin',
  props: {
    show: String,
    adminData: Object
  },
  data(){

    return {
      showAlert: false,
      errorMsg: '',
    };
  },
  methods: {
    onSubmit() {

      return axios({
        url: this.$store.getters.getBackendURLBase + '/api/admin/' + this.adminData._id,
        method: 'delete',
        headers: {
          auth: localStorage.token
        }
      })
      .then(() => this.$emit('success'))
      .catch(err => {

        switch(err.response.status){
          case 404: {
            this.errorMsg = 'No encontrado';
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
