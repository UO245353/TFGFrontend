<template>
  <div id="admin-list" class="logged-height">

    <br>
    <b-row>
      <b-col cols="12">
        <Nav temas=true/>
      </b-col>
    </b-row>
    <br>
    <b-row>
      <b-col cols="10">
        <p class="text-left" style="padding-left: 1rem;" v-on:click="addTema()">Listado de Temas</p>
      </b-col>
      <b-col cols="2">
        <p class="fas fa-user-plus show-hand-pointer"></p>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <div>
          <b-table
          outlined
          hover
          responsive
          :busy="isListNotLoaded"
          :items="temaList"
          :fields="fields">
          <div slot="table-busy" class="text-center text-info my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
          </div>
          <template slot="Editar" slot-scope="data">
            <i class="fas fa-user-edit show-hand-pointer" v-on:click="editTema(data.item._id)"></i>
          </template>
          <template slot="Borrar" slot-scope="data">
            <i class="fas fa-user-times show-hand-pointer" v-on:click="removeTema(data.item._id)"></i>
          </template>
        </b-table>
      </div>
    </b-col>
  </b-row>
  <br>
</div>
</template>

<script>
import axios from 'axios';
import Nav from '@/components/Nav.vue';

export default {
  name: 'theme-list',
  data() {
    return {
      temaList: [],
      isListNotLoaded: true,
      fields: [
        { key: '_id', label: 'Id' },
        { key: 'number', label: 'Numero' },
        { key: 'title', label: 'Titulo' },
        { key: 'questions.length', label: 'Preguntas' },
        { key: 'sections.length', label: 'Apartados' },
        'Editar',
        'Borrar'
      ]
    }
  },
  methods: {
    editTema(id) {
      console.log(id);
    },
    addTema() {
      console.log();
    },
    removeTema(id) {
      console.log(id);
    }
  },
  created() {

    return axios({
      url: 'http://localhost:23456/api/theme',
      method: 'get',
      headers: {
        auth: localStorage.token
      }
    })
    .then(resp => {

      this.temaList = resp.data.obj;

      this.isListNotLoaded = false;

      return true;
    })
    .catch(err => {

      throw err;
    });
  },
  components: {
    Nav
  }
};
</script>
