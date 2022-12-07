
// FUNCION PARA REGISTRAR UN INMUEBLE
function Registrar_Inmueble() {
	var datos = {
		"Id_inmueble": document.getElementById("Id_inmueble").value,
		"Direccion": document.getElementById("Direccion").value,
		"Numero_Identificacion": document.getElementById("Numero_Identificacion").value,
	}
	$.ajax({
		type: "post",
		url: "http://localhost:3009/Insertar_Inmueble",
		data: datos,
		dataType: "json",
		success: function (data) {
			if (data.save == 1) {
				alert('El Inmueble fue registrado Satisfactoriamente')
				location.href = 'Home'
			}
			else {
				alert('Error - Inmueble NO Almacenado')
			}
		}
	})
}

// FUNCION PARA ACTUALIZAR UN INMUEBLE 
function Actualizar_Inmueble() {
	var datos = {
		"Id_inmueble": document.getElementById("Id_inmueble").value,
		"Direccion": document.getElementById("Direccion").value,
		"Numero_Identificacion": document.getElementById("Numero_Identificacion").value
	}
	$.ajax({
		type: "post",
		url: "http://localhost:3009/updateInmueble",
		data: datos,
		dataType: "json",
		success: function (data) {
			if (data.save == 1) {
				alert('Inmueble Actualizado')
				location.href = 'Inmuebless'
			}
			else {
				alert('Inmueble NO Actualizado')
			}
		}
	})
}

// FUNCION PARA CONSULTAR UN INMUEBLE
function mostrarInmuebles() {
	var datos = {
		"Id_inmueble": document.getElementById("Id_inmueble").value,
	}
	$.ajax({
		type: "post",
		url: "http://localhost:3009/mostrarInmuebles",
		data: datos,
		dataType: "json",
		success: function (data) {
			if (data.result.length > 0) {
				let inmuebles = ""
				let cant = 0
				for (i = 0; i < data.result.length; i++) {
					$('#gm').remove();
				}
				for (i = 0; i < data.result.length; i++) {
					cant = cant + 1
					inmuebles = cant + ' ' + 'direccion:' + ' ' + data.result[i].direccion + ' ' + data.result[i].numero_identificacion + ' ' + data.result[i].numero_identificacion + ' ' + data.result[i].id_tarifa + ' ' + data.result[i].id_tarifa + '\n'
					$('#inmuebles').append('<p id="gm">' + inmuebles + '</p>')
					document.getElementById("Id_inmueble").value = data.result[i].Id_inmueble
					document.getElementById("Direccion").value = data.result[i].Direccion
					document.getElementById("Numero_Identificacion").value = data.result[i].Numero_Identificacion
				}
			}
			else {
				alert('El inmueble no existe');
			}
		}
	});
}
