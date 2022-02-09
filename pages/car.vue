<template>
  <div>
    <h3>View Users</h3>
    <button class="btn btn-success" @click="Usersview = !Usersview">
      View Users
    </button>
    <div class="mt-3 col-sm-4 posts" v-if="Usersview">
      <div
        :class="['alert', itemUsers.state ? 'alert-success' : 'alert-primary']"
        role="alert"
        v-for="(itemUsers, indexUser) of usersData"
        :key="itemUsers.id"
        @click="select(indexUser)"
      >
        {{ itemUsers.name }} {{ itemUsers.lastname }}
      </div>
    </div>
    <h3>View Products</h3>
    <div class="background">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Value</th>
            <th scope="col">Weight</th>
            <th scope="col">Quantity</th>
            <!--  <th scope="col">Actions</th> -->
            <th scope="col">Car</th>
          </tr>
        </thead>
        <tbody v-for="item of product" :key="item.id">
          <tr>
            <td>{{ item.name }}</td>
            <td>{{ item.value }}</td>
            <td>{{ item.weight }}</td>
            <td>{{ item.quantity }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CrudService from "../pages/services/crudService";

export default {
  data() {
    return {
      Usersview: false,
      product: [],
      usersData: [],
      listProducts: [],
    };
  },
  methods: {
    select(index) {
      console.log(this.usersData[index]);
     
      this.idUser = this.usersData[index].id;
      this.crudService.listById(this.idUser).then((data) => {
        if (data.status === 200) {
          console.log("Consulta Exitosa Exitoso");
          for (let index = 0; index < data.data.length; index++) {
              console.log(data.data[index])
              this.crudService
              .listByIdProduct(data.data[index].idProduc)
              .then((dataProduct) => {
                if (data.status === 200) {
                    console.log("Entro A productos")
                    console.log(dataProduct.data)
                    this.listProducts.push({index:dataProduct.data[index]});
                  /* for (let items = 0;items < dataProduct.data.length;items++) {
                    this.listProducts.push(dataProduct.data[items]);
                    console.log(listProducts)
                  } */
                }
              });
          }
          this.product = listProducts;
        }
      });
    },
  },
  async created() {
    this.crudService = new CrudService();
  },
  async mounted() {
    const dataUsers = await axios.get("http://localhost:8080/users/list");
    this.usersData = dataUsers.data;
  },
};
</script>

<style>
.background {
  background: white;
}
</style>
