/**
 * ======================================================================
 * CORE QAI
 * Reference Dashboard
 * ----------------------------------------------------------------------
 * Arquivo    : mitigations.js
 * Componente : Mitigações
 * Versão     : RC2.4
 * ======================================================================
 */

/**
 * Renderiza as mitigações recebidas pela API.
 *
 * IMPORTANTE:
 * Este componente NÃO cria ações,
 * NÃO define prioridades,
 * NÃO seleciona mitigações e
 * NÃO executa regras de negócio.
 *
 * Todas essas informações são produzidas pelo CORE QAI.
 *
 * @param {Object} mitigations
 */
export default function renderMitigations(mitigations) {

    const container =
        document.getElementById("mitigations");

    // =====================================================
    // Validação do container
    // =====================================================

    if (!container) {

        console.error(
            "Container #mitigations não encontrado."
        );

        return;

    }

    // =====================================================
    // Validação dos dados
    // =====================================================

    if (!mitigations || !mitigations.primary) {

        container.innerHTML = `

            <div class="mitigations-card">

                <h2>
                    Mitigações
                </h2>

                <p>
                    Nenhuma mitigação disponível.
                </p>

            </div>

        `;

        return;

    }

    // =====================================================
    // Dados
    // =====================================================

    const primary =
        mitigations.primary;

    const secondary =
        Array.isArray(mitigations.secondary)
            ? mitigations.secondary
            : [];

    // =====================================================
    // Função auxiliar para renderizar ações
    // =====================================================

    function renderActions(actions) {

        if (!Array.isArray(actions) || actions.length === 0) {

            return `

                <p class="mitigation-empty">
                    Nenhuma ação disponível.
                </p>

            `;

        }

        return `

            <ul class="mitigation-actions-list">

                ${actions.map(action => `

                    <li>
                        ${action}
                    </li>

                `).join("")}

            </ul>

        `;

    }

    // =====================================================
    // Mitigações secundárias
    // =====================================================

    const secondaryHTML =
        secondary.length > 0

            ? secondary.map(item => `

                <article class="mitigation-secondary-item">

                    <div class="mitigation-title-row">

                        <span class="mitigation-code">
                            ${item.code ?? "N/D"}
                        </span>

                        <span class="mitigation-priority">
                            Prioridade:
                            <strong>
                                ${item.priority ?? "N/D"}
                            </strong>
                        </span>

                    </div>

                    <h3>
                        ${item.name ?? "Mitigação não identificada"}
                    </h3>

                    <p>
                        ${item.description ?? ""}
                    </p>

                    <div class="mitigation-meta">

                        <span>
                            Categoria:
                            <strong>
                                ${item.category ?? "N/D"}
                            </strong>
                        </span>

                    </div>

                    <div class="mitigation-actions">

                        <strong class="mitigation-actions-title">
                            Ações recomendadas
                        </strong>

                        ${renderActions(item.actions)}

                    </div>

                </article>

            `).join("")

            : `

                <p class="mitigation-empty">
                    Nenhuma mitigação secundária.
                </p>

            `;

    // =====================================================
    // Renderização
    // =====================================================

    container.innerHTML = `

        <div class="mitigations-card">

            <div class="mitigations-header">

                <h2>
                    Mitigações
                </h2>

            </div>


            <div class="mitigation-section">

                <h3 class="mitigation-section-title">
                    Mitigação Principal
                </h3>

                <article class="mitigation-primary">

                    <div class="mitigation-title-row">

                        <span class="mitigation-code">
                            ${primary.code ?? "N/D"}
                        </span>

                        <span class="mitigation-priority">
                            Prioridade:
                            <strong>
                                ${primary.priority ?? "N/D"}
                            </strong>
                        </span>

                    </div>

                    <h3>
                        ${primary.name ?? "Mitigação não identificada"}
                    </h3>

                    <p>
                        ${primary.description ?? ""}
                    </p>

                    <div class="mitigation-meta">

                        <span>
                            Categoria:
                            <strong>
                                ${primary.category ?? "N/D"}
                            </strong>
                        </span>

                    </div>

                    <div class="mitigation-actions">

                        <strong class="mitigation-actions-title">
                            Ações recomendadas
                        </strong>

                        ${renderActions(primary.actions)}

                    </div>

                </article>

            </div>


            <div class="mitigation-section">

                <h3 class="mitigation-section-title">
                    Mitigações Secundárias
                </h3>

                <div class="mitigation-secondary-list">

                    ${secondaryHTML}

                </div>

            </div>

        </div>

    `;

}