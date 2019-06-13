<template>
  <div id="app" class="app-padding" >
    <b-row>
      <b-col cols="12" class="navbar-padding">
        <b-navbar toggleable="lg" type="dark" variant="info">

          <b-navbar-brand class="fas fa-arrow-circle-left show-hand-pointer" @click="$router.go(-1)" title="Retroceder" :hidden="hideNavBarMenu"></b-navbar-brand>

          <b-navbar-brand class="show-hand-pointer" @click="$router.push('/admin-list')" title="Ir a listado de administradores | Gestion TI">Gestion TI</b-navbar-brand>

          <b-navbar-toggle ref="ddSalir" target="nav-collapse" :hidden="hideNavBarMenu" title="Desplegar|Contraer"></b-navbar-toggle>

          <b-collapse id="nav-collapse" ref="nav-collapse" is-nav :hidden="hideNavBarMenu">

            <b-navbar-nav class="ml-auto" :hidden="hideNavBarMenu">
              <b-dropdown-item v-on:click="logout" right>Salir</b-dropdown-item>
            </b-navbar-nav>
          </b-collapse>

          <b-navbar-brand class="fas fa-arrow-circle-right show-hand-pointer" @click="$router.go(1)" :hidden="hideNavBarMenu" title="Avanzar" right></b-navbar-brand>
        </b-navbar>

      </b-col>
    </b-row>
    <b-container>
      <b-row>
        <b-col cols="12" id="app-core" class="app-padding center">
          <router-view />
        </b-col>
        <b-row>
        </b-container>
      </div>
    </template>

    <style>
    #app {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
    }
    #app-core {

      background-color: white
    }
    </style>

    <script>

    export default {
      methods: {
        logout(){

          this.$store.commit('logOut');

          this.$router.push('/');

          this.$refs['nav-collapse'].toggle();

          return true;
        }
      },
      computed: {
        hideNavBarMenu() {

          return !this.$store.getters.getIsLogged;
        }
      }
    };
    </script>
