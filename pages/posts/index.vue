<template>
  <div>
    <button class="btn btn-primary" @click="showModal = !showModal">
      Create
    </button>
    <br />
    <hr />
    <div class="posts" v-if="showModal">
      <div class="col-sm-12">
        <div class="col-sm-4 row">
          <label>Name</label>
          <input
            type="text"
            class="form-control"
            placeholder="Name"
            v-model="newProduct.name"
          />
        </div>
        <div class="col-sm-4 row">
          <label>Value</label>
          <input
            type="number"
            class="form-control"
            placeholder="Value"
            v-model="newProduct.value"
          />
        </div>
        <div class="col-sm-4 row">
          <label>Weight</label>
          <input
            type="text"
            class="form-control"
            placeholder="Weight"
            v-model="newProduct.weight"
          />
        </div>
        <div class="col-sm-4 row">
          <label>Quantity</label>
          <input
            type="text"
            class="form-control"
            placeholder="Quantity"
            v-model="newProduct.quantity"
          />
        </div>
        <br />
        <button class="btn btn-success btn-sm" @click="save">Save</button>
      </div>
    </div>
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
    <hr />
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
        <tbody v-for="(item, index) of product" :key="item.id">
          <tr>
            <td>{{ item.name }}</td>
            <td>{{ item.value }}</td>
            <td>{{ item.weight }}</td>
            <td>{{ item.quantity }}</td>
            <!-- <td @click="delet(index)">
              <button class="btn btn-danger btn-sm">X</button>
            </td> -->
            <td @click="addToCar(index)">
              <button class="btn btn-warning btn-sm">Car</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="col-sm-2 row">
      <label>User Car</label>
      <input
        disabled
        type="text"
        class="form-control"
        placeholder="User Car"
        v-model="userCar"
      />
    </div>
    <div class="col-sm-2 row">
      <label>Product</label>
      <input
        type="text"
        class="form-control"
        placeholder="Produc"
        v-model="addProduct"
        disabled
      />
    </div>
    <div class="col-sm-2 row">
      <label>Quantity</label>
      <input
        type="number"
        class="form-control"
        placeholder="Quantity"
        v-model="quantityToCar"
      />
    </div>
    <br>
    <button class="btn btn-success btn-sm" @click="saveToCar">Add To Car</button>
  </div>
</template>

<script>
import axios from "axios";
import Posts from "../../components/Posts";
import Vue from "vue";
import { VuejsDatatableFactory } from "vuejs-datatable";
import CrudService from "../services/crudService";

Vue.use(VuejsDatatableFactory);

export default {
  components: {
    Posts,
  },
  data() {
    return {
      product: [],
      usersData: [],
      showModal: false,
      colorAler: false,
      Usersview: false,

      userCar: null,
      addProduct:null,
      quantityToCar:null,

      usersDataId:null,
      productId:null,


      newProduct: [
        {
          name: null,
          value: null,
          weight: null,
          quantity: null,
        },
      ],
    };
  },
  methods: {
    save() {
      const newProducts = {
        name: this.newProduct.name,
        value: this.newProduct.value,
        weight: this.newProduct.weight,
        quantity: this.newProduct.quantity,
      };
      console.log(newProducts);
      this.crudService.save(newProducts).then((data) => {
        if (data.status === 200) {
          console.log("Guardado Exitoso");
          location.reload();
        }
      });
    },
    select(indexUser) {
      this.userCar = this.usersData[indexUser].name +" " + this.usersData[indexUser].lastname;
        this.usersDataId = this.usersData[indexUser].id;
        this.Usersview = false;
    },

    addToCar(index){
      this.addProduct = this.product[index].name;
      this.productId = this.product[index].id;
    },

    saveToCar(){
      const newProductToCar = {
        cantidad: this.quantityToCar,
        idUser: this.usersDataId,
        idProduc: this.productId
      }

      console.log(newProductToCar)
      this.crudService.saveToCar(newProductToCar).then((data) => {
        if (data.status === 200) {
          console.log("Guardado Exitoso");
          location.reload();
        }
      })
    },
    delet(event) {
      console.log(this.product[event]);
    },
  },
  async created() {
    this.crudService = new CrudService();
  },
  async mounted() {
    const res = await axios.get("http://localhost:8080/products/list");

    this.product = res.data.products;

    const dataUsers = await axios.get("http://localhost:8080/users/list");
    this.usersData = dataUsers.data.users;
  },
};
</script>

<style scoped>
.post-enter,
.post-leave-to {
  opacity: 0;
}

.background {
  background: white;
}

.post-enter-active,
.post-leave-to-active {
  transition: opacity 0.5s;
}
</style>>
