<template>
  <div id="admin-list" class="logged-height">

    <AddAdmin :show="showAddAdmin" v-on:success="addAdminSuccess" v-on:close="closeModels"/>
    <br>
    <b-row>
      <b-col cols="12">
        <Nav admin=true/>
      </b-col>
    </b-row>
    <br>
    <b-row>
      <b-col cols="10">
        <p class="text-left" style="padding-left: 1rem;">Listado de Administradores</p>
      </b-col>
      <b-col cols="2">
        <p class="fas fa-user-plus show-hand-pointer" v-on:click="addUser()"></p>
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
            <strong>Cargando...</strong>
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
import Nav from '@/components/Nav.vue';
import AddAdmin from '@/components/Admin/AddAdmin.vue';

export default {
  name: 'admin-list',
  data() {
    return {
      adminList: [],
      isListNotLoaded: true,
      isListUpdated: true,
      showAddAdmin: false,
      fields: [
        { key: '_id', label: 'Id' },
        { key: 'name', label: 'Nombre' },
        { key: 'email', label: 'Correo Electronico' },
        'Editar',
        'Borrar'
      ],
    }
  },
  watch: {
    isListUpdated(){
      if(!this.isListUpdated){

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
          this.isListUpdated = true;

          return true;
        })
        .catch(err => {

          throw err;
        });
      }
    }
  },
  methods: {
    editUser(id) {},
    addUser(id) {
      this.showAddAdmin = true;
    },
    removeUser(id) {

      return axios({
        url: 'http://localhost:23456/api/admin/' + id,
        method: 'delete',
        headers: {
          auth: localStorage.token
        }
      })
      .then(() => {

        this.isListUpdated = false;
        this.isListNotLoaded = false;

        return true;
      })
      .catch(err => {

        throw err;
      });
    },
    addAdminSuccess(){
      this.isListUpdated = false;
      this.showAddAdmin = false;
    },
    closeModels() {
      this.showAddAdmin = false;
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
  },
  components: {
    Nav,
    AddAdmin
  }
};
</script>
