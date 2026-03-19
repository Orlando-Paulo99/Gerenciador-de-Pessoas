
const supabaseCliente = window.supabase.createClient(
  "https://swvsfqjyzkitnaozgqad.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3dnNmcWp5emtpdG5hb3pncWFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4OTEzNjcsImV4cCI6MjA4OTQ2NzM2N30.WaaigbVjD-2jlZDQb5ue91Y13Nre5Ok6p0KTENy2-4E"
);
let cpf=document.getElementById('cpf')
let nome=document.getElementById('nome')
let dat=document.getElementById('data')
let endereco=document.getElementById('endr')
let b=document.getElementById('b')

b.addEventListener("click" , async ()=>{
    
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

    if(error){
        alert(error)
    }
    alert("sucesso")
    console.log(data)
})