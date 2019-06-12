<template>

  <b-card no-body class="mb-1">
    <b-card-header header-tag="header" class="p-1" role="tab">
      <b-row>
        <b-col block cols="2">
            {{ number }}
        </b-col>
        <b-col cols="8">
          <b-button ref="acc-toggler" href="#" block v-b-toggle.accordion-1 variant="light">
            <b><span class="">{{ question }}</span></b>
          </b-button>
        </b-col>
        <b-col cols="2">

        </b-col>
      </b-row>
    </b-card-header>

    <b-collapse ref="acc" accordion="accordion" role="tabpanel">
      <b-card-body>

        <b-card-text>
          <b-row v-for="response in responses">
            <b-col cols="2"> {{ response.character }} </b-col>
            <b-col cols="8" class="text-left"> {{ response.response }} </b-col>
            <b-col cols="2"> {{ (response.valid) ? 'Verdadero' : 'Falso' }} </b-col>
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
  methods: {},
  mounted(){
    this.$refs.acc.id = 'accordion-' + this.number;
    this.$refs['acc-toggler'].__BV_toggle_CONTROLS__ = 'accordion-' + this.number;
    this.$refs['acc-toggler'].__BV_toggle_TARGETS__[0] = 'accordion-' + this.number;
  }
};
</script>
