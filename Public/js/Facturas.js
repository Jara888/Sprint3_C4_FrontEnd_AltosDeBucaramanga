//FACTURA
const formDetalle = document.getElementById("formDetalle");
const formCabeceraFactura = document.getElementById("formCabeceraFactura");
const cantidadCuotas = document.getElementById("cantidadCuotas");
const selectObservaciones = document.getElementById("selectObservaciones");
const saldo = document.getElementById("saldo");
const valTotal = document.getElementById("valTotal");
const cuerpoTabla = document.getElementById("cuerpoTabla");
const btnGuardar = document.getElementById("btnGuardar");
const id_factura = document.getElementById("id_factura");
const id_inmueble = document.getElementById("id_inmueble");
const direccion = document.getElementById("direccion");
const fechaGeneracion = document.getElementById("fechaGeneracion");
const numero_identificacion = document.getElementById("numero_identificacion");
const nomPropietario = document.getElementById("nomPropietario");

let facturas = [];
let arregloDetalleFact = [];
let arregloDescripcion = [
	{ id: 1, nombre: "Cuota de Administracion" },
	{ id: 2, nombre: "Anticipo" },
	{ id: 3, nombre: "Cuota Extraordinaria" },
];

const llenarDescripcion = () => {
	arregloDescripcion.forEach((p) => {
		const option = document.createElement("option");
		option.value = p.id;
		option.innerHTML = p.nombre;
		selectObservaciones.appendChild(option);
	});
};
llenarDescripcion();

const getDescripcionById = (id) => {
	const objDescripcion = arregloDescripcion.find((p) => {
		if (p.id === +id) {
			return p;
		}
	});
	return objDescripcion.nombre;
};

const agregaTabla = () => {
	cuerpoTabla.innerHTML = "";
	arregloDetalleFact.forEach((detalle) => {
		let fila = document.createElement("tr")
		fila.innerHTML = `	<td>${detalle.cantidadCuotas}</td>
							<td>${getDescripcionById(detalle.selectObservaciones)}</td>
							<td>${detalle.saldo}</td>
							<td>${detalle.valTotal}</td>`;
		let tdEliminar = document.createElement("td");
		let btnELiminar = document.createElement("button");
		btnELiminar.classList.add("btn", "btn-danger");
		btnELiminar.innerText = "Eliminar";
		btnELiminar.onclick = () => {
			eliminarDetalleById()
		};

		tdEliminar.appendChild(btnELiminar);
		fila.appendChild(tdEliminar);
		cuerpoTabla.appendChild(fila);
	});
};

formDetalle.onsubmit = (e) => {
	e.preventDefault();

	// SE CREA UN OBJETO DEL DETALLE DE FACTURA
	const objDetalleFact = {
		cantidadCuotas: cantidadCuotas.value,
		selectObservaciones: selectObservaciones.value,
		saldo: saldo.value,
		valTotal: valTotal.value,
	};
	console.log(objDetalleFact);
	arregloDetalleFact.push(objDetalleFact);
	agregaTabla();
};

btnGuardar.onclick = () => {
	//CREAR OBJETO CABECERA DE FACTURA
	let objFactura = {
		id_factura: id_factura.value,
		id_inmueble: id_inmueble.value,
		direccion: direccion.value,
		fechaGeneracion: fechaGeneracion.value,
		numero_identificacion: numero_identificacion.value,
		nomPropietario: nomPropietario.value,
		detalle: arregloDetalleFact,
	};
	facturas.push(objFactura);
	// LIMPIAR CAMPOS
	formCabeceraFactura.reset();
	formDetalle.reset();

	// GUARDAR EN DB
	localStorage.setItem("facturas", JSON.stringify(facturas));

	// BORRAR O LIMPIAR LA TABLA DEL TBODY
	arregloDetalleFact = [];
	agregaTabla();
};

// OJO MODIFICAR******************
// FUNCION PARA GUARDAR FACTURA
function guardarFactura() {
	var datos = {
		'id_inmueble': document.getElementById('id_inmueble').value,
		'direccion': document.getElementById('direccion').value,
		'fechaGeneracion': document.getElementById('fechaGeneracion').value,
		'numero_identificacion': document.getElementById('numero_identificacion').value,
		'pNombre': document.getElementById('pNombre').value,
		'sNombre': document.getElementById('sNombre').value,
		'pApellido': document.getElementById('pApellido').value,
		'sApellido': document.getElementById('sApellido').value,
		'cantidadCuotas': document.getElementById('cantidadCuotas').value,
		'selectObservaciones': document.getElementById('selectObservaciones').value,
		'valTotal': document.getElementById('valTotal').value
	}
	$.ajax({
		type: "post",
		url: "http://localhost:3009/guardarFactura",
		data: datos,
		datatype: "json",
		success: function (data) {
			if (data.save == 1) {
				alert('FACTURA almacenada correctamente')
				location.href = '/Facturass'
			}
			else {
				alert('error al almacenar datos')
			}
		}
	})
}

// FUNCION CARGAR DATOS DE DIRECCION INMUEBLE EN FACTURA CON ID INMUEBLE
function mostrarPredioFactura() {
	var datos = {
		"Id_inmueble": document.getElementById("Id_inmueble").value,
	}
	$.ajax({
		type: "post",
		url: "http://localhost:3009/mostrarPredioFactura",
		data: datos,
		dataType: "json",
		success: function (data) {
			if (data.result.length > 0) {
				let Id_inmueble = ""
				let cant = 0
				for (i = 0; i < data.result.length; i++) {
					$('#gm').remove();
				}
				for (i = 0; i < data.result.length; i++) {
					cant = cant + 1
					Id_inmueble = cant + ' ' + data.result[i].direccion + '\n'
					document.getElementById("Id_inmueble").value = data.result[i].Id_inmueble
					document.getElementById("direccion").value = data.result[i].direccion
				}
			}
			else {
				alert('NO EXISTE este ID INMUEBLE en la base de datos')
			}
		}
	})
}

// FUNCION CARGAR DATOS DEL PROPIETARIO EN FACTURA CON ID PROPIETARIO
function mostrarPropietarioFactura() {
	var datos = {
		"Documento_De_Identidad": document.getElementById("Documento_De_Identidad").value,
	}
	$.ajax({
		type: "post",
		url: "http://localhost:3009/mostrarPropietarioFactura",
		data: datos,
		dataType: "json",
		success: function (data) {
			if (data.result.length > 0) {
				let Documento_De_Identidad = ""
				let cant = 0
				for (i = 0; i < data.result.length; i++) {
					$('#gm').remove();
				}
				for (i = 0; i < data.result.length; i++) {
					cant = cant + 1
					Documento_De_Identidad = cant + ' ' + data.result[i].Primer_Nombre + ' ' + data.result[i].Segundo_Nombre + ' ' + data.result[i].Primer_Apellido + ' ' + data.result[i].Segundo_Apellido + '\n'
					document.getElementById("Documento_De_Identidad").value = data.result[i].Primer_Nombre
					document.getElementById("primer_Nombre").value = data.result[i].Primer_Nombre
					document.getElementById("segundo_Nombre").value = data.result[i].Segundo_Nombre
					document.getElementById("primer_Apellido").value = data.result[i].Primer_Apellido
					document.getElementById("segundo_Apellido").value = data.result[i].Segundo_Apellido
				}
			}
			else {
				alert('NO EXISTE este PROPIETARIO en la base de datos')
			}
		}
	})
}