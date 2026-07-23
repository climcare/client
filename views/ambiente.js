/**
 * ======================================================================
 * CORE QAI
 * Reference Dashboard
 * ----------------------------------------------------------------------
 * Arquivo : views/ambiente.js
 * Função  : Composição da View Ambiente
 * Versão  : RC3.0
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
    analysis
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


    if (!analysis) {

        renderEmptyState(
            workspace
        );

        return;

    }


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
    // Renderização dos componentes RC2
    // ================================================================

    renderScore(
        analysis.metrics
    );

    renderEnvironment(
        analysis.environment
    );

    renderMetrics(
        analysis.metrics
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