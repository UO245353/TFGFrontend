<template>
  <div id="app">
    <b-container fluid>
      <b-row>
        <b-col sm="12">
          <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand href="#">Gestion TI</b-navbar-brand>
          </b-navbar>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="1">
        </b-col>
        <b-col cols="10">
          <router-view/>
        </b-col>
        <b-col sm="1">
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
      color: #2c3e50;
    }

    #nav {
      padding: 30px;
    }

    #nav a {
      font-weight: bold;
      color: #2c3e50;
    }

    #nav a.router-link-exact-active {
      color: #42b983;
    }
    </style>
