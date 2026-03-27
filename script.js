
const supabaseCliente = window.supabase.createClient(
  "https://swvsfqjyzkitnaozgqad.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3dnNmcWp5emtpdG5hb3pncWFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4OTEzNjcsImV4cCI6MjA4OTQ2NzM2N30.WaaigbVjD-2jlZDQb5ue91Y13Nre5Ok6p0KTENy2-4E"
);
let cpf=document.getElementById('cpf')
let nome=document.getElementById('nome')
let dat=document.getElementById('data')
let endereco=document.getElementById('endr')
let b=document.getElementById('b')

let p=document.getElementById("erro")

b.addEventListener("click" , async ()=>{

    if(cpf.value.length !=11){
        alert("digite um cpf correto")
        return
    }
    
    
    const {data,error}= await supabaseCliente
    .from('person')
    .insert([
        {
            cpf:cpf.value,
            nome:nome.value,
            nascimento: dat.value,
            endereco:endereco.value
        }
    ])

    

   
    if (error) {
        if (error.code === '23505') {
            p.innerHTML="CPF já cadastrado"
        } else {
            alert(error.message);
        }
        return;
    }


    p.innerHTML="Cadastro realizado com sucesso"
    console.log(data)

    
    cpf.value=""
    nome.value=""
    dat.value=""
    endereco.value=""

})

fetch('./componentes/menu.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('menu').innerHTML = data;

    let b=document.getElementById("btnMenu")
    let m=document.getElementById("side")

    b.addEventListener("click", () =>{
        console.log("clicou")
        m.classList.toggle("active")

    })

});