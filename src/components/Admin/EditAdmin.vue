<template>
  <div class='EditAdmin'>
    <b-nav tabs fill align="center">
      <b-nav-item to="admin-list" v-on:click="adminActive()" v-bind:active="admin">Administradores</b-nav-item>
      <b-nav-item to="theme-list" v-on:click="temaActive()" v-bind:active="temas">Temas</b-nav-item>
    </b-nav>
  </div>
</template>

<script>

export default {
  name: 'EditAdmin',
  props: {
    admin: Boolean,
    temas: Boolean
  },
  methods: {
    adminActive(){
      this.admin = true;
      this.temas = false;
    },
    temaActive(){
      this.admin = false;
      this.temas = true;
    }
  }
};
</script>
