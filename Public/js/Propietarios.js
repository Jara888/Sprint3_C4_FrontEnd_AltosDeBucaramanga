//// FUNCION PARA GUARDAR UN NUEVO PROPIETARIO

function Registrar(){

alert('Hola desde la funcion Registrar')

/* debemos tener en cuenta los nombres que se configuraron en la Api_C4_G36 se deben escribir tal cual 
y están en el index.js en la primera parte del js y el segundo como se configuró en el archivo Registrar,ejs */

var datos={

'Primer_Nombre':document.getElementById('primer_Nombre').value,
'Segundo_Nombre':document.getElementById('segundo_Nombre').value,
'Primer_Apellido':document.getElementById('primer_Apellido').value,	
'Segundo_Apellido':document.getElementById('segundo_Apellido').value,
'Correo':document.getElementById('correo').value,
'Telefono':document.getElementById('telefono').value,
'Direccion_De_Contacto':document.getElementById('direccion_De_Contacto').value,	
'Documento_De_Identidad':document.getElementById('documento_De_Identidad').value
}
console.log(datos)

$.ajax({
type:"post",
url:"http://localhost:3009/Insertar_Propietario",
data:datos,
datatype:"json",
success:function(data){
if (data.save==1)

{

	alert('usuario almacenado correctamente')
	console.log('usuario almacenado correctamente')
	location.href='/homeowner'
}

else
{
	alert('error al almacenar datos')
	console.log('error al almacenar datos')

}


}


})
}


// // FUNCION PARA MOSTRAR UN PROPIETARIO


function UserById(){

	var datos={

		"Documento_De_Identidad":document.getElementById("documento_De_Identidad").value,


	}
	
console.log(datos)

$.ajax({
	type:"post",
	url:"http://localhost:3009/ShowPropietarios",
	data:datos,
	dataType:"json",
	success:function(data){
	
			if(data.result.length>0)
            { 

            	let user=""
                let cant=0

            	for(i=0;i<data.result.length;i++)
                {

                     $('#gm').remove();

                }

                for (i=0;i<data.result.length;i++)
                {
                    cant=cant+1         
                    user= cant+' '+data.result[i].Primer_Nombre+' '+data.result[i].Segundo_Nombre+' '+ data.result[i].Primer_Apellido+' '+data.result[i].Segundo_Apellido+' '+data.result[i].Correo+' '+data.result[i].Telefono+' '+data.result[i].Direccion_De_Contacto+' '+data.result[i].Documento_De_Identidad+'\n'
                    
                     //$('#user').append('<p id="gm">'+user+'</p>') //esta etiqueta se usa para mostrar por por medio de etiqueta

                      //con este código de más abajo se agregan los datos de la base de datos en los campos de la tabla propietarios

                     document.getElementById("primer_Nombre").value = data.result[i].Primer_Nombre
                     document.getElementById("segundo_Nombre").value = data.result[i].Segundo_Nombre
                     document.getElementById("primer_Apellido").value = data.result[i].Primer_Apellido
                     document.getElementById("segundo_Apellido").value = data.result[i].Segundo_Apellido
                     document.getElementById("correo").value = data.result[i].Correo
                     document.getElementById("telefono").value = data.result[i].Telefono
                     document.getElementById("direccion_De_Contacto").value = data.result[i].Direccion_De_Contacto
                     document.getElementById("documento_De_Identidad").value = data.result[i].Documento_De_Identidad






                }
            
                     
           console.log("todo hasta aqui")
 
            }
            else
            {console.log('No hay registros de usuario')

                alert('No hay registros de usuario')
            }


	}

})

}


// FUNCION PARA ELIMINAR UN PROPIETARIO


function Eliminar(){

    var datos={
        "Documento_De_Identidad":document.getElementById("documento_De_Identidad").value,     
    }

    console.log(datos)
$.ajax({
    type:"post",
    url:"http://localhost:3009/DeletePropietario",
    data:datos,
    dataType:"json",
    success:function(data){
        if(data.eliminado==1)
        {
            console.log('Usuario Eliminado Satisfactoriamente')
            alert('Usuario Eliminado Satisfactoriamente')
            location.href='/homeowner'

        }
        else
        {
            console.log('Error')
            alert('Error - Usuario No Eliminado')

        }


    }

})

}


// FUNCION PARA ACTUALIZAR UN PROPIETARIO
function Actualizar(){

    var datos={
        "Primer_Nombre":document.getElementById("primer_Nombre").value,
        "Segundo_Nombre":document.getElementById("segundo_Nombre").value,
        "Primer_Apellido":document.getElementById("primer_Apellido").value,
        "Segundo_Apellido":document.getElementById("segundo_Apellido").value,
        "Correo":document.getElementById("correo").value,
        "Telefono":document.getElementById("telefono").value,
        "Direccion_De_Contacto":document.getElementById("direccion_De_Contacto").value,
        "Documento_De_Identidad":document.getElementById("documento_De_Identidad").value



    }
    console.log(datos)
    $.ajax({
        type:"post",
        url:"http://localhost:3009/updatePropietario",
        data:datos,
        dataType:"json",
        success:function(data){
            if(data.save==1)
            {   
                console.log('Usuario Actualizado Satisfactoriamente')
                alert('Usuario Actualizado Satisfactoriamente')
                location.href='/homeowner'

            }
            else
            {
                console.log('Error')
                alert('Error - Usuario No Actualizado Registrado')

            }


        }

    })
}