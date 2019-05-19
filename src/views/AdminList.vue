<template>
  <div id="admin-list" class="logged-height">

    <AddAdmin :show="showAddAdmin" v-on:success="addUserSuccess" v-on:close="closeModels"/>
    <RemoveAdmin :adminData="deleteAdminData" :show="showRemoveAdmin" v-on:success="removeUserSuccess" v-on:close="closeModels"/>
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
import RemoveAdmin from '@/components/Admin/DeleteAdmin.vue';

export default {
  name: 'admin-list',
  data() {
    return {
      adminList: [],
      isListNotLoaded: true,
      isListUpdated: true,
      showAddAdmin: false,
      showRemoveAdmin: false,
      fields: [
        { key: '_id', label: 'Id' },
        { key: 'name', label: 'Nombre' },
        { key: 'email', label: 'Correo Electronico' },
        'Editar',
        'Borrar'
      ],
      deleteAdminData: {}
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
    addUser() {
      this.showAddAdmin = true;

      return true;
    },
    removeUser(id) {
      this.deleteAdminData = this.adminList.find(admin => admin._id === id);

      this.showRemoveAdmin = true;

      return true;
    },
    removeUserSuccess(){

      this.isListUpdated = false;

      this.methods.closeModels();
      return true;
    },
    addUserSuccess(){
      this.isListUpdated = false;

      this.methods.closeModels();
      return true;
    },
    closeModels() {
      
      this.deleteAdminData = {};

      this.showAddAdmin = false;
      this.showRemoveAdmin = false;

      return true;
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
    AddAdmin,
    RemoveAdmin
  }
};
</script>
