<template>

  <b-card no-body class="mb-1">


    <b-alert v-model="showAlert" variant="danger" dismissible>
      {{ errorMsg }}
    </b-alert>

    <b-card-header header-tag="header" class="p-1" role="tab">
      <b-row>
        <b-col block cols="2" class="d-flex align-items-center justify-content-center">
          {{ number }}
        </b-col>
        <b-col cols="8">
          <b-button title="Desplegar|Contraer" ref="acc-toggler" href="#" block v-b-toggle.accordion-1 variant="light">
            <b>{{ title }}</b>
          </b-button>
        </b-col>
        <b-col cols="2" class="d-flex align-items-center justify-content-center">
          <i class="fas fa-user-times show-hand-pointer" v-on:click="removeContent()" title="Borrar Contenido"></i>
        </b-col>
      </b-row>
    </b-card-header>

    <b-collapse ref="acc" accordion="accordion" role="tabpanel">
      <b-card-body>
        <b-row>
          <b-col block cols="2">

          </b-col>
          <b-col cols="8">
            <b-card-text class="text-left">{{ content }}</b-card-text>
          </b-col>
          <b-col cols="2">

          </b-col>
        </b-row>
      </b-card-body>
    </b-collapse>

  </b-card>

</template>

<script>

export default {
  name: 'Content',
  props: {
    number: Number,
    title: String,
    content: String
  },
  data(){

    return{
      showAlert: false,
      errorMsg: ''
    };
  },
  methods: {
    removeContent(){

      return this.$emit('removeContent', this.number);
    }
  },
  mounted(){
    this.$refs.acc.id = 'accordion-' + this.number;
    this.$refs['acc-toggler'].__BV_toggle_CONTROLS__ = 'accordion-' + this.number;
    this.$refs['acc-toggler'].__BV_toggle_TARGETS__[0] = 'accordion-' + this.number;

    return true;
  }
};
</script>
