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
            v-model="newUser.name"
          />
        </div>
        <div class="col-sm-4 row">
          <label>LastName</label>
          <input
            type="text"
            class="form-control"
            placeholder="LastName"
            v-model="newUser.lastname"
          />
        </div>
        <div class="col-sm-4 row">
          <label>UserName</label>
          <input
            type="text"
            class="form-control"
            placeholder="UserName"
            v-model="newUser.username"
          />
        </div>
        <div class="col-sm-4 row">
          <label>Password</label>
          <input
            type="password"
            class="form-control"
            placeholder="Password"
            v-model="newUser.password"
          />
        </div>
        <div class="col-sm-4 row">
          <label>Age</label>
          <input
            type="number"
            class="form-control"
            placeholder="Age"
            v-model="newUser.age"
          />
        </div>
        <div class="col-sm-4 row">
          <label>Phone</label>
          <input
            type="number"
            class="form-control"
            placeholder="Phone"
            v-model="newUser.phone"
          />
        </div>
        <div class="col-sm-4 row">
          <label>Addres</label>
          <input
            type="text"
            class="form-control"
            placeholder="Addres"
            v-model="newUser.addres"
          />
        </div>
        <div class="col-sm-4 row">
          <label>Identification</label>
          <input
            type="number"
            class="form-control"
            placeholder="Identification"
            v-model="newUser.identification"
          />
        </div>
        <br />
        <button class="btn btn-success btn-sm" @click="save">Save</button>
      </div>
    </div>
    <h3>View Users</h3>
    <div class="background">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">User Name</th>
            <th scope="col">Password</th>
            <th scope="col">Age</th>
            <th scope="col">Phone</th>
            <th scope="col">Addres</th>
            <th scope="col">Identification</th>
            <th scope="col">Actions</th>
            <th scope="col">Car</th>
          </tr>
        </thead>
        <tbody v-for="(item, index) of user" :key="item.id">
          <tr>
            <td>{{ item.name }}</td>
            <td>{{ item.lastname }}</td>
            <td>{{ item.username }}</td>
            <td>{{ item.password }}</td>
            <td>{{ item.age }}</td>
            <td>{{ item.phone }}</td>
            <td>{{ item.addres }}</td>
            <td>{{ item.identification }}</td>
            <td @click="delet(index)">
              <button class="btn btn-danger btn-sm">X</button>
            </td>
            <td @click="car(index)">
              <button class="btn btn-warning btn-sm">Car</button>
            </td>
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
  head() {
    return {
      title: "Prices",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "",
        },
      ],
      htmlAttrs: {
        lang: "en",
      },
    };
  },
  data() {
    return {
      user: [],
      showModal: false,
      newUser: [
        {
          name: null,
          lastname: null,
          username: null,
          password: null,
          age: null,
          phone: null,
          addres: null,
          identification: null,
        },
      ],
    };
  },
  methods: {
    save() {
      const newUsers = {
        name: this.newUser.name,
        lastname: this.newUser.lastname,
        username: this.newUser.username,
        password: this.newUser.password,
        age: this.newUser.age,
        phone: this.newUser.phone,
        addres: this.newUser.addres,
        identification: this.newUser.identification,
        state: false,
      };
      console.log(newUsers);
      this.crudService.saveUser(newUsers).then((data) => {
        if (data.status === 200) {
          console.log("Guardado Exitoso");
          location.reload();
        }
      });
    },
  },
  async created() {
    this.crudService = new CrudService();
  },
  async mounted() {
    const res = await axios.get("http://localhost:8080/users/list");
    this.user = res.data;
  },
};
</script>

<style scoped>
body {
  margin-top: 20px;
}
.background {
  background: white;
}

.single-pricing {
  background: #fff;
  padding: 40px 20px;
  border-radius: 30px;
  position: relative;
  z-index: 2;
  border: 1px solid #eee;
  box-shadow: 0 10px 40px -10px rgba(0, 64, 128, 0.09);
  transition: 0.3s;
}
@media only screen and (max-width: 480px) {
  .single-pricing {
    margin-bottom: 30px;
  }
}
.single-pricing:hover {
  box-shadow: 0px 60px 60px rgba(0, 0, 0, 0.1);
  z-index: 100;
  transform: translate(0, -10px);
}
.price-label {
  color: #fff;
  background: #ffaa17;
  font-size: 16px;
  width: 100px;
  margin-bottom: 15px;
  display: block;
  -webkit-clip-path: polygon(
    100% 0%,
    90% 50%,
    100% 100%,
    0% 100%,
    0 50%,
    0% 0%
  );
  clip-path: polygon(100% 0%, 90% 50%, 100% 100%, 0% 100%, 0 50%, 0% 0%);
  margin-left: -20px;
  position: absolute;
}
.price-head h2 {
  font-weight: 600;
  margin-bottom: 0px;
  text-transform: capitalize;
  font-size: 26px;
}
.price-head span {
  display: inline-block;
  background: #ffaa17;
  width: 6px;
  height: 6px;
  border-radius: 30px;
  margin-bottom: 20px;
  margin-top: 15px;
}
.price {
  font-weight: 500;
  font-size: 50px;
  margin-bottom: 0px;
}
.single-pricing h5 {
  font-size: 14px;
  margin-bottom: 0px;
  text-transform: uppercase;
}
.single-pricing ul {
  list-style: none;
  margin-bottom: 20px;
  margin-top: 30px;
}

.single-pricing ul li {
  line-height: 35px;
}
.single-pricing a {
  background: none;
  border: 2px solid #ffaa17;
  border-radius: 5000px;
  color: #ffaa17;
  display: inline-block;
  font-size: 16px;
  overflow: hidden;
  padding: 10px 45px;
  text-transform: capitalize;
  transition: all 0.3s ease 0s;
}
.single-pricing a:hover,
.single-pricing a:focus {
  background: #ffaa17;
  color: #fff;
  border: 2px solid #ffaa17;
}
.single-pricing-white {
  background: #232434;
}
.single-pricing-white ul li {
  color: #fff;
}
.single-pricing-white h2 {
  color: #fff;
}
.single-pricing-white h1 {
  color: #fff;
}
.single-pricing-white h5 {
  color: #fff;
}
</style>
