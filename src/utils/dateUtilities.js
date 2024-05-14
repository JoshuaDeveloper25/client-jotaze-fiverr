export function formatoFecha(fecha) {
  // Obtener los componentes de la fecha
  var año = fecha.getFullYear();
  var mes = ("0" + (fecha.getMonth() + 1)).slice(-2); // El mes va de 0 a 11
  var dia = ("0" + fecha.getDate()).slice(-2);
  var horas = ("0" + fecha.getHours()).slice(-2);
  var minutos = ("0" + fecha.getMinutes()).slice(-2);

  // Construir la cadena con el formato deseado
  var fechaFormateada =
    año + "-" + mes + "-" + dia + " " + horas + ":" + minutos;

  // Retornar la fecha formateada
  return fechaFormateada;
}
