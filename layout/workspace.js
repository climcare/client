/**
 * ======================================================================
 * CORE QAI
 * Reference Dashboard
 * ----------------------------------------------------------------------
 * Arquivo : layout/workspace.js
 * Função  : Controlador da área dinâmica da aplicação
 * Versão  : RC3.0
 * ======================================================================
 */


// ======================================================================
// Views
// ======================================================================

import renderAmbiente
    from "../views/ambiente.js";

import renderDiagnostico
    from "../views/diagnostico.js";

import renderEvidencias
    from "../views/evidencias.js";

import renderHistorico
    from "../views/historico.js";


// ======================================================================
// Registro de Views
// ======================================================================

const views = {

    ambiente: renderAmbiente,

    diagnostico: renderDiagnostico,

    evidencias: renderEvidencias,

    historico: renderHistorico

};


// ======================================================================
// Renderização do Workspace
// ======================================================================

export default function renderWorkspace(
    viewName,
    analysis
) {

    const workspace =
        document.getElementById("workspace");

    // ================================================================
    // Validação do container
    // ================================================================

    if (!workspace) {

        console.error(
            "Container #workspace não encontrado."
        );

        return;

    }


    // ================================================================
    // Localização da View
    // ================================================================

    const renderView =
        views[viewName];

    if (!renderView) {

        console.error(
            `View "${viewName}" não registrada.`
        );

        renderWorkspaceError(
            workspace,
            "Área não disponível."
        );

        return;

    }


    // ================================================================
    // Limpeza da View anterior
    // ================================================================

    workspace.replaceChildren();


    // ================================================================
    // Renderização da View ativa
    // ================================================================

    try {

        renderView(
            workspace,
            analysis
        );

    }

    catch (error) {

        console.error(
            `Erro ao renderizar a View "${viewName}".`,
            error
        );

        renderWorkspaceError(
            workspace,
            "Não foi possível carregar esta área."
        );

    }

}


// ======================================================================
// Estado de erro
// ======================================================================

function renderWorkspaceError(
    workspace,
    message
) {

    const element =
        document.createElement("section");

    element.className =
        "workspace-message";

    element.textContent =
        message;

    workspace.replaceChildren(
        element
    );

}