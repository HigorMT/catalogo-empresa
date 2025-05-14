const API_URL = "https://script.google.com/macros/s/AKfycbxtJC9vK4lAMUwjVugESkPGHjCQhQS0NhKLrkon6dU_lMZS5OQPa0eT9NlGk94NHTAcYg/exec";

class DadosPlanilha {
    header?: string;
    value?: string;
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

    lista.forEach((item: Map<string, DadosPlanilha>) => {
        const card: HTMLDivElement = document.createElement("div");
        card.className = "card";

        card.innerHTML = Object.entries(item)
            .filter(([campo, { header }]: [string, any]): boolean => campo !== "carimbo_de_data_hora" && campo !== "logo")
            .map(([campo, { header, value }]: [string, any]): string => {
                if (campo === "logo") {
                    const imgSrc = value?.includes("drive.google.com/open?id=")
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

document.addEventListener("DOMContentLoaded", (): void => {
    carregarDados();

    const inputBusca = document.getElementById("busca") as HTMLInputElement;
    const btnBusca = document.getElementById("btn-busca") as HTMLButtonElement;

    function filtrar(): void {
        const termo: string = inputBusca.value.toLowerCase();

        const filtrados: Map<string, DadosPlanilha>[] = dadosPlanilha.filter((item: any): boolean => {
            const nome: string = item["nome_empresa"]?.value?.toLowerCase() || "";
            return nome.includes(termo);
        });

        renderizarDados(filtrados);
    }


    inputBusca.addEventListener("input", filtrar);
    btnBusca.addEventListener("click", filtrar);

});
