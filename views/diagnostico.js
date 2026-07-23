/**
 * ======================================================================
 * CORE QAI
 * Reference Dashboard
 * ----------------------------------------------------------------------
 * Arquivo : views/diagnostico.js
 * Função  : Composição da View Diagnóstico
 * Versão  : RC3.0
 * ======================================================================
 */


// ======================================================================
// Componentes
// ======================================================================

import renderDiagnostics
    from "../components/diagnostics.js";

import renderHypotheses
    from "../components/hypotheses.js";

import renderMitigations
    from "../components/mitigations.js";


// ======================================================================
// View Diagnóstico
// ======================================================================

export default function renderDiagnostico(
    workspace,
    analysis
) {

    // ================================================================
    // Validação
    // ================================================================

    if (!workspace) {

        console.error(
            "Workspace não informado para a View Diagnóstico."
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
        "view view-diagnostico";

    view.dataset.view =
        "diagnostico";


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
                Diagnóstico
            </h1>

            <p class="view-description">
                Interpretação, hipóteses e ações recomendadas
            </p>

        </div>

    `;


    // ================================================================
    // Diagnostics
    // ================================================================

    const diagnosticsSection =
        document.createElement("section");

    diagnosticsSection.id =
        "diagnostics";

    diagnosticsSection.className =
        "view-section view-section-diagnostics";


    // ================================================================
    // Hypotheses
    // ================================================================

    const hypothesesSection =
        document.createElement("section");

    hypothesesSection.id =
        "hypotheses";

    hypothesesSection.className =
        "view-section view-section-hypotheses";


    // ================================================================
    // Mitigations
    // ================================================================

    const mitigationsSection =
        document.createElement("section");

    mitigationsSection.id =
        "mitigations";

    mitigationsSection.className =
        "view-section view-section-mitigations";


    // ================================================================
    // Montagem
    // ================================================================

    view.append(
        viewHeader,
        diagnosticsSection,
        hypothesesSection,
        mitigationsSection
    );

    workspace.appendChild(
        view
    );


    // ================================================================
    // Renderização dos componentes RC2
    // ================================================================

    renderDiagnostics(
        analysis.diagnostics
    );

    renderHypotheses(
        analysis.hypotheses
    );

    renderMitigations(
        analysis.mitigations
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
            Diagnóstico
        </h2>

        <p>
            Nenhuma análise diagnóstica disponível.
        </p>

    `;

    workspace.appendChild(
        element
    );

}