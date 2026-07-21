/**
 * ======================================================================
 * CORE QAI
 * Reference Dashboard
 * ----------------------------------------------------------------------
 * Arquivo    : score.js
 * Componente : Score Geral
 * Versão     : RC2.1
 * ======================================================================
 */

/**
 * Renderiza o score geral recebido pela API.
 *
 * IMPORTANTE:
 * Este componente NÃO calcula o score.
 * O valor é produzido pelo CORE QAI e apenas apresentado aqui.
 *
 * @param {Object} metrics
 */
export default function renderScore(metrics) {

    const container =
        document.getElementById("score");

    // =====================================================
    // Validação
    // =====================================================

    if (!container) {

        console.error(
            "Container #score não encontrado."
        );

        return;

    }

    if (!metrics) {

        container.innerHTML = `
            <h2>Score Geral</h2>
            <p>Score não disponível.</p>
        `;

        return;

    }

    // =====================================================
    // Dados
    // =====================================================

    const score =
        metrics.scoreGeral;

    // =====================================================
    // Renderização
    // =====================================================

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

            <div class="score-scale">

                <span>
                    0
                </span>

                <span>
                    100
                </span>

            </div>

        </div>

    `;

}