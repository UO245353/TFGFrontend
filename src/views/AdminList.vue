<template>
  <div id="admin-list" class="logged-height">

    <br>
    <b-row>
      <b-col cols="12">
        <b-breadcrumb :items="items"></b-breadcrumb>
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
          :items="adminList">
          <div slot="table-busy" class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
          </div>
        </b-table>
      </div>
    </b-col>
  </b-row>
  <br>

</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'admin-list',
  data() {
    return {
      adminList: [],
      slide: 0,
      sliding: null,
      isListNotLoaded: true,
      items: [
        {
          text: 'Administradores',
          href: '#',
          active: true
        },
        {
          text: 'Temas',
          href: '#'
        }
      ]
    }
  },
  created() {

    return axios({
      url: 'http://localhost:23456/api/admin',
      method: 'get',
      headers: {
        auth: localStorage.token
      }
    })
    .then(resp => {

      this.adminList = resp.data.obj;

      this.isListNotLoaded = false;

      return true;
    })
    .catch(err => {

      throw err;
    });
  }
};
</script>
