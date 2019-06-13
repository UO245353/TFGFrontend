<template>
  <div id="admin-list" class="logged-height">

    <AddAdmin :show="showAddAdmin" v-on:success="addUserSuccess" v-on:close="closeModels"/>
    <EditAdmin :editAdminData="editAdminData" :show="showEditAdmin" v-on:success="editUserSuccess" v-on:close="closeModels"/>
    <RemoveAdmin :adminData="deleteAdminData" :show="showRemoveAdmin" v-on:success="removeUserSuccess" v-on:close="closeModels"/>

    <b-alert v-model="showAlert" variant="danger" dismissible>
      {{ errorMsg }}
    </b-alert>

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
        <p class="fas fa-user-plus show-hand-pointer" v-on:click="addUser()" title="Nuevo Administrador"></p>
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
            <i class="fas fa-user-edit show-hand-pointer" v-on:click="editUser(data.item._id)" title="Editar Administrador"></i>
          </template>
          <template slot="Borrar" slot-scope="data">
            <i class="fas fa-user-times show-hand-pointer" v-on:click="removeUser(data.item._id)" title="Borrar Administrador"></i>
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
import AddAdmin from '@/components/AdminList/AddAdmin.vue';
import RemoveAdmin from '@/components/AdminList/DeleteAdmin.vue';
import EditAdmin from '@/components/AdminList/EditAdmin.vue';

export default {
  name: 'admin-list',
  data() {
    return {
      showAlert: false,
      errorMsg: '',
      adminList: [],
      isListNotLoaded: true,
      isListUpdated: true,
      showAddAdmin: false,
      showRemoveAdmin: false,
      showEditAdmin: false,
      deleteAdminData: {},
      editAdminData: {},
      fields: [
        { key: '_id', label: 'Id' },
        { key: 'name', label: 'Nombre' },
        { key: 'email', label: 'Correo Electronico' },
        'Editar',
        'Borrar'
      ]
    }
  },
  methods: {
    editUser(id) {
      this.editAdminData = this.adminList.find(admin => admin._id === id);

      this.showEditAdmin = true;

      return true;
    },
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

      return this.closeModels();
    },
    addUserSuccess(){
      this.isListUpdated = false;

      return this.closeModels();
    },
    editUserSuccess(){
      this.isListUpdated = false;

      return this.closeModels();
    },
    closeModels() {

      this.deleteAdminData = {};

      this.showAddAdmin = false;
      this.showEditAdmin = false;
      this.showRemoveAdmin = false;

      return true;
    }
  },
  created() {

    return axios({
      url: this.$store.getters.getBackendURLBase + '/api/admin',
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

      switch(err.response.status){
        case 401: {
          this.errorMsg = 'Operacion no autorizada, token invalido';
          break;
        }
        default: {
          this.errorMsg = 'Error desconocido';
        }
      }

      this.showAlert = true;

      return false;
    });
  },
  watch: {
    isListUpdated(){
      if(!this.isListUpdated){

        return axios({
          url: this.$store.getters.getBackendURLBase + '/api/admin',
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

          switch(err.response.status){
            case 401: {
              this.errorMsg = 'Operacion no autorizada, token invalido';
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
    }
  },
  components: {
    Nav,
    AddAdmin,
    RemoveAdmin,
    EditAdmin
  }
};
</script>
