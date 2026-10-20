let indiceContato = null;

function salvarContatoInicial() {
    const lista = JSON.parse(localStorage.getItem("contatosDevside")) || [];

    const contato = {
        nome: document.getElementById("nome").value.trim(),
        celular: document.getElementById("celular").value.trim(),
        avatar: "",
        data: new Date().toLocaleString("pt-BR")
    };

    if (indiceContato === null) {
        // Primeira vez: acrescenta no final da lista
        lista.push(contato);
        indiceContato = lista.length - 1;
    } else {
        // Se a pessoa voltou e avançou de novo, atualiza o mesmo registro
        lista[indiceContato] = contato;
    }

    localStorage.setItem("contatosDevside", JSON.stringify(lista));
}

document.addEventListener("DOMContentLoaded", function () {
    const btnProximaDados = document.getElementById("btnProximaDados");

    if (btnProximaDados) {
        btnProximaDados.addEventListener("click", salvarContatoInicial);
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const celular = document.getElementById("celular");

    if (!celular) return;

    celular.setAttribute("maxlength", "15");

    celular.addEventListener("input", function () {
        let n = celular.value.replace(/\D/g, "").slice(0, 11);

        if (n.length > 10) {
            n = n.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, "($1) $2-$3");
        } else if (n.length > 6) {
            n = n.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
        } else if (n.length > 2) {
            n = n.replace(/^(\d{2})(\d{0,5}).*/, "($1) $2");
        } else if (n.length > 0) {
            n = n.replace(/^(\d{0,2}).*/, "($1");
        }

        celular.value = n;
    });
});