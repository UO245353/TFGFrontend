<template>
  <div id="login" class="login-padding center">

    <br>
    <b-row>
      <b-col cols="2">
      </b-col>
      <b-col cols="8">
        <b-alert v-model="showAlert" variant="danger" dismissible>
          Usuario o clave incorrectos
        </b-alert>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">

          <b-form-input id="uo-input" v-model="form.name" placeholder="Ingresa tu UO" required/>
          <b-form-input id="pass-input" type="password" v-model="form.pass" placeholder="Ingresa tu Contraseña" required/>

          <br>

          <b-button type="reset" variant="secondary" class="float-left">Limpiar</b-button>
          <b-button type="submit" variant="primary" class="float-right">Acceder</b-button>

          <br>

        </b-form>
      </b-col>
      <b-col cols="2">
      </b-col>
    </b-row>
    <br>

  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'login',
  data() {
    
    return {
      form: {
        name: '',
        pass: ''
      },
      show: true,
      showAlert: false
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();

      return axios({
        url: this.$store.getters.getBackendURLBase + '/api/login/admin',
        method: 'post',
        data: this.form
      })
      .then(resp => {

        localStorage.token = resp.data.obj.token;

        this.$store.commit('logIn');

        this.$router.push('/admin-list');

        return true;
      })
      .catch(err => {

        this.showAlert = true;

        return false;
      });
    },
    onReset(evt) {
      evt.preventDefault()

      this.form.name = ''
      this.form.pass = ''

      this.show = false

      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>
