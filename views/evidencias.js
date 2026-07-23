/**
 * ======================================================================
 * CORE QAI
 * Reference Dashboard
 * ----------------------------------------------------------------------
 * Arquivo : views/evidencias.js
 * Função  : Composição da View Evidências
 * Versão  : RC3.0
 * ======================================================================
 */


/**
 * Renderiza a View Evidências.
 *
 * Nesta fase estrutural, a View apenas estabelece
 * o espaço destinado à futura representação das
 * evidências produzidas pelo CORE QAI.
 *
 * A representação definitiva de evidences.records
 * será implementada em componente próprio.
 *
 * @param {HTMLElement} workspace
 * @param {Object} analysis
 */
export default function renderEvidencias(
    workspace,
    analysis
) {

    // ================================================================
    // Validação do Workspace
    // ================================================================

    if (!workspace) {

        console.error(
            "Workspace não informado para a View Evidências."
        );

        return;

    }


    // ================================================================
    // Estrutura da View
    // ================================================================

    const view =
        document.createElement("div");

    view.className =
        "view view-evidencias";

    view.dataset.view =
        "evidencias";


    // ================================================================
    // Header da View
    // ================================================================

    const viewHeader =
        document.createElement("div");

    viewHeader.className =
        "view-header";

    viewHeader.innerHTML = `

        <div>

            <h1 class="view-title">
                Evidências
            </h1>

            <p class="view-description">
                Elementos que sustentam a análise produzida pelo CORE QAI
            </p>

        </div>

    `;


    // ================================================================
    // Conteúdo
    // ================================================================

    const evidenceSection =
        document.createElement("section");

    evidenceSection.id =
        "evidences";

    evidenceSection.className =
        "view-section view-section-evidences";


    // ================================================================
    // Verificação dos dados
    // ================================================================

    const records =
        analysis?.evidences?.records;

    const recordCount =
        Array.isArray(records)
            ? records.length
            : 0;


    // ================================================================
    // Estado provisório
    // ================================================================

    evidenceSection.innerHTML = `

        <div class="workspace-message">

            <h2>
                Evidências da Análise
            </h2>

            <p>
                ${
                    recordCount > 0
                        ? `${recordCount} evidência(s) disponível(is) para apresentação.`
                        : "Nenhuma evidência disponível para esta análise."
                }
            </p>

            ${
                recordCount > 0
                    ? `
                        <p>
                            A representação detalhada será implementada
                            pelo componente de Evidências.
                        </p>
                    `
                    : ""
            }

        </div>

    `;


    // ================================================================
    // Montagem
    // ================================================================

    view.append(
        viewHeader,
        evidenceSection
    );

    workspace.appendChild(
        view
    );

}