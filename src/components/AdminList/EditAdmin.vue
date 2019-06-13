<template>
  <b-modal
  v-on:hide="cancel()"
  v-model="show"
  size="xl"
  centered
  title="Editar Administrador"
  header-bg-variant="info"
  header-text-variant="light"
  body-bg-variant="light"
  body-text-variant="dark"
  footer-bg-variant="light"
  footer-text-variant="dark">

  <b-form>
    <b-container fluid>

      <b-alert v-model="showAlert" variant="danger" dismissible>
        {{ errorMsg }}
      </b-alert>

      <b-form-row class="my-1">

        <b-col sm="3">
          <label for="name">Nombre</label>
        </b-col>

        <b-col sm="9">
          <b-form-input
          id="name"
          type="text"
          :state="nameState"
          placeholder="Nombre"
          v-model="editAdminData.name"
          aria-describedby="input-live-feedback"
          required></b-form-input>
          <b-form-invalid-feedback id="input-live-feedback">
            El nombre debe contener al menos 3 letras
          </b-form-invalid-feedback>
        </b-col>

      </b-form-row>

      <b-form-row class="my-1">

        <b-col sm="3">
          <label for="email">Correo Electronico</label>
        </b-col>

        <b-col sm="9">
          <b-form-input
          id="email"
          type="email"
          :state="emailState"
          placeholder="Correo Electronico"
          v-model="editAdminData.email"
          aria-describedby="input-live-feedback"
          required></b-form-input>
          <b-form-invalid-feedback id="input-live-feedback">
            El correo electronico debe contener al menos 1 un secuencia de texto segui da una "@", texto, un "." y texto
          </b-form-invalid-feedback>
        </b-col>

      </b-form-row>

      <b-form-row class="my-1">

        <b-col sm="3">
          <label for="pass">Clave</label>
        </b-col>

        <b-col sm="9">
          <b-form-input
          id="pass"
          type="password"
          :state="passState"
          placeholder="Clave"
          v-model="editAdminData.pass"
          aria-describedby="input-live-feedback"
          required></b-form-input>
          <b-form-invalid-feedback id="input-live-feedback">
            La clave debe de estar formada por entre 6 y 15 caracteres, con al menos una mayuscula una minuscula, un numero y un caracter especial
          </b-form-invalid-feedback>
        </b-col>

      </b-form-row>

      <b-form-row class="my-1">

        <b-col sm="3">
          <label for="confPass">Confirmar Clave</label>
        </b-col>

        <b-col sm="9">
          <b-form-input
          id="confPass"
          type="password"
          :state="confirmState"
          placeholder="Confirmar Clave"
          v-model="confPass"
          aria-describedby="input-live-feedback"
          required></b-form-input>
          <b-form-invalid-feedback id="input-live-feedback">
            La clave y la clave repetida deben coincidir
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
    v-on:click="onSubmit()">Editar</b-button>
  </div>
</b-modal>
</template>

<script>
import axios from 'axios';

export default {
  name: 'EditAdmin',
  props: {
    show: String,
    editAdminData: Object
  },
  data() {

    return {
      showAlert: false,
      errorMsg: '',
      confPass: undefined
    };
  },
  computed: {
    nameState() {

      if(!this.editAdminData.name){

        return null;
      }

      return /^.{3,}$/.test(this.editAdminData.name);
    },
    emailState() {

      if(!this.editAdminData.email){

        return null;
      }

      return /^.{1,}@.{1,}\..{1,}$/.test(this.editAdminData.email);
    },
    passState() {

      if(!this.editAdminData.pass){

        return null;
      }

      return /^(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d\s])[A-Za-z\d]|[^a-zA-Z\d\s]{6,15}/.test(this.editAdminData.pass);
    },
    confirmState() {

      if(!this.editAdminData.pass){

        return null;
      }

      return this.confPass === this.editAdminData.pass;
    },
  },
  methods: {
    onSubmit() {

      if(!!this.nameState && !!this.emailState && (!!this.passState || this.passState === null) && (!!this.confirmState || this.confirmState === null)){

        return axios({
          url: this.$store.getters.getBackendURLBase + '/api/admin/' + this.editAdminData._id,
          method: 'post',
          headers: {
            auth: localStorage.token
          },
          data: this.editAdminData
        })
        .then(() => this.$emit('success'))
        .catch(err => {

          switch(err.response.status){
            case 409: {
              this.errorMsg = 'Nombre duplicado';
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

      return false;
    },
    cancel() {

      this.confPass = undefined;

      return this.$emit('close');
    }
  }
};
</script>
