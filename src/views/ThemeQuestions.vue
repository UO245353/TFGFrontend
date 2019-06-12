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
