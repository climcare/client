/**
 * ======================================================================
 * CORE QAI
 * Reference Dashboard
 * ----------------------------------------------------------------------
 * Arquivo    : components/diagnostics.js
 * Componente : Diagnósticos
 * Versão     : RC4.1
 * ======================================================================
 */

/**
 * Renderiza os diagnósticos produzidos pelo MIQAI_CORE.
 *
 * IMPORTANTE:
 * Este componente NÃO:
 *
 * - executa diagnóstico;
 * - calcula prioridade;
 * - classifica severidade;
 * - cria hipóteses;
 * - interpreta evidências.
 *
 * Todas as informações apresentadas são provenientes diretamente
 * de analysis.diagnosis.
 *
 * Contrato atual:
 *
 * diagnosis
 * ├── primary
 * │   ├── id
 * │   ├── name
 * │   └── priority
 * │
 * ├── secondary[]
 * │   ├── id
 * │   ├── name
 * │   ├── title       (quando disponível)
 * │   ├── description (quando disponível)
 * │   └── priority
 * │
 * └── matches[]
 *
 * @param {Object} diagnosis
 */

export default function renderDiagnostics(
    diagnosis
) {

    const container =
        document.getElementById(
            "diagnostics"
        );


    // ================================================================
    // Validação do container
    // ================================================================

    if (!container) {

        console.error(
            "Container #diagnostics não encontrado."
        );

        return;

    }


    // ================================================================
    // Validação dos dados
    // ================================================================

    if (
        !diagnosis ||
        !diagnosis.primary
    ) {

        container.innerHTML = `

            <div class="diagnostics-card">

                <div class="diagnostics-header">

                    <div>

                        <h2>
                            Diagnósticos
                        </h2>

                        <p class="diagnostics-subtitle">
                            Diagnósticos produzidos pelo MIQAI_CORE
                        </p>

                    </div>

                </div>

                <p class="diagnostic-empty">
                    Nenhum diagnóstico disponível.
                </p>

            </div>

        `;

        return;

    }


    // ================================================================
    // Dados oficiais
    // ================================================================

    const primary =
        diagnosis.primary;


    const secondary =
        Array.isArray(
            diagnosis.secondary
        )
            ? diagnosis.secondary
            : [];


    // ================================================================
    // Diagnóstico principal
    // ================================================================

    const primaryId =
        primary.id ??
        null;


    const primaryName =
        primary.name ??
        "Diagnóstico não identificado";


    const primaryPriority =
        primary.priority ??
        null;


    // ================================================================
    // Diagnósticos secundários
    // ================================================================

    const secondaryHTML =
        secondary.length > 0

            ? secondary
                .map(
                    item => {

                        const id =
                            item.id ??
                            null;

                        const name =
                            item.name ??
                            null;

                        const title =
                            item.title ??
                            name ??
                            "Diagnóstico não identificado";

                        const description =
                            item.description ??
                            null;

                        const priority =
                            item.priority ??
                            null;


                        return `

                            <article
                                class="diagnostic-secondary-item"
                                data-diagnostic-id="${escapeHTML(id ?? "")}"
                            >

                                <div
                                    class="diagnostic-title-row"
                                >

                                    <span
                                        class="diagnostic-code"
                                    >
                                        ${escapeHTML(id ?? "N/D")}
                                    </span>


                                    ${
                                        priority !== null
                                            ? `
                                                <span
                                                    class="diagnostic-priority"
                                                >
                                                    Prioridade:
                                                    <strong>
                                                        ${escapeHTML(priority)}
                                                    </strong>
                                                </span>
                                            `
                                            : ""
                                    }

                                </div>


                                <h3>
                                    ${escapeHTML(title)}
                                </h3>


                                ${
                                    description
                                        ? `
                                            <p>
                                                ${escapeHTML(description)}
                                            </p>
                                        `
                                        : ""
                                }


                                ${
                                    name && name !== title
                                        ? `
                                            <div
                                                class="diagnostic-meta"
                                            >

                                                <span>
                                                    Identificador:
                                                    <strong>
                                                        ${escapeHTML(name)}
                                                    </strong>
                                                </span>

                                            </div>
                                        `
                                        : ""
                                }

                            </article>

                        `;

                    }
                )
                .join("")

            : `

                <p class="diagnostic-empty">
                    Nenhum diagnóstico secundário.
                </p>

            `;


    // ================================================================
    // Renderização
    // ================================================================

    container.innerHTML = `

        <div class="diagnostics-card">


            <!-- ==================================================== -->
            <!-- CABEÇALHO -->
            <!-- ==================================================== -->

            <div class="diagnostics-header">

                <div>

                    <h2>
                        Diagnósticos
                    </h2>

                    <p class="diagnostics-subtitle">
                        Diagnósticos produzidos pelo MIQAI_CORE
                    </p>

                </div>

            </div>


            <!-- ==================================================== -->
            <!-- DIAGNÓSTICO PRINCIPAL -->
            <!-- ==================================================== -->

            <div class="diagnostic-section">

                <h3 class="diagnostic-section-title">
                    Diagnóstico Principal
                </h3>


                <article
                    class="diagnostic-primary"
                    data-diagnostic-id="${escapeHTML(primaryId ?? "")}"
                >

                    <div
                        class="diagnostic-title-row"
                    >

                        <span
                            class="diagnostic-code"
                        >
                            ${escapeHTML(primaryId ?? "N/D")}
                        </span>


                        ${
                            primaryPriority !== null
                                ? `
                                    <span
                                        class="diagnostic-priority"
                                    >
                                        Prioridade:
                                        <strong>
                                            ${escapeHTML(primaryPriority)}
                                        </strong>
                                    </span>
                                `
                                : ""
                        }

                    </div>


                    <h3>
                        ${escapeHTML(primaryName)}
                    </h3>


                    <div class="diagnostic-meta">

                        <span>
                            Identificador:
                            <strong>
                                ${escapeHTML(primaryId ?? "N/D")}
                            </strong>
                        </span>

                    </div>

                </article>

            </div>


            <!-- ==================================================== -->
            <!-- DIAGNÓSTICOS SECUNDÁRIOS -->
            <!-- ==================================================== -->

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