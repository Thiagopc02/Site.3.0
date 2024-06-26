function carregarCarrinho() {
    const itensCarrinho = document.getElementById('itens-carrinho');
    const totalCarrinho = document.getElementById('total-carrinho');
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    itensCarrinho.innerHTML = '';
    let total = 0;

    carrinho.forEach(produto => {
        if (produto.quantidade > 0) {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'item-carrinho';
            itemDiv.innerHTML = `
                <p>${produto.nome} | Quantidade: ${produto.quantidade} | Total: R$ ${(produto.preco * produto.quantidade).toFixed(2)}</p>
            `;
            itensCarrinho.appendChild(itemDiv);
            total += produto.preco * produto.quantidade;
        }
    });

    totalCarrinho.innerHTML = `Total: R$ ${total.toFixed(2)}`;
}

function enviarPedido() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const celular = document.getElementById('celular').value;
    const totalCarrinho = document.getElementById('total-carrinho').textContent;

    if (nome && email && celular) {
        let mensagem = `Olá, gostaria de fazer um pedido!\n\nNome: ${nome}\nEmail: ${email}\nCelular: ${celular}\n\n`;
        
        const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        
        carrinho.forEach(produto => {
            if (produto.quantidade > 0) {
                mensagem += `${produto.nome} | Quantidade: ${produto.quantidade} | Total: R$ ${(produto.preco * produto.quantidade).toFixed(2)}\n`;
            }
        });

        const numeroWhatsApp = '62996916206'; // Número de WhatsApp para o qual você deseja enviar a mensagem

        // Monta o link para abrir no WhatsApp com a mensagem pré-preenchida
        const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

        // Redireciona para o WhatsApp
        window.location.href = linkWhatsApp;
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

carregarCarrinho();
