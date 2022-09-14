import React, {Component } from 'react';
import './App.css';
import {UsuarioService} from './service/UsuarioService';


export default class App extends Component{
  constructor(){
    super();
    this.state={
      usuarios:[],
      usuario:{
        idUsuario:null,
        nombre:"",
        apellido:"",
        correo:""
      },
      nombre:"",
      apellido:"",
      correo:""

    };

    this.usuarioService = new UsuarioService();
    this.guardar = this.guardar.bind(this);
    this.eliminar = this.eliminar.bind(this);
    this.actualizar = this.actualizar.bind(this);
  }

  //metodo que se ejecuta al termianr de renderizar
  componentDidMount(){
      this.getAll();
  }

  getAll(){
    this.usuarioService.getAll().then(data => {
      console.log(data);
      this.setState({usuarios:data});
    })
  }

  guardar(){

    var usuario={
      idUsuario:null,
      nombre:"",
      apellido:"",
      correo:""
    }

    if(this.state.usuario!=null){
        if(this.state.usuario.idUsuario!=null){
          usuario.idUsuario=this.state.usuario.idUsuario;
        }
    }
    
    if(this.state.nombre!==""){
        usuario.nombre=this.state.nombre;
        if(this.state.apellido!==""){
          usuario.apellido=this.state.apellido;
          if(this.state.correo!==""){
            usuario.correo=this.state.correo;
            this.usuarioService.guardarActualizar(usuario).then(data =>{
              this.getAll();
              this.limpiarCampos();
              this.setState({usuario:null});
            })
          }else{
            console.log("Ingresa correo")
          }
        }else{
          console.log("Ingresa apellido")
        }

    }else{
      console.log("Ingresa nombre")
    }
     
      console.log("clic en guardar");
  }

  limpiarCampos(){
              this.setState({nombre:""});
              this.setState({apellido:""});
              this.setState({correo:""});
  }

  

  eliminar(id){
    console.log("elimianr" + id);
    this.usuarioService.eliminar(id).then(data => {
      console.log(data);
      this.getAll();
    })
  }

  actualizar(usu){
    this.setState({nombre:usu.nombre});
    this.setState({apellido:usu.apellido});
    this.setState({correo:usu.correo});
    this.setState({usuario:usu});
    
  }

  render(){
    return(
      <div>
      <h1>Lista de usuarios</h1>
      <label>
        Agregar Usuario
      </label>
      <div id="agregar">
        <form>
          <div>
            <label>Nombre:</label>
          <input name='nombre' type="text" className='text' value={this.state.nombre} onChange={(e)=> this.setState({nombre:e.target.value})}></input>
          </div>
          <div>
          <label>Apellidos:</label>
          <input name='nombre' type="text" value={this.state.apellido} onChange={(e)=> this.setState({apellido:e.target.value})}></input>
          </div>
     <div>
      <label>Correo:</label>
      <input name='apellido' type="text" value={this.state.correo} onChange={(e)=> this.setState({correo:e.target.value})}></input>
     </div>
     <div>
      <button type="button" name='guardar' onClick={this.guardar}>GUARDAR</button>
      </div>
      </form>
      </div>
      <table>
        <thead>
          <tr>
            <td>
              NOMBRE
            </td>
            <td>
              APELLIDOS
            </td>
            <td>
              CORREO
            </td>
          </tr>
        </thead>
        <tbody>
        {
           this.state.usuarios.map((usu, i) =>{
              return  <tr key={i}>
                   <td>
              {usu.nombre}
            </td>
            <td>
            {usu.apellido}
            </td>
            <td>
            {usu.correo}
            </td>
            <td>
            <button type="button" name='guardar' onClick={(e) => this.eliminar(usu.idUsuario, e)}>ELIMINAR</button>
            </td>
            <td>
            <button type="button" name='guardar' onClick={(e) => this.actualizar(usu, e)}>ACTUALIZAR</button>
            </td>
                </tr>
            })
        }
        </tbody>
      </table>
      </div>
    );
  }

}