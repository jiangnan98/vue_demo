<template >
  <div class="company-container" >
    <div class="data-list" />
  </div>
</template>

<script>
export default {
  name: 'Xxx',

  components: {},

  directives: {},

  data() {
    return {
      companyList: []
    }
  },
  computed: {},

  watch: {},
  created() {
    this.getData()
  },
  filter: {},

  methods: {
    async getData() {
      this.loading = true
      this.$store
        .dispatch('company/companyList', this.loginForm)
        .then((res) => {
          this.companyList = res.result
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    }
  }

}

</script>

<style  scoped></style>

