<template>
  <div id="app">
    <b-row>
      <b-col sm="12">
        <b-navbar toggleable="lg" type="dark" variant="info">
          <b-navbar-brand href="#">Gestion TI</b-navbar-brand>
        </b-navbar>
      </b-col>
    </b-row>
    <b-container>
      <b-row>
        <b-col cols="12" id="app-core">
          <router-view/>
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
