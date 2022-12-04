
// FUNCION PARA REGISTRAR UN INMUEBLE
function Registrar_Inmueble()
{
	var datos={
			"id_inmueble":document.getElementById("id_inmueble").value,
			"direccion":document.getElementById("direccion").value,
			"numero_identificacion":document.getElementById("numero_identificacion").value,
			"id_tarifa":document.getElementById("id_tarifa").value
	}

console.log(datos)

$.ajax({
	type:"post",
	url:"http://localhost:3009/Registrar_Inmueble",
	data:datos,
	dataType:"json",
	success:function(data){
		if (data.save == 1)
		{
			console.log('Inmueble registrado - OK')
			alert('El Inmueble fue registrado Satisfactoriamente')
			location.href='Inmuebles'
		}
		else
		{
			console.log('Error - Inmueble NO almacenado')
			alert('Error - Inmueble NO Almacenado')
		}
	}
})
}

// FUNCION PARA ACTUALIZAR UN INMUEBLE 
function Actualizar_Inmueble(){
	
	var datos={
        "id_inmueble":document.getElementById("id_inmueble").value,
        "direccion":document.getElementById("direccion").value,
		"numero_identificacion":document.getElementById("numero_identificacion").value,
        "id_tarifa":document.getElementById("id_tarifa").value
	}

	console.log(datos)
	$.ajax({
		type:"post",
		url:"http://localhost:3009/updateInmueble",
		data:datos,
		dataType:"json",
		success:function(data){
		if(data.update == 1)
		{
			console.log('Inmueble Actualizado')
			alert('Inmueble Actualizado')
			location.href='Inmueble'
		}
		else
		{
			console.log('Inmueble NO Actualizado')
			alert('Inmueble NO Actualizado')
		}
	}
})
}

// FUNCION PARA CONSULTAR UN INMUEBLE
function Consultainmueble ()
{
var datos = {
	
	"id_inmueble" : document.getElementById("id_inmueble").value,
}
console.log(datos)

$.ajax({
        type: "post",
        url: "http://localhost:3009/Consultar_inmuebles",
        data : datos,
        dataType: "json",
        success: function (data) {
           
			if (data.result.length > 0)
           
			{
                let inmuebles = ""
                let cant = 0

                for (i = 0; i < data.result.length; i++)
                {

                    $('#gm').remove();
                }
                for (i = 0; i < data.result.length; i++)
                {
                    cant = cant + 1
                    inmuebles = cant +' '+'direccion:'+' '+data.result[i].direccion+' '+data.result[i].numero_identificacion+' '+data.result[i].numero_identificacion+' '+data.result[i].id_tarifa+' '+data.result[i].id_tarifa+'\n'
                    $('#inmuebles').append('<p id="gm">'+inmuebles+'</p>')

					 //con este código se agregan los datos de la base de datos en los campos de la tabla inmuebles

                     document.getElementById("id_inmueble").value = data.result[i].id_inmueble
                     document.getElementById("direccion").value = data.result[i].direccion
                     document.getElementById("numero_identificacion").value = data.result[i].numero_identificacion
                     document.getElementById("id_tarifa").value = data.result[i].id_tarifa

                }
            }
            else
            {
                console.log("No existe en DB")
                alert ('El inmueble no existe');
            }
        }
});
}
