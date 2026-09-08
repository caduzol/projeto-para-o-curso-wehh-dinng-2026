const barra = document.createElement('fieldset');
barra.id = 'barrainfo';






const botaodoaparecimento = document.getElementById('invocardragao');

botaodoaparecimento.addEventListener('click', function () {

    
        if (document.body.contains(barra)) {
            barra.remove()
            botaodoaparecimento.textContent = 'Mostrar'
            
        }else{
            document.body.appendChild(barra);
              barra.innerHTML = '<h2>Objetivo 1</h2> <hr> <br> <p>Nosso objetivo 1 e o principal, porque tem coisas importantes a se compuprir, como:<p> <br> <ul><li>Cumprir a meta fienceira<br><br><li>Bater a meta de colaboradores<ul><ul><br><li>E tambem agredecer os parceiros<br><br><p>Esses sao os nossos maiores objetivos, como nos proximos.'
            botaodoaparecimento.textContent = 'Remover'  
        }

})





// Barra 2 do fieldset


const barra2dainfo = document.createElement('fieldset');
barra2dainfo.id = 'barrainfo2';


const botaodoaparecimentooo = document.createElement('button');
botaodoaparecimentooo.id = 'botaodainvocacaaos';

botaodoaparecimentooo.innerHTML = 'Aparecer';

document.body.appendChild(botaodoaparecimentooo);




botaodoaparecimentooo.addEventListener('click', function () {
    
        if (document.body.contains(barra2dainfo)) {
            barra2dainfo.remove()
            botaodoaparecimentooo.textContent = 'Mostrar info 2';
        } else{
            document.body.appendChild(barra2dainfo);
            barra2dainfo.innerHTML = '<h2>Objetivo 2 </h2><hr> <br> <p>Nosso segundo objetivo e conseguir mais colaboradores e conseguir fazer um exelente serviço com a saude mental dos nossos clientes. <br><br> <p>Nos queremos mais sucesso no mercado e um reconhecimento do governo do estado de sao joao'
            botaodoaparecimentooo.textContent = 'Remover';
        }

})






// barra 3 



const barratrimedimencional = document.createElement('fieldset');

const botaopromaxxx = document.createElement('button');


botaopromaxxx.addEventListener('click', function () {
        if (document.body.contains(barratrimedimencional)) {
            barratrimedimencional.remove()
            botaopromaxxx.textContent = 'mostrar informaçao'
        }   else{
            document.appendChild(barratrimedimencional);
            barratrimedimencional.innerHTML = '<h2> obejetivo</h2> <hr> <br><br> <p>'
        }
    
})






































































