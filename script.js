let cart = [];

let  modalQt = 1;//Manter a quantidade do modal em 1
let modalKey = 1;

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
       modalQt = 1;
       modalKey = key;

        /****************************************Adicionar informações da pizza no modal****************************************/

         c('.pizzaBig img').src = pizzaJson[key].img //Mostrar imagem no modal
         c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;//Mostrar o nome da pizza no modal
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
cs('.pizzaInfo--size').forEach ((size, Index)=>{//
    size.addEventListener('click',(e)=>{
        //remove o que foi selecionado e muda para outr tamanho selecuinado
        c('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    });
});


c('.pizzaInfo--addButton').addEventListener('click', ()=>{
    let size =  parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key'));
    let identifier = pizzaJson[modalKey].id+'@'+size;//identificador
    let key = cart.findIndex((item)=> item.identifier == identifier);
        if(key > -1) {
            cart[key].qt += modalQt;
        }else{
            cart.push({
                identifier,
                id:pizzaJson[modalKey].id,
                size,
                qt:modalQt
            });      
    };
    updateCart();
    closeModal();
});
c('.menu-openner').addEventListener('click', ()=>{
    if(cart.length > 0) {
    c('aside').style.left = '0';
    }     
});
c('.menu-closer').addEventListener('click', ()=>{//Fechar carrinho mobile
    c('aside').style.left = '100vw';
});

function updateCart() {
    c('.menu-openner span').innerHTML = cart.length;//Atualizar quantidade no carrinho mobile

    if(cart.length > 0) {
        c('aside').classList.add('show');
        c('.cart').innerHTML = '';//Zerar a lista do carrinho

        let subtotal = 0;
        let desconto = 0;
        let total = 0;

        for(let i in cart){
            let pizzaItem = pizzaJson.find((item)=>item.id == cart[i].id);
            subtotal += pizzaItem.price * cart[i].qt;


            let cartItem = c('.models .cart--item').cloneNode(true);

            let pizzaSizeName; //Mostrar o tamanho da pizza escolhida no carrinho
            switch(cart[i].size) {
               case 0:
                pizzaSizeName = 'P';
                break; 
                case 1:
                pizzaSizeName = 'M';
                break; 
                case 2:
                pizzaSizeName = 'G';
                break; 
            }

            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;

            cartItem.querySelector('img').src = pizzaItem.img;//Mostrar a imagem da pizza no carrinho
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName; // MOstrar o nome da pizza no carrinho
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click',()=>{
                if(cart[i].qt > 1) {
                    cart[i].qt--;
                }else {
                    cart.splice(i, 1);
                }
                updateCart();
            });
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click',()=>{
                cart[i].qt++;
                updateCart();
            });

            c('.cart').append(cartItem);
        }
        desconto = subtotal * 0.1;
        total = subtotal - desconto;
        c('.subtotal span:last-child').innerHTML = `RE ${subtotal.toFixed(2)}`;
        c('.desconto span:last-child').innerHTML = `RE ${desconto.toFixed(2)}`;
        c('.total span:last-child').innerHTML = `RE ${total.toFixed(2)}`;

    }else {
        c('aside').classList.remove('show');
        c('aside').style.left = '100vw';
    }
}


