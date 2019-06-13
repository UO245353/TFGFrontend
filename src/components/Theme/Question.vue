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
            <b><span class="">{{ question }}</span></b>
          </b-button>
        </b-col>
        <b-col cols="2" class="d-flex align-items-center justify-content-center">
          <i class="fas fa-user-times show-hand-pointer" v-on:click="removeQuestion()" title="Borrar Pregunta"></i>
        </b-col>
      </b-row>
    </b-card-header>

    <b-collapse ref="acc" accordion="accordion" role="tabpanel">
      <b-card-body>

        <b-card-text>
          <b-row>
            <b-col cols="2" class="text-left"><u>Letra</u></b-col>
            <b-col cols="8" class="text-left"><u>Respuesta</u></b-col>
            <b-col cols="2" class="text-left"><u>Validez</u></b-col>
          </b-row>
          <b-row v-for="response in responses">
            <b-col cols="2" class="text-left"> {{ response.character }} </b-col>
            <b-col cols="8" class="text-left"> {{ response.response }} </b-col>
            <b-col cols="2" class="text-left">
              <i v-if="response.valid" class="far fa-check-circle"/>
              <i v-else class="far fa-times-circle"/>
            </b-col>
          </b-row>
        </b-card-text>

      </b-card-body>

    </b-collapse>

  </b-card>

</template>

<script>

export default {
  name: 'Content',
  props: {
    number: Number,
    question: String,
    responses: Object
  },
  data(){

    return {
      showAlert: false,
      errorMsg: '',
    };
  },
  methods: {
    removeQuestion(){

      return this.$emit('removeQuestion', {number: this.number, question: this.question, responses: this.responses});
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
