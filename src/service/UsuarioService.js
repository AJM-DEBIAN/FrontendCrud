import axios from 'axios';

export class UsuarioService{
     urlBase="http://localhost:8080/controller/usuario/v1/"
  
  
     getAll(){
        return  axios.get(this.urlBase+'all').then(response=> response.data)
            
    }

    guardarActualizar(usuario){
        return  axios.post(this.urlBase+'guardarActualizar', usuario).then(response=> response.data)
            
    }

    eliminar(id){
        return  axios.get(this.urlBase+'borrar/'+id).then(response=> response.data)
            
    }
}