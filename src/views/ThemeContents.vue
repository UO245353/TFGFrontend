<template>
  <div id="theme-contents" class="logged-height">

    <DeleteContent :themeId="themeId" :sectionData="deleteSectionData" :show="showRemoveContent" v-on:success="removeContentSuccess" v-on:close="closeModels"/>

    <b-alert v-model="showAlert" variant="danger" dismissible>
      {{ errorMsg }}
    </b-alert>

    <b-row>
      <b-col cols="12">
        <Nav :contents="true" :themeId="themeId"/>
      </b-col>
    </b-row>
    <br>
    <b-row>
      <b-col cols="10">
        <p class="text-left" style="padding-left: 1rem;">Listado de Contenidos</p>
      </b-col>
      <b-col cols="2">
        <p class="fas fa-user-plus show-hand-pointer" title="Nuevo Contenido"></p>
      </b-col>
    </b-row>
    <b-row v-for="section in theme.sections" role="tablist">
      <b-col cols="12">
        <Content :number="section.number" :title="section.title" :content="section.content" v-on:removeContent="removeContent"/>
      </b-col>
    </b-row>
    <br>
  </div>
</template>

<script>
import axios from 'axios';
import Nav from '@/components/Theme/Nav.vue';
import Content from '@/components/Theme/Content.vue';
import DeleteContent from '@/components/Theme/DeleteContent.vue';

export default {
  name: 'theme-contents',
  data() {
    return {
      showAlert: false,
      errorMsg: '',
      themeId: this.$route.params.themeId,
      theme: {},
      showRemoveContent: false,
      deleteSectionData: {}
    }
  },
  methods: {
    removeContent(sectionData){
      console.log('hola',sectionData);
      this.deleteSectionData = sectionData;
      this.showRemoveContent = true;

      return true;
    },
    removeContentSuccess(){
      this.deleteSectionData = {};

      this.closeModels();

      return location.reload();
    },
    closeModels(){

      this.showRemoveContent = false;

      return true;
    }
  },
  created() {

    return axios({
      url: this.$store.getters.getBackendURLBase + '/api/theme/' + this.themeId,
      method: 'get',
      headers: {
        auth: localStorage.token
      }
    })
    .then(resp => {
      this.theme = resp.data.obj

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
  components: {
    Nav,
    Content,
    DeleteContent
  }
};
</script>
