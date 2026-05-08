//const { documentElement } = require("jquery/src/var/documentElement.js");

const supabaseCliente = window.supabase.createClient(
  "https://swvsfqjyzkitnaozgqad.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3dnNmcWp5emtpdG5hb3pncWFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4OTEzNjcsImV4cCI6MjA4OTQ2NzM2N30.WaaigbVjD-2jlZDQb5ue91Y13Nre5Ok6p0KTENy2-4E"
);


fetch('./componentes/menu.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('menu').innerHTML = data;

    let bt=document.getElementById("btnMenu")
    let m=document.getElementById("side")

  

});


async function allPerson(todos) {
    const {data,error}= await supabaseCliente
    .from('person')
    .select('*')
    
    console.log(data);
    if(error){
        console.log(error)
        return
    }

    todos.innerHTML=""
     data.forEach(element => {
        todos.innerHTML+=
        `
        <details>
            <summary>CPF: ${element.cpf} </summary>
            <p>Nome: ${element.nome}</p>
            <p>Data de Nascimento: ${element.nascimento}</p>
            <p>Endereço: ${element.endereco}</p>
     
        </details>
    `;
        
    });

   
}

document.addEventListener("DOMContentLoaded", () => {
    const lista = document.getElementById("lista");

    if (lista) {
        allPerson(lista);
    }
});


/*** Pesquisar CPF */
const p_Cpf = document.getElementById("procurar")
const lista = document.getElementById("lista")

p_Cpf.addEventListener("input", async () => {

    const valor = p_Cpf.value

    
    if (valor.length === 0) {
        lista.innerHTML = "" 
        return
    }

    const { data, error } = await supabaseCliente
        .from("person")
        .select("*")
        .ilike("cpf", `%${valor}%`)

    if (error) {
        console.error(error)
        return
    }

  
    lista.innerHTML = ""

    if (data.length === 0) {
        lista.innerHTML = "<p>Nenhum resultado encontrado</p>"
        return
    }


    data.forEach(pessoa => {
        const div = document.createElement("div")
        div.innerHTML = 
        
         `
        <details>
            <summary>CPF: ${pessoa.cpf} </summary>
            <p>Nome: ${pessoa.nome}</p>
            <p>Data de Nascimento: ${pessoa.nascimento}</p>
            <p>Endereço: ${pessoa.endereco}</p>
     
        </details>
    `
        lista.appendChild(div)
    })

})


/*** Editar usuarios */

$(document).ready(function(){

    $("#abrir").click(function(){
        $(" #popoup").fadeIn();
    })

    $("#fechar").click(function(){
        $(" #popoup").fadeOut();
    })
        
})

const b_atualizar = document.getElementById("b_atualizar");

$(document).ready(function(){

  $(b_atualizar).click(async function(){

      const n_nome = $("#newNome").val();
      const n_nascimento = $("#newNaci").val();
      const n_endereco = $("#newEndereco").val();
      const n_cpf = $("#cpf").val();

      // verifica se CPF existe
      const { data: pessoa } = await supabaseCliente
        .from("person")
        .select("cpf")
        .eq("cpf", n_cpf)
        .maybeSingle();

      if(!pessoa){
         alert("CPF não encontrado");
         return;
      }

      // atualiza
      const { data, error } = await supabaseCliente
        .from("person")
        .update({
          nome: n_nome,
          nascimento: n_nascimento,
          endereco: n_endereco
        })
        .eq("cpf", n_cpf)
        .select();

      if(error){
         console.log(error);
         return;
      }

      alert("Usuário atualizado com sucesso!");
      $("#cpf").val("")
      $("#newNome").val("")
      $("#newNaci").val("")
      $("#newEndereco").val("")

  });

});