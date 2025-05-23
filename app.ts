const API_URL = "https://script.google.com/macros/s/AKfycby4uj7txE2mCzngQPCOJB7AE87jDvooiOFIXE8BUOowndZ8apZb4mOGHzGooG-iYhZg/exec";

class DadosPlanilha {
    header?: string;
    value?: string;
}

class BasicData {
    endereco_da_empresa?: DadosPlanilha;
    nome_da_empresa?: DadosPlanilha;
    telefone?: DadosPlanilha;
    e_mail?: DadosPlanilha;
}

class CompleteData extends BasicData {
    tempo_de_atuacao_e_de_experiencia?: DadosPlanilha;
    descricao_dos_servicos_prestados?: DadosPlanilha;
    natureza_do_trabalho_?: DadosPlanilha;
    area_de_atuacao_?: DadosPlanilha;
    nome?: DadosPlanilha;
}

let dadosPlanilha: Map<string, DadosPlanilha>[] = [];

async function carregarDados(): Promise<void> {
    const loader = document.getElementById("loader")!;
    loader.style.display = "flex";

    try {
        const response: Response = await fetch(API_URL);
        dadosPlanilha = await response.json();

        renderizarDados(dadosPlanilha);
    } catch (error) {
        console.error("Erro ao buscar dados da planilha:", error);
    } finally {
        loader.style.display = "none";
    }
}

function renderizarDados(lista: Map<string, DadosPlanilha>[]): void {
    const container: HTMLElement = document.getElementById("empresa-lista")!;
    container.innerHTML = "";

    const dadosBasicos: BasicData[] = lista as BasicData[]

    dadosBasicos.forEach((item: BasicData, index: number): void => {
        const card: HTMLDivElement = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
          <p id="nome_da_empresa_${index + 1}" class="nome_empresa"><strong>${item?.nome_da_empresa?.value}</strong></p>
          <p id="telefone_da_empresa_${index + 1}"><strong>Telefone</strong> ${item?.telefone?.value}</p>
          <p id="e_mail_da_empresa_${index + 1}"><strong>E-mail</strong> ${item?.e_mail?.value}</p>
          <p id="endereco_da_empresa_${index + 1}"><strong>Endereço</strong> ${item?.endereco_da_empresa?.value}</p>
        `

        card.addEventListener("click", (): void => abrirModal(item as any));

        container.appendChild(card);
    });
}

function abrirModal(item: CompleteData): void {
    const modalOverlay: HTMLElement = document.getElementById("modal-overlay")!;
    const modalContent: HTMLElement = document.getElementById("modal-content")!;

    const whatsappNumber: string | undefined = `${item?.telefone?.value}`?.replace(/\D/g, "");
    const link = `https://wa.me/${whatsappNumber}`;

    modalContent.innerHTML = `
    
          <p id="nome_da_empresa" class="nome_empresa"><strong>${item?.nome_da_empresa?.value}</strong></p>
          <p id="representante"><strong>Representante</strong> ${item?.nome?.value}</p>
          <p id="telefone_da_empresa"><strong>Telefone</strong> ${item?.telefone?.value}</p>
          <p id="e_mail_da_empresa"><strong>E-mail</strong> ${item?.e_mail?.value}</p>
           <p id="area_de_atuacao_"><strong>Area de Atuação</strong> ${item?.area_de_atuacao_?.value}</p>
          <p id="natureza_do_trabalho"><strong>Natureza da Empresa</strong> ${item?.natureza_do_trabalho_?.value}</p>
          <p id="tempo_de_atuacao_e_de_experiencia"><strong>Tempo de Atuação</strong> ${item?.tempo_de_atuacao_e_de_experiencia?.value}</p>
          <p id="descricao_dos_servicos_prestados"><strong>Descrição dos Serviços</strong> ${item?.descricao_dos_servicos_prestados?.value}</p>
        
          <p id="endereco_da_empresa"><strong>Endereço</strong> ${item?.endereco_da_empresa?.value}</p>
    
            <div class="logo-whatsapp" title="Clique para iniciar uma conversa com este contato">
                <a href="${link}" target="_blank">
                    <img src="./imgs/WhatsApp-logo.png" alt="logo WhatsApp" width="50" height="50">
                </a>
            </div>
    `


        const t = Object.entries(item)
        .map(([_, {header, value}]): string => {
            if (header?.toLowerCase().includes("telefone")) {
                const whatsappNumber: string | undefined = `${value}`?.replace(/\D/g, "");
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

document.addEventListener("DOMContentLoaded", (): void => {
    carregarDados();

    const inputBusca = document.getElementById("busca") as HTMLInputElement;
    const btnBusca = document.getElementById("btn-busca") as HTMLButtonElement;

    function filtrar(): void {
        const termo: string = inputBusca.value.toLowerCase();

        const filtrados: Map<string, DadosPlanilha>[] = dadosPlanilha.filter((item: any): boolean => {
            const nome: string = item["nome_da_empresa"]?.value?.toLowerCase() || "";
            return nome.includes(termo);
        });

        renderizarDados(filtrados);
    }


    inputBusca.addEventListener("input", filtrar);
    btnBusca.addEventListener("click", filtrar);

});

document.addEventListener("DOMContentLoaded", (): void => {
    const closeModal: () => void = (): void => {
        const modalOverlay: HTMLElement = document.getElementById("modal-overlay")!;
        modalOverlay.classList.add("hidden");
    };

    document.getElementById("modal-close")?.addEventListener("click", closeModal);
    document.getElementById("modal-overlay")?.addEventListener("click", (e) => {
        if (e.target === e.currentTarget) closeModal();
    });
});

document.addEventListener("DOMContentLoaded", (): void => {
    const navbar = document.getElementById('navbar') as HTMLElement;
    const searchIcon = document.getElementById('search-icon') as HTMLElement;
    const timesIcon = document.getElementById('times-icon') as HTMLElement;
    const searchContainer = document.getElementById('search-container') as HTMLElement;

    searchIcon.addEventListener('click', (): void => {
        searchContainer.classList.toggle('hidden');
        timesIcon.classList.toggle('hidden');
        navbar.classList.toggle('expanded');
    });

    timesIcon.addEventListener('click', (): void => {
        searchContainer.classList.toggle('hidden');
        timesIcon.classList.toggle('hidden');
        navbar.classList.toggle('expanded');
    });

});

