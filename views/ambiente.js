/**
 * ======================================================================
 * CORE QAI
 * Reference Dashboard
 * ----------------------------------------------------------------------
 * Arquivo : views/ambiente.js
 * Função  : Composição da View Ambiente
 * Versão  : RC4.0
 * ======================================================================
 */


// ======================================================================
// Componentes
// ======================================================================

import renderScore
    from "../components/score.js";

import renderEnvironment
    from "../components/environment.js";

import renderMetrics
    from "../components/metrics.js";


// ======================================================================
// View Ambiente
// ======================================================================

export default function renderAmbiente(
    workspace,
    data
) {

    // ================================================================
    // Validação
    // ================================================================

    if (!workspace) {

        console.error(
            "Workspace não informado para a View Ambiente."
        );

        return;

    }


    if (!data) {

        renderEmptyState(
            workspace
        );

        return;

    }


    // ================================================================
    // Estrutura do contrato
    // ================================================================

    const telemetry =
        data.telemetry ?? {};

    const analysis =
        data.analysis ?? {};

    const metrics =
        analysis.metrics ?? {};

    const validation =
        analysis.validation ?? {};


    // ================================================================
    // Estrutura da View
    // ================================================================

    const view =
        document.createElement("div");

    view.className =
        "view view-ambiente";

    view.dataset.view =
        "ambiente";


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
                Ambiente
            </h1>

            <p class="view-description">
                Condição atual e indicadores ambientais
            </p>

        </div>

    `;


    // ================================================================
    // Score
    // ================================================================

    const scoreSection =
        document.createElement("section");

    scoreSection.id =
        "score";

    scoreSection.className =
        "view-section view-section-score";


    // ================================================================
    // Environment
    // ================================================================

    const environmentSection =
        document.createElement("section");

    environmentSection.id =
        "environment";

    environmentSection.className =
        "view-section view-section-environment";


    // ================================================================
    // Metrics
    // ================================================================

    const metricsSection =
        document.createElement("section");

    metricsSection.id =
        "metrics";

    metricsSection.className =
        "view-section view-section-metrics";


    // ================================================================
    // Montagem
    // ================================================================

    view.append(
        viewHeader,
        scoreSection,
        environmentSection,
        metricsSection
    );

    workspace.appendChild(
        view
    );


    // ================================================================
    // Renderização
    // ================================================================

    /*
     * Score:
     * --------------------------------------------------------------
     * Recebe exclusivamente as métricas produzidas pelo CORE.
     */

    renderScore(
        metrics
    );


    /*
     * Environment:
     * --------------------------------------------------------------
     * Recebe a telemetria persistida pelo SaaS.
     *
     * A validação também é disponibilizada para que o componente
     * possa apresentar o estado produzido pelo CORE.
     *
     * O componente NÃO deve calcular esse estado.
     */

    renderEnvironment(
        telemetry,
        validation
    );


    /*
     * Metrics:
     * --------------------------------------------------------------
     * Recebe exclusivamente as métricas produzidas pelo CORE.
     */

    renderMetrics(
        metrics
    );

}


// ======================================================================
// Empty State
// ======================================================================

function renderEmptyState(
    workspace
) {

    const element =
        document.createElement("section");

    element.className =
        "workspace-message";

    element.innerHTML = `

        <h2>
            Ambiente
        </h2>

        <p>
            Nenhuma análise ambiental disponível.
        </p>

    `;

    workspace.appendChild(
        element
    );

}