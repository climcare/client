/**
 * ======================================================================
 * CORE QAI
 * Reference Dashboard
 * ----------------------------------------------------------------------
 * Arquivo    : hypotheses.js
 * Componente : Hipóteses
 * Versão     : RC4.1
 * ======================================================================
 */

/**
 * Renderiza as hipóteses produzidas pelo MIQAI_CORE.
 *
 * IMPORTANTE:
 * Este componente NÃO:
 *
 * - gera hipóteses;
 * - calcula confiança;
 * - define prioridade;
 * - relaciona evidências;
 * - interpreta referências.
 *
 * Todas as informações apresentadas são provenientes diretamente
 * de analysis.hypotheses.
 *
 * Contrato oficial:
 *
 * hypotheses
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
 * └── matches[]
 *
 * @param {Object} hypotheses
 */

export default function renderHypotheses(
    hypotheses
) {

    const container =
        document.getElementById(
            "hypotheses"
        );


    // ================================================================
    // Validação do container
    // ================================================================

    if (!container) {

        console.error(
            "Container #hypotheses não encontrado."
        );

        return;

    }


    // ================================================================
    // Validação dos dados
    // ================================================================

    if (
        !hypotheses ||
        !hypotheses.primary
    ) {

        container.innerHTML = `

            <div class="hypotheses-card">

                <div class="hypotheses-header">

                    <div>

                        <h2>
                            Hipóteses
                        </h2>

                        <p class="hypotheses-subtitle">
                            Hipóteses produzidas pelo MIQAI_CORE
                        </p>

                    </div>

                </div>

                <p class="hypothesis-empty">
                    Nenhuma hipótese disponível.
                </p>

            </div>

        `;

        return;

    }


    // ================================================================
    // Dados oficiais
    // ================================================================

    const primary =
        hypotheses.primary;


    const secondary =
        Array.isArray(
            hypotheses.secondary
        )
            ? hypotheses.secondary
            : [];


    // ================================================================
    // Renderização das referências
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

            <div class="hypothesis-references">

                <span class="hypothesis-references-label">
                    Referências
                </span>

                <div class="hypothesis-reference-list">

                    ${
                        referenceIds
                            .map(
                                referenceId => `
                                    <span
                                        class="hypothesis-reference"
                                    >
                                        ${escapeHTML(referenceId)}
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
    // Hipótese secundária
    // ================================================================

    const secondaryHTML =
        secondary.length > 0

            ? secondary
                .map(
                    item => `

                        <article
                            class="hypothesis-secondary-item"
                            data-hypothesis-id="${escapeHTML(
                                item.id ?? ""
                            )}"
                        >

                            <div
                                class="hypothesis-title-row"
                            >

                                <span
                                    class="hypothesis-code"
                                >
                                    ${escapeHTML(
                                        item.id ?? "N/D"
                                    )}
                                </span>


                                ${
                                    item.priority !== undefined
                                        ? `
                                            <span
                                                class="hypothesis-priority"
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
                                    "Hipótese não identificada"
                                )}
                            </h3>


                            ${
                                item.name
                                    ? `
                                        <div
                                            class="hypothesis-meta"
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

                <p class="hypothesis-empty">
                    Nenhuma hipótese secundária.
                </p>

            `;


    // ================================================================
    // Renderização principal
    // ================================================================

    container.innerHTML = `

        <div class="hypotheses-card">


            <!-- ==================================================== -->
            <!-- CABEÇALHO -->
            <!-- ==================================================== -->

            <div class="hypotheses-header">

                <div>

                    <h2>
                        Hipóteses
                    </h2>

                    <p class="hypotheses-subtitle">
                        Hipóteses produzidas pelo MIQAI_CORE
                    </p>

                </div>

            </div>


            <!-- ==================================================== -->
            <!-- HIPÓTESE PRINCIPAL -->
            <!-- ==================================================== -->

            <div class="hypothesis-section">

                <h3 class="hypothesis-section-title">
                    Hipótese Principal
                </h3>


                <article
                    class="hypothesis-primary"
                    data-hypothesis-id="${escapeHTML(
                        primary.id ?? ""
                    )}"
                >

                    <div
                        class="hypothesis-title-row"
                    >

                        <span
                            class="hypothesis-code"
                        >
                            ${escapeHTML(
                                primary.id ?? "N/D"
                            )}
                        </span>


                        ${
                            primary.priority !== undefined
                                ? `
                                    <span
                                        class="hypothesis-priority"
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
                            "Hipótese não identificada"
                        )}
                    </h3>


                    ${
                        primary.name
                            ? `
                                <div
                                    class="hypothesis-meta"
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
            <!-- HIPÓTESES SECUNDÁRIAS -->
            <!-- ==================================================== -->

            <div class="hypothesis-section">

                <h3 class="hypothesis-section-title">
                    Hipóteses Secundárias
                </h3>


                <div
                    class="hypothesis-secondary-list"
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