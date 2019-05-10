<template>
  <div id="admin-list" class="app-padding">

    <br>
    <b-row>
      <b-col cols="12">
        <AdminList list="{{adminList}}"/>
      </b-col>
    </b-row>
    <br>

  </div>
</template>

<script>
// @ is an alias to /src
import AdminList from '@/components/AdminList.vue';

export default {
  name: 'admin-list',
  data() {
    return {
      adminList = []
    }
  },
  components: {
    AdminList
  }
};
</script>
