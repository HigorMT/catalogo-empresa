"use strict";
const API_URL = "https://script.google.com/macros/s/AKfycbxtJC9vK4lAMUwjVugESkPGHjCQhQS0NhKLrkon6dU_lMZS5OQPa0eT9NlGk94NHTAcYg/exec";
class DadosPlanilha {
}
let dadosPlanilha = [];
async function carregarDados() {
    const loader = document.getElementById("loader");
    loader.style.display = "flex";
    try {
        const response = await fetch(API_URL);
        dadosPlanilha = await response.json();
        renderizarDados(dadosPlanilha);
    }
    catch (error) {
        console.error("Erro ao buscar dados da planilha:", error);
    }
    finally {
        loader.style.display = "none";
    }
}
function renderizarDados(lista) {
    const container = document.getElementById("empresa-lista");
    container.innerHTML = "";
    lista.forEach((item) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = Object.entries(item)
            .filter(([campo, { header }]) => campo !== "carimbo_de_data_hora" && campo !== "logo")
            .map(([campo, { header, value }]) => {
            if (campo === "logo") {
                const imgSrc = (value === null || value === void 0 ? void 0 : value.includes("drive.google.com/open?id="))
                    ? value.replace("open?id=", "uc?export=view&id=")
                    : value || "/imgs/no_image.png";
                return `<div class="logo"><img src="${imgSrc}" alt="logo"></div>`;
            }
            return `<p><strong>${header}:</strong> ${value}</p>`;
        })
            .join("");
        container.appendChild(card);
    });
}
document.addEventListener("DOMContentLoaded", () => {
    carregarDados();
    const inputBusca = document.getElementById("busca");
    const btnBusca = document.getElementById("btn-busca");
    function filtrar() {
        const termo = inputBusca.value.toLowerCase();
        const filtrados = dadosPlanilha.filter((item) => {
            var _a, _b;
            const nome = ((_b = (_a = item["nome_empresa"]) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.toLowerCase()) || "";
            return nome.includes(termo);
        });
        renderizarDados(filtrados);
    }
    inputBusca.addEventListener("input", filtrar);
    btnBusca.addEventListener("click", filtrar);
});
