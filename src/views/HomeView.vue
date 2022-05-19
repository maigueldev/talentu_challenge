<template>
  <div class="row">
    <form-component :rowsData="rowsData" @addRow="appendRow" />

    <div class="d-block d-md-none d-lg-none d-xl-none d-xxl-none mt-5"></div>

    <table-component :data="rowsData" :loading="isLoading" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import FormComponent from "../components/FormComponent.vue";
import TableComponent from "../components/TableComponent.vue";

export default {
  name: "HomeView",
  components: {
    FormComponent,
    TableComponent,
  },
  data() {
    return {
      rowsData: [],
      isLoading: false,
    };
  },
  async created() {
    await this.getDataList();
  },
  computed: {
    ...mapGetters([
      "getData",
      "getStatusCreate",
      "getHasError",
      "getHasSuccess",
    ]),
  },
  methods: {
    ...mapActions(["getDataList", "create", "setErrorCreate"]),

    refreshTableData: function () {
      this.isLoading = true;
      setTimeout(() => {
        this.getDataList();
        this.isLoading = false;
      }, 150);
    },
    appendRow: function (value) {
      this.rowsData.push(value);
    },
  },
  watch: {
    getData: function (newValues) {
      this.rowsData = newValues;
    },
  },
};
</script>
