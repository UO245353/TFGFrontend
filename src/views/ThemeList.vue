<template>
  <div id="theme-list" class="logged-height">

    <AddTheme :show="showAddTheme" v-on:success="addThemeSuccess" v-on:close="closeModels"/>
    <EditTheme :editThemeData="editThemeData" :show="showEditTheme" v-on:success="editThemeSuccess" v-on:close="closeModels"/>
    <RemoveTheme :themeData="deleteThemeData" :show="showRemoveTheme" v-on:success="removeThemeSuccess" v-on:close="closeModels"/>

    <b-alert v-model="showAlert" variant="danger" dismissible>
      {{ errorMsg }}
    </b-alert>

    <br>
    <b-row>
      <b-col cols="12">
        <Nav temas=true/>
      </b-col>
    </b-row>
    <br>
    <b-row>
      <b-col cols="10">
        <p class="text-left" style="padding-left: 1rem;">Listado de Temas</p>
      </b-col>
      <b-col cols="2">
        <p class="fas fa-user-plus show-hand-pointer" v-on:click="addTheme()" title="Nuevo Tema"></p>
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
          :items="themeList"
          :fields="fields">
          <div slot="table-busy" class="text-center text-info my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
          </div>
          <template slot="Editar" slot-scope="data">
            <i class="fas fa-user-edit show-hand-pointer" v-on:click="editTheme(data.item._id)" title="Editar Tema"></i>
          </template>
          <template slot="Borrar" slot-scope="data">
            <i class="fas fa-user-times show-hand-pointer" v-on:click="removeTheme(data.item._id)" title="Borrar Tema"></i>
          </template>
          <template slot="Ver Detalle" slot-scope="data">
            <i class="fas fa-arrow-alt-circle-right show-hand-pointer" v-on:click="gotToThemeDetails(data.item._id)" title="Ver Detalle"></i>
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
import AddTheme from '@/components/ThemeList/AddTheme.vue';
import EditTheme from '@/components/ThemeList/EditTheme.vue';
import RemoveTheme from '@/components/ThemeList/DeleteTheme.vue';

export default {
  name: 'theme-list',
  data() {
    return {
      showAlert: false,
      errorMsg: '',
      themeList: [],
      isListNotLoaded: true,
      isListUpdated: true,
      showAddTheme: false,
      showRemoveTheme: false,
      showEditTheme: false,
      fields: [
        { key: '_id', label: 'Id' },
        { key: 'number', label: 'Numero' },
        { key: 'title', label: 'Titulo' },
        { key: 'questions.length', label: 'Preguntas' },
        { key: 'sections.length', label: 'Apartados' },
        'Editar',
        'Borrar',
        'Ver Detalle'
      ],
      deleteThemeData: {},
      editThemeData: {},
    }
  },
  methods: {
    gotToThemeDetails(id){

      return this.$router.push('/theme/'+ id +'/contents');
    },
    editTheme(id) {
      this.editThemeData = this.themeList.find(theme => theme._id === id);

      this.showEditTheme = true;

      return true;
    },
    addTheme() {
      this.showAddTheme = true;

      return true;
    },
    removeTheme(id) {
      this.deleteThemeData = this.themeList.find(theme => theme._id === id);

      this.showRemoveTheme = true;

      return true;
    },
    editThemeSuccess(){
      this.isListUpdated = false;

      return this.closeModels();
    },
    addThemeSuccess(){
      this.isListUpdated = false;

      return this.closeModels();
    },
    removeThemeSuccess(){

      this.isListUpdated = false;

      return this.closeModels();
    },
    closeModels() {

      this.deleteThemeData = {};
      this.editThemeData = {};

      this.showAddTheme = false;
      this.showEditTheme = false;
      this.showRemoveTheme = false;

      return true;
    }
  },
  created() {

    return axios({
      url: this.$store.getters.getBackendURLBase + '/api/theme',
      method: 'get',
      headers: {
        auth: localStorage.token
      }
    })
    .then(resp => {

      this.themeList = resp.data.obj;

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
          url: this.$store.getters.getBackendURLBase + '/api/theme',
          method: 'get',
          headers: {
            auth: localStorage.token
          }
        })
        .then(resp => {

          this.themeList = resp.data.obj

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
    EditTheme,
    AddTheme,
    RemoveTheme
  }
};
</script>
