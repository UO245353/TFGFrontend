<template>
  <b-modal
  v-on:hide="cancel()"
  v-model="show"
  size="xl"
  centered
  title="Crear Respuesta De Pregunta"
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
          <label for="character">Letra</label>
        </b-col>

        <b-col sm="9">
          <b-form-input
          id="character"
          type="text"
          :state="characterState"
          placeholder="Letra"
          v-model="form.character"
          aria-describedby="input-live-feedback"
          required></b-form-input>
          <b-form-invalid-feedback id="input-live-feedback">
            Debe de ser una letra
          </b-form-invalid-feedback>
        </b-col>

      </b-form-row>

      <b-form-row class="my-1">

        <b-col sm="3">
          <label for="response">Respuesta</label>
        </b-col>

        <b-col sm="9">
          <b-form-input
          id="response"
          type="text"
          :state="responseState"
          placeholder="Respuesta"
          v-model="form.response"
          aria-describedby="input-live-feedback"
          required></b-form-input>
          <b-form-invalid-feedback id="input-live-feedback">
            La respuesta debe contener al menos 1 caracter
          </b-form-invalid-feedback>
        </b-col>

      </b-form-row>

      <b-form-row class="my-1">

        <b-col sm="3">
          <label for="valid">Valida</label>
        </b-col>

        <b-col sm="9">
          <b-form-group id="valid">
            <b-form-radio v-model="form.valid" name="valid-radios" :value="false">Falsa</b-form-radio>
            <b-form-radio v-model="form.valid" name="valid-radios" :value="true">Verdadera</b-form-radio>
          </b-form-group>
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
  name: 'AddQuestionResponse',
  props: {
    show: String,
  },
  computed: {
    characterState() {

      if(!this.form.character){

        return null;
      }

      return /^[A-Za-z]{1}$/.test(this.form.character);
    },
    responseState() {

      if(!this.form.response){

        return null;
      }

      return /^(?=\w.*).{1,}$/.test(this.form.response);
    }
  },
  data() {
    return {
      form: {
        character: undefined,
        valid: false,
        response: undefined,
      }
    };
  },
  methods: {
    onSubmit() {

      if(!!this.characterState && !!this.responseState){

        return this.$emit('success', this.form);
      }
    },
    cancel() {
      this.form = {
        character: undefined,
        valid: false,
        response: undefined,
      };
      this.$emit('close');
    }
  }
};
</script>
