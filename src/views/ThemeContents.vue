<template>
  <div id="theme-contents" class="logged-height">
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
        <p class="fas fa-user-plus show-hand-pointer" v-on:click="" title="Nuevo Contenido"></p>
      </b-col>
    </b-row>
    <b-row v-for="section in theme.sections" role="tablist">
      <b-col cols="12">
        <Content :number="section.number" :title="section.title" :content="section.content"/>
      </b-col>
    </b-row>
    <br>
  </div>
</template>

<script>
import axios from 'axios';
import Nav from '@/components/Theme/Nav.vue';
import Content from '@/components/Theme/Content.vue';

export default {
  name: 'theme-contents',
  data() {
    return {
      themeId: this.$route.params.themeId,
      theme: {},
      isListNotLoaded: true,
      isListUpdated: true,
    }
  },
  methods: {},
  created() {

    return axios({
      url: this.$store.getters.getBackendURLBase + '/api/theme/' + this.themeId,
      method: 'get',
      headers: {
        auth: localStorage.token
      }
    })
    .then(resp => {
      console.log(resp);
      this.theme = resp.data.obj

      this.isListNotLoaded = false;
      this.isListUpdated = true;

      return true;
    })
    .catch(err => {

      throw err;
    });
  },
  watch: {
    isListUpdated(){
      if(!this.isListUpdated){

        return axios({
          url: this.$store.getters.getBackendURLBase + '/api/theme/' + this.themeId,
          method: 'get',
          headers: {
            auth: localStorage.token
          }
        })
        .then(resp => {

          this.theme = resp.data.obj

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
  components: {
    Nav,
    Content
  }
};
</script>
