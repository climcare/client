/**
 * ======================================================================
 * CORE QAI
 * Reference Dashboard
 * ----------------------------------------------------------------------
 * Arquivo : script.js
 * Função  : Bootstrap da aplicação
 * Versão  : RC2.1
 * ======================================================================
 */


import { getLatestAnalysis }
    from "./services/api.js";

import renderHeader
    from "./components/header.js";

import renderScore
    from "./components/score.js";

import renderDiagnostics
    from "./components/diagnostics.js";    


// =====================================================
// Estado Global da Aplicação
// =====================================================

const App = {

    analysis: null

};

// =====================================================
// Inicialização
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    initialize
);

// =====================================================
// Bootstrap
// =====================================================

async function initialize() {

    try {

        console.log(
            "CORE QAI Dashboard iniciado."
        );

        // =============================================
        // Busca análise
        // =============================================

        App.analysis =
            await getLatestAnalysis();

        console.log(
            App.analysis
        );

        // =============================================
        // Renderiza componentes
        // =============================================

        render();

    }

    catch (error) {

        console.error(error);

    }

}

// =====================================================
// Renderização Geral
// =====================================================

function render() {

    renderHeader(
        App.analysis
    );

    renderScore(
        App.analysis.metrics
    );

    renderDiagnostics(
    App.analysis.diagnostics
);

}