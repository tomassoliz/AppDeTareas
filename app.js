const listarTareas = require("./app-tareas/funcionesDeTarea");
const argv = require("process").argv;
const accion = argv[2];
let respuesta;

switch (accion) {
  case "listar":
    console.log(
      `
      ************** LISTA DE TAREAS *************
      `
    );
    listarTareas.listar();
    break;

  case "agregar":
    if ([argv[3]].includes(undefined)) {
      console.log(listarTareas.mensajeError("Debes indicar el titulo que desees agregar"));
      break;
    }
    respuesta = listarTareas.agregar(argv[3])
    console.log(respuesta);
    break;

  case "eliminar":
    console.log(listarTareas.eliminar(argv[3]));
    break;

  case "editar":
    if ([argv[3], argv[4]].includes(undefined)) {
      console.log(listarTareas.mensajeError("Debes indicar el titulo y el estado que deseas editar"));
      break;
    }
    respuesta = listarTareas.editar(argv[3], argv[4])
    console.log(respuesta);
    break;

  case "filtrar":
    console.log(
    `
    ************** LISTAS FILTRADAS *************
    `
    );
    const estados = ['pendiente', 'en proceso', 'terminado']
    if (!argv[3]) {
      console.log(listarTareas.mensajeError("Debes indicar el titulo y el estado que deseas filtrar"));
      break;
    }
    if (!estados.includes(argv[3].toLowerCase())) {
      console.log(listarTareas.mensajeError("ERROR: El estado debe ser uno de los siguientes pendiente | en proceso | terminado"));
      break;
    }
    listarTareas.filtrar(argv[3].toLowerCase())
    break;

  case undefined:
    console.log("Debes indicar una acción".red);
    break;
  default:
    console.log("Accion incorrecta, intenta con listar, agregar, filtrar, editar o eliminar".red);
    break;
}