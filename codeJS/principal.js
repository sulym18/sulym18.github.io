function gerarMeme(formJS){
    //Limpar qualquer resultado pré-existente
    limparMeme();

    //Criação do elemento que será inserido na página
    const canvas = document.createElement('canvas');
    canvas.setAttribute("id", "canvas");

    //Contexto para desenho em 2 dimensões 
    const ctx = canvas.getContext('2d');

    //Captura da imagem que será utilizada
    const img = document.getElementById(formJS.choice.value);

    //Dimensionamento de largura do canvas para a imagem final
    canvas.width = 300;
    //Dimensionamento de altura do canvas proporcional à imagem escolhida
    canvas.height = canvas.width * (img.height / img.width);
    
    //Criação de um segundo canvas para pré-desenhar a imagem 
    const oc = document.createElement('canvas');
    const octx = oc.getContext('2d');
    //Definiçào do tamanho do segundo canvas para o tamanho da imagem escolhida
    oc.width = img.width;
    oc.height = img.height;
    //Pré-desenho da imagem no segundo canvas para seu tamanho temporário
    octx.drawImage(img, 0, 0, oc.width, oc.height);
    //Desenho final da imagem redimensionada no canvas principal
    ctx.drawImage(oc, 0, 0, oc.width, oc.height, 0, 0, canvas.width, canvas.height);

    //Captura do texto que será utilizado, transformando todos caracteres em letra maiúscula
    var text = formJS.nome.value.toUpperCase();

    //Salvamento de estado do contexto do canvas
    ctx.save();

    //Captura da cor que será utilizada no texto
    ctx.fillStyle = formJS.cor.value;

    //Definição do tamanho e fonte utilizadas para o texto e sua borda
    ctx.font = '30px Arial Black';

    //Desenho do texto começando na posição 1/20 da largura e 10 pixels acima da altura do canvas
    ctx.fillText(text, canvas.width/20, canvas.height-10);

    //Verificação para o uso da borda no texto
    if(formJS.borda.checked){
        //Definição de estilo da borda
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.lineJoin="round";
        ctx.miterLimit=2;

        //Desenho da borda do texto na mesma posição do texto
        ctx.strokeText(text, canvas.width/20, canvas.height-10);
    }
    
    //Restauração de estado do contexto do canvas
    ctx.restore();

    const resultado = document.getElementById('resultado');
    const h2 = document.getElementById('h2');

    if (!h2.firstChild){
        //Inserção do texto 'Resultado' caso ele não esteja presente
        h2.appendChild(document.createTextNode("Resultado"));
    }

    //Inserção do canvas principal
    resultado.appendChild(canvas);
}

function limparMeme(){
    const h2 = document.getElementById('h2');
    const canvas = document.getElementById('canvas');
    
    if(h2.firstChild){
        //Remoção do texto 'Resultado' caso ele já esteja presente
        h2.firstChild.remove();
    }

    //Remoção do canvas caso ele já esteja presente
    if(canvas){
        canvas.remove();
    }
}