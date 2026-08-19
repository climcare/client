/**
 * ======================================================================
 * CORE QAI
 * Reference Dashboard
 * ----------------------------------------------------------------------
 * Arquivo    : components/metrics.js
 * Componente : Métricas Analíticas
 * Versão     : RC4.0
 * ======================================================================
 */

/**
 * Renderiza as métricas analíticas produzidas pelo MIQAI_CORE.
 *
 * IMPORTANTE:
 * Este componente NÃO:
 *
 * - calcula métricas;
 * - classifica parâmetros;
 * - aplica regras;
 * - calcula scores;
 * - interpreta sintomas.
 *
 * Todas as informações apresentadas são provenientes
 * diretamente de analysis.metrics.
 *
 * @param {Object} metrics
 */

export default function renderMetrics(
    metrics
) {

    const container =
        document.getElementById(
            "metrics"
        );


    // ================================================================
    // Validação do container
    // ================================================================

    if (!container) {

        console.error(
            "Container #metrics não encontrado."
        );

        return;

    }


    // ================================================================
    // Validação dos dados
    // ================================================================

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


    // ================================================================
    // Indicadores oficiais do CORE
    // ================================================================

    const indicators = [

        {
            key:
                "thermalComfort",

            label:
                "Conforto Térmico"
        },

        {
            key:
                "airQuality",

            label:
                "Qualidade do Ar"
        },

        {
            key:
                "particulateLoad",

            label:
                "Carga de Partículas"
        },

        {
            key:
                "occupancy",

            label:
                "Ocupação"
        },

        {
            key:
                "qaiScore",

            label:
                "QAI Score"
        },

        {
            key:
                "healthRisk",

            label:
                "Risco à Saúde"
        }

    ];


    // ================================================================
    // Renderização dos indicadores
    // ================================================================

    const indicatorsHTML =
        indicators
            .map(
                indicator => {

                    const value =
                        metrics[
                            indicator.key
                        ] ?? {};


                    const score =
                        value.score ?? "N/D";


                    const level =
                        value.level ?? "N/D";


                    const dominantFactor =
                        value.dominantFactor ??
                        null;


                    return `

                        <article
                            class="metric-item"
                            data-metric="${indicator.key}"
                        >

                            <div
                                class="metric-item-header"
                            >

                                <span
                                    class="metric-parameter"
                                >
                                    ${indicator.label}
                                </span>

                            </div>


                            <div
                                class="metric-item-body"
                            >

                                <strong
                                    class="metric-score"
                                >
                                    ${score}
                                </strong>


                                <span
                                    class="metric-state"
                                >
                                    ${escapeHTML(level)}
                                </span>

                            </div>


                            ${
                                dominantFactor
                                    ? `

                                        <div
                                            class="metric-dominant-factor"
                                        >

                                            <span>
                                                Fator dominante
                                            </span>

                                            <strong>
                                                ${escapeHTML(
                                                    dominantFactor
                                                )}
                                            </strong>

                                        </div>

                                    `
                                    : ""
                            }

                        </article>

                    `;

                }
            )
            .join("");


    // ================================================================
    // Renderização
    // ================================================================

    container.innerHTML = `

        <div class="metrics-card">


            <div class="metrics-header">

                <div>

                    <h2>
                        Métricas Analíticas
                    </h2>

                    <p class="metrics-subtitle">
                        Indicadores produzidos pelo MIQAI_CORE
                    </p>

                </div>

            </div>


            <div class="metrics-grid">

                ${indicatorsHTML}

            </div>


            <div class="metrics-source">

                <span>
                    Fonte analítica:
                </span>

                <strong>
                    MIQAI_CORE
                </strong>

            </div>


        </div>

    `;

}


// ======================================================================
// Segurança básica de saída
// ======================================================================

function escapeHTML(
    value
) {

    return String(value)

        .replaceAll(
            "&",
            "&amp;"
        )

        .replaceAll(
            "<",
            "&lt;"
        )

        .replaceAll(
            ">",
            "&gt;"
        )

        .replaceAll(
            '"',
            "&quot;"
        )

        .replaceAll(
            "'",
            "&#039;"
        );

}