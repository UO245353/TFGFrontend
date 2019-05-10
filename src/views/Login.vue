<template>
  <div id="login" class="login-padding center">

    <br>
    <b-row>
      <b-col cols="2">
      </b-col>
      <b-col cols="8">
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
      token: '',
      show: true
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()

      return axios({
        url: 'http://localhost:23456/api/login/admin',
        method: 'post',
        data: this.form
      })
      .then(resp => {

        this.token = resp.data.obj.token;

        this.$router.push('/admin-list');

        return true;
      })
      .catch(err => {
        console.log(err);

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
  },
  watch: {
    token(newToken) {
      localStorage.token = newToken;
    }
  }
}
</script>
