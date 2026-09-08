const barra = document.createElement('fieldset');
barra.id = 'barrainfo';






const botaodoaparecimento = document.getElementById('invocardragao');

botaodoaparecimento.addEventListener('click', function () {
    document.body.appendChild(barra);
    barra.innerHTML = '<h2>Objetivo 1</h2> <hr> <br> <p>Nosso objetivo 1 e o principal, porque tem coisas importantes a se compuprir, como:<p> <br> <ul><li>Cumprir a meta fienceira<br><br><li>Bater a meta de colaboradores<ul><ul><br><li>E tambem agredecer os parceiros<br><br><p>Esses sao os nossos maiores objetivos, como nos proximos.'
    

})


