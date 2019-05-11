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
            :items="adminList"/>
      </div>
    </b-col>
  </b-row>
  <br>

</div>
</template>

<script>

export default {
  name: 'admin-list',
  data() {
    return {
      adminList: [
        {
          _id: '0123456789012345678901',
          name: 'dani',
          email: '1@1.1'
        },
        {
          _id: '0123456789012345678901',
          name: 'dani',
          email: '1@1.1'
        },
        {
          _id: '0123456789012345678901',
          name: 'dani',
          email: '1@1.1'
        },
      ],
      slide: 0,
      sliding: null,
      items: [
        {
          text: 'Administradores',
          href: '#',
          active: true
        },
        {
          text: 'Administradores',
          href: '#',
          active: true
        },
        {
          text: 'Administradores',
          href: '#',
          active: true
        },
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
  methods: {
    onSlideStart() {
      this.sliding = true
    },
    onSlideEnd() {
      this.sliding = false
    }
  }
};
</script>
