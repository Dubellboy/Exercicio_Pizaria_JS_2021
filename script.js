const c = (el)=> document.querySelector(el);
const cs = (el)=>document.querySelectorAll(el);


pizzaJson.map((item,index)=>{//Mapear o Json com as informações da pizza
    
    let pizzaItem = c('.models .pizza-item').cloneNode(true);//clonar o modelo dos itens

    //Colocar um index para ao selecionar uma pizza ele mostrar as informações
    pizzaItem.setAttribute('data-key', index);

    /*******************************Adicionar informações da pizza na tela***************************/

    /*Pegar o valor na Json de pizza.js de acordo com cada item*/
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizzaItem.querySelector('a').addEventListener('click', (e)=>{
        e.preventDefault();//Ao clicar na pizza não atualizar a tela


        let key = e.target.closest('.pizza-item').getAttribute('data-key');//Atribuir o data-key a cada pizza
        modalQt = 1;//Manter a quantidade do modal em 1

        /****************************************Adicionar informações da pizza no modal****************************************/

         c('.pizzaBig img').src = pizzaJson[key].img //Mostrar imagem no modal
;        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;//Mostrar o nome da pizza no modal
         c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;//Mostrar a descrição da pizza
         c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;//Mostrar preço no modal
        
         c('.pizzaInfo--size.selected').classList.remove('selected');//Remover a seleção definida no index do tamanho da pizza no modal
         cs('.pizzaInfo--size').forEach((size, sizeIndex)=>{  

             if(sizeIndex == 2) {//Definir de acordo com Json o indice 2 (tamanho da pizza) ficará selecionada por padrão
                 size.classList.add('selected');
             }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];//Preencher a informação do modal dos KG da pizza de acordo com cada tamanho
        });
        c('.pizzaInfo--qt').innerHTML = modalQt;//Resertar para  quando o usuário mudar a quantidade e fechar o modal
        //Ação para abertura do modal
        c('.pizzaWindowArea').style.opacity = 0;
        c('.pizzaWindowArea').style.display = 'flex';//Abrir o modal
        setTimeout(()=>{//Adicionar um tempo para abir o modal
                c('.pizzaWindowArea').style.opacity = 1;
        },200);
        
    });

    //Preencher as informações do pizza-item
    c('.pizza-area').append( pizzaItem);

});

/**************EVENTOS DO MODAL************************ */

function closeModal() {
    c('.pizzaWindowArea').style.opacity = 0;
     setTimeout(()=>{
        c('.pizzaWindowArea').style.display = 'none';
     }, 500);
};

cs('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{
        item.addEventListener('click', closeModal);
});

//Ação para os botões de adicionar e remover pizza no modal
c('.pizzaInfo--qtmenos').addEventListener('click', ()=>{
    if(modalQt > 1) {
        modalQt--;
        c('.pizzaInfo--qt').innerHTML = modalQt;
    }
});
c('.pizzaInfo--qtmais').addEventListener('click', ()=>{//Aumentar a quantidade de pizza no modal
    modalQt++;
    c('.pizzaInfo--qt').innerHTML = modalQt;
});

//Ações para escolher o tamanho da pizza no modal
cs('.pizzaInfo--size').forEach ((size, Index)=>{
    size.addEventListener('click',(e)=>{
        c('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    });
});

