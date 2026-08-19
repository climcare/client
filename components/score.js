/**
 * ======================================================================
 * CORE QAI
 * Reference Dashboard
 * ----------------------------------------------------------------------
 * Arquivo    : components/score.js
 * Componente : Score Geral
 * Versão     : RC4.0
 * ======================================================================
 */

/**
 * Renderiza o QAI Score produzido pelo MIQAI_CORE.
 *
 * IMPORTANTE:
 * Este componente NÃO calcula o score.
 * Não aplica faixas.
 * Não interpreta valores.
 *
 * Apenas apresenta:
 *
 * metrics.qaiScore.score
 * metrics.qaiScore.level
 * metrics.qaiScore.dominantFactor
 *
 * @param {Object} metrics
 */

export default function renderScore(
    metrics
) {

    const container =
        document.getElementById(
            "score"
        );


    // ================================================================
    // Validação
    // ================================================================

    if (!container) {

        console.error(
            "Container #score não encontrado."
        );

        return;

    }


    if (!metrics) {

        container.innerHTML = `

            <h2>
                Score Geral
            </h2>

            <p>
                Score não disponível.
            </p>

        `;

        return;

    }


    // ================================================================
    // QAI Score
    // ================================================================

    const qaiScore =
        metrics.qaiScore ?? {};


    const score =
        qaiScore.score ?? null;


    const level =
        qaiScore.level ?? null;


    const dominantFactor =
        qaiScore.dominantFactor ?? null;


    // ================================================================
    // Renderização
    // ================================================================

    container.innerHTML = `

        <div class="score-card">

            <div class="score-header">

                <h2>
                    Qualidade Geral
                </h2>

                <p>
                    Índice consolidado da análise ambiental
                </p>

            </div>


            <div class="score-value">

                ${score ?? "N/D"}

            </div>


            <div class="score-level">

                ${level ?? "N/D"}

            </div>


            <div class="score-scale">

                <span>
                    0
                </span>

                <span>
                    100
                </span>

            </div>


            ${
                dominantFactor
                    ? `
                        <div class="score-dominant-factor">

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