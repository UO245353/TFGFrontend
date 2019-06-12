<template>
  <div id="theme-contents" class="logged-height">
    <b-row>
      <b-col cols="12">
        <Nav :contents="true" :themeId="themeId"/>
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
  name: 'theme-contents',
  data() {
    return {
      themeId: this.$route.params.themeId
    }
  },
  methods: {},
  created() {

    return;
  },
  watch: {},
  components: {
    Nav
  }
};
</script>
