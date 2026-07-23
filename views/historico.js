/**
 * ======================================================================
 * CORE QAI
 * Reference Dashboard
 * ----------------------------------------------------------------------
 * Arquivo : views/historico.js
 * Função  : Composição da View Histórico
 * Versão  : RC3.0
 * ======================================================================
 */


/**
 * Renderiza a View Histórico.
 *
 * IMPORTANTE:
 *
 * O histórico não é derivado artificialmente da resposta atual
 * do CORE QAI.
 *
 * A persistência e consulta temporal pertencem ao SaaS / Backend.
 *
 * Esta View estabelece apenas a estrutura destinada à futura
 * apresentação dos dados históricos.
 *
 * @param {HTMLElement} workspace
 * @param {Object} analysis
 */
export default function renderHistorico(
    workspace,
    analysis
) {

    // ================================================================
    // Validação do Workspace
    // ================================================================

    if (!workspace) {

        console.error(
            "Workspace não informado para a View Histórico."
        );

        return;

    }


    // ================================================================
    // Estrutura da View
    // ================================================================

    const view =
        document.createElement("div");

    view.className =
        "view view-historico";

    view.dataset.view =
        "historico";


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
                Histórico
            </h1>

            <p class="view-description">
                Evolução temporal das condições ambientais e análises
            </p>

        </div>

    `;


    // ================================================================
    // Conteúdo
    // ================================================================

    const historySection =
        document.createElement("section");

    historySection.id =
        "history";

    historySection.className =
        "view-section view-section-history";


    historySection.innerHTML = `

        <div class="workspace-message">

            <h2>
                Histórico Ambiental
            </h2>

            <p>
                Esta área será alimentada pelo histórico
                persistido pelo SaaS.
            </p>

            <p>
                A integração histórica não faz parte da resposta
                analítica atual do CORE QAI.
            </p>

        </div>

    `;


    // ================================================================
    // Montagem
    // ================================================================

    view.append(
        viewHeader,
        historySection
    );

    workspace.appendChild(
        view
    );

}