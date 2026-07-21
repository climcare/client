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
 * NÃO calcula sintomas e
 * NÃO executa regras de negócio.
 *
 * Todas as informações apresentadas
 * são produzidas pelo CORE QAI.
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

    const symptoms =
        metrics.sintomas &&
        typeof metrics.sintomas === "object"

            ? metrics.sintomas

            : {};

    // =====================================================
    // Análise individual
    // =====================================================

    const individualEntries =
        Object.entries(individual);

    const individualHTML =
        individualEntries.length > 0

            ? individualEntries.map(
                ([parameter, state]) => `

                    <article class="metric-item">

                        <span class="metric-parameter">
                            ${formatParameter(parameter)}
                        </span>

                        <strong class="metric-state">
                            ${state ?? "N/D"}
                        </strong>

                    </article>

                `
            ).join("")

            : `

                <p class="metric-empty">
                    Nenhuma análise individual disponível.
                </p>

            `;

    // =====================================================
    // Indicadores de sintomas
    // =====================================================

    const symptomEntries =
        Object.entries(symptoms);

    const symptomsHTML =
        symptomEntries.length > 0

            ? symptomEntries.map(
                ([symptom, value]) => `

                    <article class="symptom-item">

                        <span class="symptom-label">
                            ${formatSymptom(symptom)}
                        </span>

                        <strong class="symptom-value">
                            ${value ?? "N/D"}
                        </strong>

                    </article>

                `
            ).join("")

            : `

                <p class="metric-empty">
                    Nenhum indicador disponível.
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


            <div class="metrics-section">

                <h3 class="metrics-section-title">
                    Indicadores de Sintomas
                </h3>

                <div class="symptoms-grid">

                    ${symptomsHTML}

                </div>

            </div>

        </div>

    `;

}


// =====================================================
// Formatação dos parâmetros
// =====================================================

function formatParameter(parameter) {

    const labels = {

        temperatura: "Temperatura",

        umidade: "Umidade",

        co2: "CO₂",

        pm1: "PM1",

        pm25: "PM2.5",

        pm4: "PM4",

        pm10: "PM10",

        vocIndex: "VOC Index",

        noxIndex: "NOx Index"

    };

    return labels[parameter] ?? parameter;

}


// =====================================================
// Formatação dos sintomas
// =====================================================

function formatSymptom(symptom) {

    const labels = {

        fadiga: "Fadiga",

        alergia: "Alergia",

        desconforto: "Desconforto"

    };

    return labels[symptom] ?? symptom;

}