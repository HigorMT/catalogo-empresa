const API_URL = "https://script.google.com/macros/s/AKfycbxtJC9vK4lAMUwjVugESkPGHjCQhQS0NhKLrkon6dU_lMZS5OQPa0eT9NlGk94NHTAcYg/exec";

class DadosPlanilha {
    header?: string;
    value?: string;
}

let dadosPlanilha: Map<string, DadosPlanilha>[] = [];

async function carregarDados(): Promise<void> {
    const loader: HTMLElement = document.getElementById("loader")!;

    try {
        loader.style.display = "flex";

        const response: Response = await fetch(API_URL);
        const dados: any = await response.json();


        const container: HTMLElement = document.getElementById("empresa-lista")!;
        container.innerHTML = "";

        dados.forEach((item: Record<string, DadosPlanilha>, index: number): void => {
            const card: HTMLDivElement = document.createElement("div");
            card.className = "card";

            card.innerHTML = Object.entries(item)
                .filter(([campo, {header, value}]: [ string, DadosPlanilha]): boolean => {
                    return (campo !== 'carimbo_de_data_hora' && campo !== 'logo')
                })
                .map(([campo, {header, value}]: [string, DadosPlanilha]): string => {
                    if(campo === 'logo') {
                        if (value) {
                            const match = value.match(/(?:\/d\/|id=)([a-zA-Z0-9_-]{10,})/);
                            const fileId = match ? match[1] : null;

                            const imageUrl = fileId
                                ? `https://drive.google.com/uc?export=view&id=${fileId}`
                                : "/imgs/no_image.png";

                            return `<div class="logo"><img src="${imageUrl}" alt="logo"></div>`;
                        } else {
                            return `<div class="logo"><img src="/imgs/no_image.png" alt="logo"></div>`
                        }
                    }

                    return `<p><strong>${header}:</strong> ${value}</p>`
                })
                .join("");
            container.appendChild(card);
        });
    } catch (error) {
        console.error("Erro ao buscar dados da planilha:", error);
    } finally {
        loader.style.display = "none";
    }
}

carregarDados();
