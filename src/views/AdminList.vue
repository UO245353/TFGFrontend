<template>
  <div id="admin-list" class="logged-height">

    <br>
    <b-row>
      <b-col cols="12">
        <b-breadcrumb :items="items"></b-breadcrumb>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="10">
        <p class="text-left" style="padding-left: 1rem;" v-on:click="addUser()">Listado de Administradores</p>
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
          :items="adminList"
          :fields="fields">
          <div slot="table-busy" class="text-center text-info my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
          </div>
          <template slot="Editar" slot-scope="data">
            <i class="fas fa-user-edit show-hand-pointer" v-on:click="editUser(data.item._id)"></i>
          </template>
          <template slot="Borrar" slot-scope="data">
            <i class="fas fa-user-times show-hand-pointer" v-on:click="removeUser(data.item._id)"></i>
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

export default {
  name: 'admin-list',
  data() {
    return {
      adminList: [],
      slide: 0,
      sliding: null,
      isListNotLoaded: true,
      fields: [
        { key: '_id', label: 'Id' },
        { key: 'name', label: 'Nombre' },
        { key: 'email', label: 'Correo Electronico' },
        'Editar',
        'Borrar'
      ],
      items: [
        {
          text: 'Administradores',
          href: '#',
          active: true
        },
        {
          text: 'Temas',
          href: '#'
        }
      ]
    }
  },
  methods: {
    editUser(id) {
      console.log(id);
    },
    addUser(id) {
      console.log();
    },
    removeUser(id) {
      console.log(id);
    }
  },
  created() {

    return axios({
      url: 'http://localhost:23456/api/admin',
      method: 'get',
      headers: {
        auth: localStorage.token
      }
    })
    .then(resp => {

      this.adminList = resp.data.obj

      this.isListNotLoaded = false;

      return true;
    })
    .catch(err => {

      throw err;
    });
  }
};
</script>
