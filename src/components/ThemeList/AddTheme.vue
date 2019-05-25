<template>
  <b-modal
  v-on:hide="cancel()"
  v-model="show"
  size="xl"
  centered
  title="Crear Tema"
  header-bg-variant="info"
  header-text-variant="light"
  body-bg-variant="light"
  body-text-variant="dark"
  footer-bg-variant="light"
  footer-text-variant="dark">

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
          <label for="title">Titulo</label>
        </b-col>

        <b-col sm="9">
          <b-form-input
          id="title"
          type="text"
          :state="titleState"
          placeholder="Titulo"
          v-model="form.title"
          aria-describedby="input-live-feedback"
          required></b-form-input>
          <b-form-invalid-feedback id="input-live-feedback">
            El titulo debe contener al menos 1 caracter
          </b-form-invalid-feedback>
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

export default {
  name: 'AddTheme',
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
    titleState() {

      if(!this.form.title){

        return null;
      }

      return /^(?=\w.*).{1,}$/.test(this.form.title);
    },
  },
  data() {
    return {
      form: {
        number: undefined,
        title: undefined,
        questions: [],
        sections: []
      }
    };
  },
  methods: {
    onSubmit() {

      if(!!this.numberState && !!this.titleState){

        return axios({
          url: 'http://localhost:23456/api/theme',
          method: 'post',
          headers: {
            auth: localStorage.token
          },
          data: this.form
        })
        .then((resp) => this.$emit('success'));
      }
    },
    cancel() {
      this.form = {};
      this.$emit('close');
    }
  }
};
</script>
