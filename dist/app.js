"use strict";
const API_URL = "https://script.google.com/macros/s/AKfycby4uj7txE2mCzngQPCOJB7AE87jDvooiOFIXE8BUOowndZ8apZb4mOGHzGooG-iYhZg/exec";
class DadosPlanilha {
}
class BasicData {
}
class CompleteData extends BasicData {
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
    const dadosBasicos = lista;
    dadosBasicos.forEach((item, index) => {
        var _a, _b, _c, _d;
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <p id="nome_da_empresa_${index + 1}" class="nome_empresa"><strong>${(_a = item === null || item === void 0 ? void 0 : item.nome_da_empresa) === null || _a === void 0 ? void 0 : _a.value}</strong></p>
          <p id="telefone_da_empresa_${index + 1}"><strong>Telefone</strong> ${(_b = item === null || item === void 0 ? void 0 : item.telefone) === null || _b === void 0 ? void 0 : _b.value}</p>
          <p id="e_mail_da_empresa_${index + 1}"><strong>E-mail</strong> ${(_c = item === null || item === void 0 ? void 0 : item.e_mail) === null || _c === void 0 ? void 0 : _c.value}</p>
          <p id="endereco_da_empresa_${index + 1}"><strong>Endereço</strong> ${(_d = item === null || item === void 0 ? void 0 : item.endereco_da_empresa) === null || _d === void 0 ? void 0 : _d.value}</p>
        `;
        card.addEventListener("click", () => abrirModal(item));
        container.appendChild(card);
    });
}
function abrirModal(item) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    const modalOverlay = document.getElementById("modal-overlay");
    const modalContent = document.getElementById("modal-content");
    const whatsappNumber = (_b = `${(_a = item === null || item === void 0 ? void 0 : item.telefone) === null || _a === void 0 ? void 0 : _a.value}`) === null || _b === void 0 ? void 0 : _b.replace(/\D/g, "");
    const link = `https://wa.me/${whatsappNumber}`;
    modalContent.innerHTML = `
    
          <p id="nome_da_empresa" class="nome_empresa"><strong>${(_c = item === null || item === void 0 ? void 0 : item.nome_da_empresa) === null || _c === void 0 ? void 0 : _c.value}</strong></p>
          <p id="representante"><strong>Representante</strong> ${(_d = item === null || item === void 0 ? void 0 : item.nome) === null || _d === void 0 ? void 0 : _d.value}</p>
          <p id="telefone_da_empresa"><strong>Telefone</strong> ${(_e = item === null || item === void 0 ? void 0 : item.telefone) === null || _e === void 0 ? void 0 : _e.value}</p>
          <p id="e_mail_da_empresa"><strong>E-mail</strong> ${(_f = item === null || item === void 0 ? void 0 : item.e_mail) === null || _f === void 0 ? void 0 : _f.value}</p>
           <p id="area_de_atuacao_"><strong>Area de Atuação</strong> ${(_g = item === null || item === void 0 ? void 0 : item.area_de_atuacao_) === null || _g === void 0 ? void 0 : _g.value}</p>
          <p id="natureza_do_trabalho"><strong>Natureza da Empresa</strong> ${(_h = item === null || item === void 0 ? void 0 : item.natureza_do_trabalho_) === null || _h === void 0 ? void 0 : _h.value}</p>
          <p id="tempo_de_atuacao_e_de_experiencia"><strong>Tempo de Atuação</strong> ${(_j = item === null || item === void 0 ? void 0 : item.tempo_de_atuacao_e_de_experiencia) === null || _j === void 0 ? void 0 : _j.value}</p>
          <p id="descricao_dos_servicos_prestados"><strong>Endereço</strong> ${(_k = item === null || item === void 0 ? void 0 : item.descricao_dos_servicos_prestados) === null || _k === void 0 ? void 0 : _k.value}</p>
        
          <p id="endereco_da_empresa"><strong>Endereço</strong> ${(_l = item === null || item === void 0 ? void 0 : item.endereco_da_empresa) === null || _l === void 0 ? void 0 : _l.value}</p>
    
            <div class="logo-whatsapp" title="Clique para iniciar uma conversa com este contato">
                <a href="${link}" target="_blank">
                    <img src="./imgs/WhatsApp-logo.png" alt="logo WhatsApp" width="50" height="50">
                </a>
            </div>
    `;
    const t = Object.entries(item)
        .map(([_, { header, value }]) => {
        var _a;
        if (header === null || header === void 0 ? void 0 : header.toLowerCase().includes("telefone")) {
            const whatsappNumber = (_a = `${value}`) === null || _a === void 0 ? void 0 : _a.replace(/\D/g, "");
            const link = `https://wa.me/${whatsappNumber}`;
            return `<div class="logo-whatsapp" title="Clique para iniciar uma conversa com este contato">
                        <a href="${link}" target="_blank">
                            <img src="./imgs/WhatsApp-logo.png" alt="logo WhatsApp" width="50" height="50">
                        </a>
                    </div>`;
        }
        return `<p><strong>${header}:</strong> ${value}</p>`;
    })
        .join("");
    modalOverlay.classList.remove("hidden");
}
document.addEventListener("DOMContentLoaded", () => {
    carregarDados();
    const inputBusca = document.getElementById("busca");
    const btnBusca = document.getElementById("btn-busca");
    function filtrar() {
        const termo = inputBusca.value.toLowerCase();
        const filtrados = dadosPlanilha.filter((item) => {
            var _a, _b;
            const nome = ((_b = (_a = item["nome_da_empresa"]) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.toLowerCase()) || "";
            return nome.includes(termo);
        });
        renderizarDados(filtrados);
    }
    inputBusca.addEventListener("input", filtrar);
    btnBusca.addEventListener("click", filtrar);
});
document.addEventListener("DOMContentLoaded", () => {
    var _a, _b;
    const closeModal = () => {
        const modalOverlay = document.getElementById("modal-overlay");
        modalOverlay.classList.add("hidden");
    };
    (_a = document.getElementById("modal-close")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", closeModal);
    (_b = document.getElementById("modal-overlay")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", (e) => {
        if (e.target === e.currentTarget)
            closeModal();
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.getElementById('navbar');
    const searchIcon = document.getElementById('search-icon');
    const timesIcon = document.getElementById('times-icon');
    const searchContainer = document.getElementById('search-container');
    searchIcon.addEventListener('click', () => {
        searchContainer.classList.toggle('hidden');
        timesIcon.classList.toggle('hidden');
        navbar.classList.toggle('expanded');
    });
    timesIcon.addEventListener('click', () => {
        searchContainer.classList.toggle('hidden');
        timesIcon.classList.toggle('hidden');
        navbar.classList.toggle('expanded');
    });
});
