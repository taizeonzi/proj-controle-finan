// prompt para o Puter:
let pedido = 'Olhe a foto deste comprovante e responda em UMA linha, sem escrever mais nada, com 2 pedaços separados por |. Primeiro pedaço: o emoji da categoria, o nome do estabelecimento dentro de <strong>, e depois cada item comprado com seu valor, um por linha usando <br>. Segundo pedaço: o total pago, só o número, com ponto e sempre com duas casas decimais. As categorias são: 🛒 Mercado, 🚗 Transporte, 🍔 Comida, 💊 Saúde, 🎉 Lazer, 🏠 Casa, 💸 Outros. Exemplo de resposta: 🍔 <strong>Padaria Pão Quente</strong><br>Pão — R$ 5,00<br>Leite — R$ 4,50|9.50';
let total = 0
let quantidadeComprovantes = 0

async function lerFoto() {
    let foto = document.querySelector(".foto").files[0]
    let resposta = await puter.ai.chat(pedido, foto)
    let texto = resposta.message.content
    let partes = texto.split("|")
    console.log(partes)
    document.querySelector(".lista").innerHTML += `
        <div class="comprovante"> 
            <div class="itens">${partes[0]}</div>

            <div class="total-nota">Total da nota: R$ ${partes[1]}</div>

        </div>
    `
    quantidadeComprovantes++
    // Atualiza a quantidade de comprovantes na tela
    if (quantidadeComprovantes === 1) {
        document.querySelector(".quantidade-comprovantes").innerHTML = "1 comprovante lido"
    } else {
        document.querySelector(".quantidade-comprovantes").innerHTML = quantidadeComprovantes + " comprovantes lidos"
    }

    total += Number(partes[1])
    document.querySelector(".total-gasto").innerHTML = "R$" + total.toFixed(2)

}
