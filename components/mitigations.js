/**
 * ======================================================================
 * CORE QAI
 * Reference Dashboard
 * ----------------------------------------------------------------------
 * Arquivo    : mitigations.js
 * Componente : Mitigações
 * Versão     : RC4.1
 * ======================================================================
 */

/**
 * Renderiza as mitigações produzidas pelo MIQAI_CORE.
 *
 * IMPORTANTE:
 * Este componente NÃO:
 *
 * - cria ações;
 * - define prioridades;
 * - seleciona mitigações;
 * - executa regras de negócio.
 *
 * Todas as informações apresentadas são provenientes diretamente
 * de analysis.mitigation.
 *
 * Contrato oficial:
 *
 * mitigation
 * ├── primary
 * │   ├── id
 * │   ├── name
 * │   ├── title
 * │   ├── description
 * │   ├── referenceIds[]
 * │   └── priority
 * │
 * ├── secondary[]
 * │
 * └── actions[]
 *
 * @param {Object} mitigation
 */

export default function renderMitigations(
    mitigation
) {

    const container =
        document.getElementById(
            "mitigations"
        );


    // ================================================================
    // Validação do container
    // ================================================================

    if (!container) {

        console.error(
            "Container #mitigations não encontrado."
        );

        return;

    }


    // ================================================================
    // Validação dos dados
    // ================================================================

    if (
        !mitigation ||
        !mitigation.primary
    ) {

        container.innerHTML = `

            <div class="mitigations-card">

                <div class="mitigations-header">

                    <div>

                        <h2>
                            Mitigações
                        </h2>

                        <p class="mitigations-subtitle">
                            Ações recomendadas pelo MIQAI_CORE
                        </p>

                    </div>

                </div>

                <p class="mitigation-empty">
                    Nenhuma mitigação disponível.
                </p>

            </div>

        `;

        return;

    }


    // ================================================================
    // Dados oficiais
    // ================================================================

    const primary =
        mitigation.primary;


    const secondary =
        Array.isArray(
            mitigation.secondary
        )
            ? mitigation.secondary
            : [];


    const actions =
        Array.isArray(
            mitigation.actions
        )
            ? mitigation.actions
            : [];


    // ================================================================
    // Referências
    // ================================================================

    function renderReferences(
        referenceIds
    ) {

        if (
            !Array.isArray(referenceIds) ||
            referenceIds.length === 0
        ) {

            return "";

        }


        return `

            <div class="mitigation-references">

                <span class="mitigation-references-label">
                    Referências
                </span>

                <div class="mitigation-reference-list">

                    ${
                        referenceIds
                            .map(
                                referenceId => `
                                    <span
                                        class="mitigation-reference"
                                    >
                                        ${escapeHTML(
                                            referenceId
                                        )}
                                    </span>
                                `
                            )
                            .join("")
                    }

                </div>

            </div>

        `;

    }


    // ================================================================
    // Renderização das ações oficiais
    // ================================================================

    function renderActions() {

        if (
            actions.length === 0
        ) {

            return `

                <p class="mitigation-empty">
                    Nenhuma ação disponível.
                </p>

            `;

        }


        return `

            <div class="mitigation-actions-list">

                ${
                    actions
                        .map(
                            action => `

                                <article
                                    class="mitigation-action-item"
                                    data-action-id="${escapeHTML(
                                        action.id ?? ""
                                    )}"
                                >

                                    <div
                                        class="mitigation-title-row"
                                    >

                                        <span
                                            class="mitigation-code"
                                        >
                                            ${escapeHTML(
                                                action.id ?? "N/D"
                                            )}
                                        </span>


                                        ${
                                            action.priority !== undefined
                                                ? `
                                                    <span
                                                        class="mitigation-priority"
                                                    >
                                                        Prioridade:
                                                        <strong>
                                                            ${escapeHTML(
                                                                action.priority
                                                            )}
                                                        </strong>
                                                    </span>
                                                `
                                                : ""
                                        }

                                    </div>


                                    <h4>
                                        ${escapeHTML(
                                            action.title ??
                                            action.name ??
                                            "Ação não identificada"
                                        )}
                                    </h4>


                                    ${
                                        action.name
                                            ? `
                                                <div
                                                    class="mitigation-meta"
                                                >

                                                    <span>
                                                        Identificador:
                                                        <strong>
                                                            ${escapeHTML(
                                                                action.name
                                                            )}
                                                        </strong>
                                                    </span>

                                                </div>
                                            `
                                            : ""
                                    }


                                    ${
                                        action.description
                                            ? `
                                                <p>
                                                    ${escapeHTML(
                                                        action.description
                                                    )}
                                                </p>
                                            `
                                            : ""
                                    }


                                    ${renderReferences(
                                        action.referenceIds
                                    )}

                                </article>

                            `
                        )
                        .join("")
                }

            </div>

        `;

    }


    // ================================================================
    // Mitigações secundárias
    // ================================================================

    const secondaryHTML =
        secondary.length > 0

            ? secondary
                .map(
                    item => `

                        <article
                            class="mitigation-secondary-item"
                            data-mitigation-id="${escapeHTML(
                                item.id ?? ""
                            )}"
                        >

                            <div
                                class="mitigation-title-row"
                            >

                                <span
                                    class="mitigation-code"
                                >
                                    ${escapeHTML(
                                        item.id ?? "N/D"
                                    )}
                                </span>


                                ${
                                    item.priority !== undefined
                                        ? `
                                            <span
                                                class="mitigation-priority"
                                            >
                                                Prioridade:
                                                <strong>
                                                    ${escapeHTML(
                                                        item.priority
                                                    )}
                                                </strong>
                                            </span>
                                        `
                                        : ""
                                }

                            </div>


                            <h3>
                                ${escapeHTML(
                                    item.title ??
                                    item.name ??
                                    "Mitigação não identificada"
                                )}
                            </h3>


                            ${
                                item.name
                                    ? `
                                        <div
                                            class="mitigation-meta"
                                        >

                                            <span>
                                                Identificador:
                                                <strong>
                                                    ${escapeHTML(
                                                        item.name
                                                    )}
                                                </strong>
                                            </span>

                                        </div>
                                    `
                                    : ""
                            }


                            ${
                                item.description
                                    ? `
                                        <p>
                                            ${escapeHTML(
                                                item.description
                                            )}
                                        </p>
                                    `
                                    : ""
                            }


                            ${renderReferences(
                                item.referenceIds
                            )}

                        </article>

                    `
                )
                .join("")

            : `

                <p class="mitigation-empty">
                    Nenhuma mitigação secundária.
                </p>

            `;


    // ================================================================
    // Renderização
    // ================================================================

    container.innerHTML = `

        <div class="mitigations-card">


            <!-- ==================================================== -->
            <!-- CABEÇALHO -->
            <!-- ==================================================== -->

            <div class="mitigations-header">

                <div>

                    <h2>
                        Mitigações
                    </h2>

                    <p class="mitigations-subtitle">
                        Ações recomendadas pelo MIQAI_CORE
                    </p>

                </div>

            </div>


            <!-- ==================================================== -->
            <!-- MITIGAÇÃO PRINCIPAL -->
            <!-- ==================================================== -->

            <div class="mitigation-section">

                <h3 class="mitigation-section-title">
                    Mitigação Principal
                </h3>


                <article
                    class="mitigation-primary"
                    data-mitigation-id="${escapeHTML(
                        primary.id ?? ""
                    )}"
                >

                    <div
                        class="mitigation-title-row"
                    >

                        <span
                            class="mitigation-code"
                        >
                            ${escapeHTML(
                                primary.id ?? "N/D"
                            )}
                        </span>


                        ${
                            primary.priority !== undefined
                                ? `
                                    <span
                                        class="mitigation-priority"
                                    >
                                        Prioridade:
                                        <strong>
                                            ${escapeHTML(
                                                primary.priority
                                            )}
                                        </strong>
                                    </span>
                                `
                                : ""
                        }

                    </div>


                    <h3>
                        ${escapeHTML(
                            primary.title ??
                            primary.name ??
                            "Mitigação não identificada"
                        )}
                    </h3>


                    ${
                        primary.name
                            ? `
                                <div
                                    class="mitigation-meta"
                                >

                                    <span>
                                        Identificador:
                                        <strong>
                                            ${escapeHTML(
                                                primary.name
                                            )}
                                        </strong>
                                    </span>

                                </div>
                            `
                            : ""
                    }


                    ${
                        primary.description
                            ? `
                                <p>
                                    ${escapeHTML(
                                        primary.description
                                    )}
                                </p>
                            `
                            : ""
                    }


                    ${renderReferences(
                        primary.referenceIds
                    )}

                </article>

            </div>


            <!-- ==================================================== -->
            <!-- AÇÕES -->
            <!-- ==================================================== -->

            <div class="mitigation-section">

                <h3 class="mitigation-section-title">
                    Ações Recomendadas
                </h3>


                ${renderActions()}

            </div>


            <!-- ==================================================== -->
            <!-- MITIGAÇÕES SECUNDÁRIAS -->
            <!-- ==================================================== -->

            <div class="mitigation-section">

                <h3 class="mitigation-section-title">
                    Mitigações Secundárias
                </h3>


                <div
                    class="mitigation-secondary-list"
                >

                    ${secondaryHTML}

                </div>

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