<template>
  <div id="theme-questions" class="logged-height">
    <b-row>
      <b-col cols="12">
        <Nav :questions="true" :themeId="themeId"/>
      </b-col>
    </b-row>
    <br>
    <b-row>
    </b-row>
    <br>
  </div>
</template>

<script>
import axios from 'axios';
import Nav from '@/components/Theme/Nav.vue';

export default {
  name: 'theme-questions',
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
    Nav
  }
};
</script>
