<template>
  <div class="col-md-6">
    <h4>Nuevo Usuario</h4>

    <div class="form-group">
      <label for="email">
        Email
        <span class="red">*</span>
      </label>
      <input
        v-model="formData.email"
        type="text"
        name="email"
        id="email"
        class="form-control"
      />
    </div>

    <div class="form-group">
      <label for="first_name">
        Nombre(s)
        <span class="red">*</span>
      </label>
      <input
        v-model="formData.first_name"
        @change="applyTrim('first_name')"
        type="text"
        name="first_name"
        id="first_name"
        class="form-control"
        autocomplete="off"
      />
    </div>

    <div class="form-group">
      <label for="last_name">
        Apellidos(s)
        <span class="red">*</span>
      </label>
      <input
        v-model="formData.last_name"
        @change="applyTrim('last_name')"
        type="text"
        name="last_name"
        id="last_name"
        class="form-control"
        autocomplete="off"
      />
    </div>

    <div class="form-group">
      <label for="birthday">
        Fecha de Nacimiento
        <span class="red">*</span>
      </label>
      <input
        v-model="formData.birthday"
        @change="applyTrim('birthday')"
        type="date"
        name="birthday"
        id="birthday"
        class="form-control"
        autocomplete="off"
      />
    </div>

    <div class="row mt-3" v-if="getHasError || getHasSuccess">
      <div class="col">
        <div :class="alertClass" role="alert">
          <ul v-if="messages.length">
            <li v-for="(value, index) in messages" :key="index">
              {{ value }}
            </li>
          </ul>
          <span v-else>Ops! Ha ocurrido un error, intente nuevamente</span>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col text-center">
        <button @click="resetForm()" class="btn btn-warning mt-4">
          Limpiar
        </button>
      </div>
      <div class="col text-center">
        <button
          v-bind="isDisabledButton"
          @click="saveForm()"
          class="btn btn-primary mt-4"
        >
          Registrar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "FormComponent",
  props: ["rowsData"],
  data() {
    return {
      formData: {
        first_name: "",
        last_name: "",
        birthday: "",
        email: "",
      },
      messages: [],
    };
  },
  computed: {
    ...mapGetters(["getStatusCreate", "getHasError", "getHasSuccess"]),

    isDisabledButton: function () {
      const inputs = Object.keys(this.formData);
      let isDisabled = true;

      if (this.minLengthValidation(inputs)) {
        isDisabled = false;
      }

      return {
        disabled: isDisabled,
      };
    },
    alertClass: function () {
      return this.getHasError ? "alert alert-danger" : "alert alert-primary";
    },
    emailsData: function () {
      return this.rowsData.map((row) => row.email);
    },
    nextId: function () {
      return [...this.rowsData].pop().id + 1;
    },
  },
  methods: {
    ...mapActions(["setErrorCreate", "setSuccessCreate"]),

    applyTrim: function (element) {
      this.formData[element] = this.formData[element].trim();
    },

    saveForm: async function () {
      this.messages = [];

      if (this.checkExistEmail(this.formData.email)) {
        this.setErrorCreate();
        this.messages.push("Ya existe un registro con su email");
        return;
      }

      this.messages.push("Registro creado correctamente");
      this.$emit("addRow", {
        ...this.formData,
        id: this.nextId,
        age: this.calcAgeUser(this.formData.birthday),
      });
      this.setSuccessCreate();
      this.resetForm(true);
    },
    resetForm: function (success = false) {
      this.formData = {
        first_name: "",
        last_name: "",
        email: "",
        birthday: "",
      };
      this.hasError = false;
      this.hasSuccess = success;
    },
    minLengthValidation: function (inputs) {
      const resultado = inputs.every((input) => {
        return this.formData[input].length > 1;
      });

      return resultado;
    },
    checkExistEmail: function (value) {
      return this.emailsData.includes(value);
    },
    calcAgeUser: function (date) {
      let date_now = new Date();
      let yearsDiff = date_now.getFullYear() - new Date(date).getFullYear();

      return yearsDiff;
    },
  },
};
</script>
