/**
 * ======================================================================
 * CORE QAI
 * Reference Dashboard
 * ----------------------------------------------------------------------
 * Arquivo    : metrics.js
 * Componente : Métricas Analíticas
 * Versão     : RC2.5
 * ======================================================================
 */

/**
 * Renderiza as métricas analíticas recebidas da API.
 *
 * IMPORTANTE:
 * Este componente NÃO calcula métricas,
 * NÃO classifica parâmetros,
 * NÃO determina estados e
 * NÃO executa regras de negócio.
 *
 * Todos os valores e classificações apresentados
 * são produzidos pelo CORE QAI.
 *
 * @param {Object} metrics
 */
export default function renderMetrics(metrics) {

    const container =
        document.getElementById("metrics");

    // =====================================================
    // Validação do container
    // =====================================================

    if (!container) {

        console.error(
            "Container #metrics não encontrado."
        );

        return;

    }

    // =====================================================
    // Validação dos dados
    // =====================================================

    if (!metrics) {

        container.innerHTML = `

            <div class="metrics-card">

                <h2>
                    Métricas Analíticas
                </h2>

                <p>
                    Nenhuma métrica disponível.
                </p>

            </div>

        `;

        return;

    }

    // =====================================================
    // Dados
    // =====================================================

    const individual =
        metrics.analiseIndividual &&
        typeof metrics.analiseIndividual === "object"

            ? metrics.analiseIndividual

            : {};

    const entries =
        Object.entries(individual);

    // =====================================================
    // Análise individual
    // =====================================================

    const individualHTML =
        entries.length > 0

            ? entries.map(([parameter, data]) => {

                const item =
                    data &&
                    typeof data === "object"
                        ? data
                        : {};

                return `

                    <article class="metric-item">

                        <div class="metric-item-header">

                            <span class="metric-parameter">
                                ${formatParameter(parameter)}
                            </span>

                            ${
                                item.estado !== undefined
                                    ? `
                                        <span class="metric-state">
                                            ${item.estado}
                                        </span>
                                    `
                                    : ""
                            }

                        </div>

                        ${
                            item.valor !== undefined
                                ? `
                                    <div class="metric-value">
                                        ${item.valor}
                                    </div>
                                `
                                : ""
                        }

                        ${
                            item.mensagem
                                ? `
                                    <p class="metric-message">
                                        ${item.mensagem}
                                    </p>
                                `
                                : ""
                        }

                    </article>

                `;

            }).join("")

            : `

                <p class="metric-empty">
                    Nenhuma análise individual disponível.
                </p>

            `;

    // =====================================================
    // Renderização
    // =====================================================

    container.innerHTML = `

        <div class="metrics-card">

            <div class="metrics-header">

                <div>

                    <h2>
                        Métricas Analíticas
                    </h2>

                    <p class="metrics-subtitle">
                        Indicadores derivados da análise ambiental
                    </p>

                </div>

            </div>


            <div class="metrics-summary">

                <article class="metric-summary-item">

                    <span class="metric-summary-label">
                        Ponto de Orvalho
                    </span>

                    <strong class="metric-summary-value">
                        ${
                            metrics.pontoOrvalho !== undefined
                                ? `${metrics.pontoOrvalho} °C`
                                : "N/D"
                        }
                    </strong>

                </article>

                <article class="metric-summary-item">

                    <span class="metric-summary-label">
                        Score Geral
                    </span>

                    <strong class="metric-summary-value">
                        ${
                            metrics.scoreGeral !== undefined
                                ? metrics.scoreGeral
                                : "N/D"
                        }
                    </strong>

                </article>

            </div>


            <div class="metrics-section">

                <h3 class="metrics-section-title">
                    Análise Individual
                </h3>

                <div class="metrics-grid">

                    ${individualHTML}

                </div>

            </div>

        </div>

    `;

}


// =====================================================
// Formatação visual do nome do parâmetro
// =====================================================

function formatParameter(parameter) {

    const labels = {

        temperatura: "Temperatura",
        temperature: "Temperatura",

        umidade: "Umidade",
        humidity: "Umidade",

        co2: "CO₂",

        pm1: "PM1",
        pm25: "PM2.5",
        pm4: "PM4",
        pm10: "PM10",

        vocIndex: "VOC Index",
        noxIndex: "NOx Index",

        pontoOrvalho: "Ponto de Orvalho"

    };

    return labels[parameter] ?? parameter;

}