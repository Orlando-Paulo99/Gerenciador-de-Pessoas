
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
            <summary>${element.nome}</summary>
            <p>${element.nascimento}</p>
            <p>${element.endereco}</p>
     
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