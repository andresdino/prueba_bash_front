import axios from 'axios';

export default class CrudService {
  url = "http://localhost:8080/products";
  url2 = "http://localhost:8080/users";
  url3 = "http://localhost:8080/car";

   async getAll(){
     return await axios.get(this.url+"/list")
  }

   save(persona) {
    return  axios.post(this.url+"/save", persona)
  }

  delet(id){
    return axios.delete(this.url+"/"+id)
  }

  saveUser(user){
    return axios.post(this.url2+"/save",user)
  }

  saveToCar(productToCar){
    return axios.post(this.url3+"/save",productToCar)
  }

  listById(idUser){
    return axios.get(this.url3+"/listByUser/"+idUser)
  }

  listByIdProduct(idProduct){
    return axios.get(this.url+"/listBy/"+idProduct)
  }
}
