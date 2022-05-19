<template>
  <div class="col-md-6">
    <div class="table-responsive">
      <h4>Listado de Usuarios</h4>
      <div v-if="loading">
        <img src="../assets/loading.gif" alt="Loading" width="125px" />
      </div>
      <table v-else class="table table-bordered table-striped">
        <thead>
          <th>Id</th>
          <th>Nombre</th>
          <th>Edad</th>
          <th>Email</th>
        </thead>
        <tbody>
          <tr v-for="(value, index) in data" :key="index">
            <td>{{ value.id }}</td>
            <td>{{ value.first_name }}</td>
            <td>{{ value.age }}</td>
            <td>{{ value.email }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "TableComponent",
  props: ["data", "loading"],
};
</script>
