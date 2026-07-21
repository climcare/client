/**
 * ======================================================================
 * CORE QAI
 * Reference Dashboard
 * ----------------------------------------------------------------------
 * Arquivo    : hypotheses.js
 * Componente : Hipóteses
 * Versão     : RC2.3
 * ======================================================================
 */

/**
 * Renderiza as hipóteses recebidas pela API.
 *
 * IMPORTANTE:
 * Este componente NÃO gera hipóteses,
 * NÃO calcula confiança,
 * NÃO define prioridade e
 * NÃO relaciona evidências.
 *
 * Todas essas informações são produzidas pelo CORE QAI.
 *
 * @param {Object} hypotheses
 */
export default function renderHypotheses(hypotheses) {

    const container =
        document.getElementById("hypotheses");

    // =====================================================
    // Validação do container
    // =====================================================

    if (!container) {

        console.error(
            "Container #hypotheses não encontrado."
        );

        return;

    }

    // =====================================================
    // Validação dos dados
    // =====================================================

    if (!hypotheses || !hypotheses.primary) {

        container.innerHTML = `

            <div class="hypotheses-card">

                <h2>
                    Hipóteses
                </h2>

                <p>
                    Nenhuma hipótese disponível.
                </p>

            </div>

        `;

        return;

    }

    // =====================================================
    // Dados
    // =====================================================

    const primary =
        hypotheses.primary;

    const secondary =
        Array.isArray(hypotheses.secondary)
            ? hypotheses.secondary
            : [];

    // =====================================================
    // Hipóteses secundárias
    // =====================================================

    const secondaryHTML =
        secondary.length > 0

            ? secondary.map(item => `

                <article class="hypothesis-secondary-item">

                    <div class="hypothesis-title-row">

                        <span class="hypothesis-code">
                            ${item.code ?? "N/D"}
                        </span>

                        <span class="hypothesis-confidence">
                            Confiança:
                            <strong>
                                ${item.confidence ?? "N/D"}%
                            </strong>
                        </span>

                    </div>

                    <h3>
                        ${item.name ?? "Hipótese não identificada"}
                    </h3>

                    <p>
                        ${item.description ?? ""}
                    </p>

                    <div class="hypothesis-meta">

                        <span>
                            Categoria:
                            <strong>
                                ${item.category ?? "N/D"}
                            </strong>
                        </span>

                        <span>
                            Prioridade:
                            <strong>
                                ${item.priority ?? "N/D"}
                            </strong>
                        </span>

                        <span>
                            Severidade:
                            <strong>
                                ${item.severity ?? "N/D"}
                            </strong>
                        </span>

                    </div>

                    ${
                        item.expectedOutcome
                            ? `
                                <div class="hypothesis-outcome">

                                    <strong>
                                        Resultado esperado
                                    </strong>

                                    <p>
                                        ${item.expectedOutcome}
                                    </p>

                                </div>
                            `
                            : ""
                    }

                </article>

            `).join("")

            : `

                <p class="hypothesis-empty">
                    Nenhuma hipótese secundária.
                </p>

            `;

    // =====================================================
    // Renderização
    // =====================================================

    container.innerHTML = `

        <div class="hypotheses-card">

            <div class="hypotheses-header">

                <h2>
                    Hipóteses
                </h2>

            </div>


            <div class="hypothesis-section">

                <h3 class="hypothesis-section-title">
                    Hipótese Principal
                </h3>

                <article class="hypothesis-primary">

                    <div class="hypothesis-title-row">

                        <span class="hypothesis-code">
                            ${primary.code ?? "N/D"}
                        </span>

                        <span class="hypothesis-confidence">
                            Confiança:
                            <strong>
                                ${primary.confidence ?? "N/D"}%
                            </strong>
                        </span>

                    </div>

                    <h3>
                        ${primary.name ?? "Hipótese não identificada"}
                    </h3>

                    <p>
                        ${primary.description ?? ""}
                    </p>

                    <div class="hypothesis-meta">

                        <span>
                            Categoria:
                            <strong>
                                ${primary.category ?? "N/D"}
                            </strong>
                        </span>

                        <span>
                            Prioridade:
                            <strong>
                                ${primary.priority ?? "N/D"}
                            </strong>
                        </span>

                        <span>
                            Severidade:
                            <strong>
                                ${primary.severity ?? "N/D"}
                            </strong>
                        </span>

                    </div>

                    ${
                        primary.expectedOutcome
                            ? `
                                <div class="hypothesis-outcome">

                                    <strong>
                                        Resultado esperado
                                    </strong>

                                    <p>
                                        ${primary.expectedOutcome}
                                    </p>

                                </div>
                            `
                            : ""
                    }

                </article>

            </div>


            <div class="hypothesis-section">

                <h3 class="hypothesis-section-title">
                    Hipóteses Secundárias
                </h3>

                <div class="hypothesis-secondary-list">

                    ${secondaryHTML}

                </div>

            </div>

        </div>

    `;

}