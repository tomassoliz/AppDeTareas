const { writeFileSync, readFileSync } = require("fs");
const Tarea = require("./Tarea");
const path = require("path");
require('colors');


const leerJSON = () =>
  JSON.parse(readFileSync(path.join(__dirname, "tareas.json"), "utf-8"));
const escribirJSON = (tareas) =>
  writeFileSync(path.join(__dirname, "tareas.json"),
    JSON.stringify(tareas, null, 3),"utf-8");

module.exports = {
  tareas: leerJSON(),
  listar: function (tareas = this.tareas) {
    tareas.forEach(({ titulo, estado }, index) => {
      let estadoColor =
        estado === 'pendiente'
          ? estado.blue
          : estado === 'en progreso'
          ? estado.yellow
          : estado === 'terminada'
          ? estado.green
          : estado;
      console.log(`${index + 1}-. ${titulo} -----> ${estadoColor}`);
    });
  },
  filtrar: function (estado) {
    const estadoFiltrado = estado.toLowerCase();
    const tareasFiltradas = this.tareas.filter(
      (tarea) => tarea.estado.toLowerCase() === estadoFiltrado
    );
    this.listar(tareasFiltradas);
  },
  agregar: function (titulo) {
    const tareas = this.tareas;
    let tarea = new Tarea(titulo);
    tareas.push(tarea);
    escribirJSON(tareas);
    return `Se agregó "${titulo}" correctamente`;
  },
  eliminar: function (titulo) {
    const tareas = this.tareas;
    const index = tareas.findIndex((tarea) => tarea.titulo === titulo);
    if (index !== -1) {
      tareas.splice(index, 1);
      escribirJSON(tareas);
      return `Se eliminó ${titulo} correctamente`;
    } else {
      return `No se encontró la tarea ${titulo}`;
    }
  },
  editar: function (titulo, nuevoEstado) {
    const tareas = this.tareas;
    const tarea = tareas.find((t) => t.titulo === titulo);
    if (tarea) {
      tarea.estado = nuevoEstado;
      escribirJSON(tareas);
      return `Se editó el estado de ${titulo} a ${nuevoEstado} correctamente`;
    } else {
      return `No se encontró la tarea ${titulo}`;
    }
  },
  filtrar: function (estado) {
    const tareasFiltradas = this.tareas.filter(
      (tarea) => tarea.estado === estado
    );
    this.listar(tareasFiltradas);
  },
  mensajeError: function (mensaje) {
    return `ERROR: ${mensaje}`.red;
  }
};
