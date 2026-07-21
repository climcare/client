/**
 * ======================================================================
 * CORE QAI
 * Reference Dashboard
 * ----------------------------------------------------------------------
 * Arquivo    : diagnostics.js
 * Componente : Diagnósticos
 * Versão     : RC2.2
 * ======================================================================
 */

/**
 * Renderiza os diagnósticos recebidos pela API.
 *
 * IMPORTANTE:
 * Este componente NÃO executa diagnóstico,
 * NÃO define prioridade e NÃO classifica severidade.
 *
 * Todas essas informações são produzidas pelo CORE QAI.
 *
 * @param {Object} diagnostics
 */
export default function renderDiagnostics(diagnostics) {

    const container =
        document.getElementById("diagnostics");

    // =====================================================
    // Validação do container
    // =====================================================

    if (!container) {

        console.error(
            "Container #diagnostics não encontrado."
        );

        return;

    }

    // =====================================================
    // Validação dos dados
    // =====================================================

    if (!diagnostics || !diagnostics.primary) {

        container.innerHTML = `

            <div class="diagnostics-card">

                <h2>
                    Diagnósticos
                </h2>

                <p>
                    Nenhum diagnóstico disponível.
                </p>

            </div>

        `;

        return;

    }

    // =====================================================
    // Dados
    // =====================================================

    const primary =
        diagnostics.primary;

    const secondary =
        Array.isArray(diagnostics.secondary)
            ? diagnostics.secondary
            : [];

    // =====================================================
    // Diagnósticos secundários
    // =====================================================

    const secondaryHTML =
        secondary.length > 0

            ? secondary.map(item => `

                <article class="diagnostic-secondary-item">

                    <div class="diagnostic-title-row">

                        <span class="diagnostic-code">
                            ${item.code ?? "N/D"}
                        </span>

                        <span class="diagnostic-severity">
                            ${item.severity ?? "N/D"}
                        </span>

                    </div>

                    <h3>
                        ${item.name ?? "Diagnóstico não identificado"}
                    </h3>

                    <p>
                        ${item.description ?? ""}
                    </p>

                    <div class="diagnostic-meta">

                        <span>
                            Prioridade:
                            <strong>
                                ${item.priority ?? "N/D"}
                            </strong>
                        </span>

                    </div>

                </article>

            `).join("")

            : `

                <p class="diagnostic-empty">
                    Nenhum diagnóstico secundário.
                </p>

            `;

    // =====================================================
    // Renderização
    // =====================================================

    container.innerHTML = `

        <div class="diagnostics-card">

            <div class="diagnostics-header">

                <h2>
                    Diagnósticos
                </h2>

                <div class="diagnostics-summary">

                    <span>
                        Status:
                        <strong>
                            ${diagnostics.status ?? "N/D"}
                        </strong>
                    </span>

                    <span>
                        Confiança:
                        <strong>
                            ${diagnostics.confidence ?? "N/D"}%
                        </strong>
                    </span>

                </div>

            </div>


            <div class="diagnostic-section">

                <h3 class="diagnostic-section-title">
                    Diagnóstico Principal
                </h3>

                <article class="diagnostic-primary">

                    <div class="diagnostic-title-row">

                        <span class="diagnostic-code">
                            ${primary.code ?? "N/D"}
                        </span>

                        <span class="diagnostic-severity">
                            ${primary.severity ?? "N/D"}
                        </span>

                    </div>

                    <h3>
                        ${primary.name ?? "Diagnóstico não identificado"}
                    </h3>

                    <p>
                        ${primary.description ?? ""}
                    </p>

                    <div class="diagnostic-meta">

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

                    </div>

                </article>

            </div>


            <div class="diagnostic-section">

                <h3 class="diagnostic-section-title">
                    Diagnósticos Secundários
                </h3>

                <div class="diagnostic-secondary-list">

                    ${secondaryHTML}

                </div>

            </div>

        </div>

    `;

}