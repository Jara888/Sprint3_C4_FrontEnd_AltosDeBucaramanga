/*const username = document.getElementById('username')
const password = document.getElementById('password')
const button = document.getElementById('button')

button.addEventListener('click', (e) => {
    e.preventDefault()
    const data = {
        username: username.value,
        password: password.value
    }

    console.log(data)
})  

*/

function Ingresar(){

//alert('funcion Ingresar con login')   //el username es el de la base de datos .
let datos={'user':document.getElementById('username').value,
'password':document.getElementById('Password').value}
console.log(datos)

$.ajax({
    type:'post',
    url:'http://localhost:3009/login',
    data:datos,
    datatype:'json',
    success:function(data){
        console.log(data)
        if(data.existe==1){
            location.href='/home'

        }
        else
        {
            alert('Usuario No Existe')
            console.log('Credenciales Incorrectas')


        }


    }




})

}



