function gerarMeme(formJS)  {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = document.getElementById(formJS.choice.value);
    canvas.width = 300;
    // set height proportional to destination image
    canvas.height = canvas.width * (img.height / img.width);
    // step 1 - resize to 75%
    const oc = document.createElement('canvas');
    const octx = oc.getContext('2d');
    // Set the width & height to 75% of image
    oc.width = img.width;
    oc.height = img.height;
    // step 2, resize to temporary size
    octx.drawImage(img, 0, 0, oc.width, oc.height);
    // step 3, resize to final size
    ctx.drawImage(oc, 0, 0, oc.width, oc.height, 0, 0, canvas.width, canvas.height);
    var text2 = formJS.nome.value.toUpperCase();
    ctx.save();
    ctx.fillStyle = formJS.cor.value;
    ctx.font = '30px Arial Black';
    ctx.fillText(text2, canvas.width/20, canvas.height-10);
    if(formJS.borda.checked){
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.lineJoin="round";
        ctx.miterLimit=2;
        ctx.strokeText(text2, canvas.width/20, canvas.height-10);
        ctx.stroke();
    }
    //alert(formJS.borda.checked);
    ctx.fill();
    ctx.restore();
    const resultado = document.getElementById('resultado');
    const h2 = document.getElementById('h2');
    h2.appendChild(document.createTextNode("Resultado"));
    resultado.appendChild(canvas);
}