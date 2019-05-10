<template>
  <div id="login">

    <br>
    <b-row>
      <b-col cols="2">
      </b-col>
      <b-col cols="8">
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">

          <b-form-input id="uo-input" v-model="form.uo" placeholder="Ingresa tu UO" required/>
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
export default {
  name: 'login',
  data() {
    return {
      form: {
        uo: '',
        pass: ''
      },
      show: true
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      alert(JSON.stringify(this.form))
    },
    onReset(evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.uo = ''
      this.form.pass = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>
