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

export function obtenerFechas() {
  // Obtener la fecha actual
  const fechaActual = new Date();

  // Crear nuevas fechas para los dos meses anteriores
  const fechaHaceUnMes = new Date(fechaActual);
  const fechaHaceDosMeses = new Date(fechaActual);

  // Restar un mes a la fecha actual
  fechaHaceUnMes.setMonth(fechaHaceUnMes.getMonth() - 1);

  // Restar dos meses a la fecha actual
  fechaHaceDosMeses.setMonth(fechaHaceDosMeses.getMonth() - 2);

  // Formatear las fechas como strings en formato yyyy-mm
  const fechaActualStr = `${fechaActual.getFullYear()}-${(
    fechaActual.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}`;
  const fechaHaceUnMesStr = `${fechaHaceUnMes.getFullYear()}-${(
    fechaHaceUnMes.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}`;
  const fechaHaceDosMesesStr = `${fechaHaceDosMeses.getFullYear()}-${(
    fechaHaceDosMeses.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}`;

  return {
    fecha3: fechaActualStr,
    fecha2: fechaHaceUnMesStr,
    fecha1: fechaHaceDosMesesStr,
  };
}

export function formatoFechaYearMonth(fecha) {
  // Obtener los componentes de la fecha
  var año = fecha.getFullYear();
  var mes = ("0" + (fecha.getMonth() + 1)).slice(-2); // El mes va de 0 a 11

  // Construir la cadena con el formato deseado
  var fechaFormateada = año + "-" + mes;

  // Retornar la fecha formateada
  return fechaFormateada;
}

export function formatearFechaMonth(fecha) {
  // Descomponer el string de fecha en año y mes
  const [year, month] = fecha.split("-");

  // Array con los nombres de los meses en español
  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  // Obtener el nombre del mes correspondiente
  const nombreMes = meses[parseInt(month) - 1];

  return `${nombreMes}`;
}

export function diasEntreFechas(fechaInicio, fechaFin) {
  // Crear objetos de fecha
  const date1 = new Date(fechaInicio);
  const date2 = new Date(fechaFin);

  // Calcular la diferencia en milisegundos
  const diferenciaMilisegundos = date2 - date1;

  // Convertir milisegundos a días
  const milisegundosEnUnDia = 1000 * 60 * 60 * 24;
  const diferenciaDias = diferenciaMilisegundos / milisegundosEnUnDia;

  // Redondear hacia abajo para obtener el número de días completos y agregar 1
  return Math.floor(diferenciaDias);
}
