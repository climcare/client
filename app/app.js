/**
 * ======================================================================
 * CORE QAI
 * Reference Dashboard
 * ----------------------------------------------------------------------
 * Arquivo : app/app.js
 * Função  : Estado central da aplicação
 * Versão  : RC3.0
 * ======================================================================
 */


/**
 * Estado global do Reference Dashboard.
 *
 * Responsabilidades:
 *
 * - armazenar a análise recebida da API;
 * - armazenar a View atualmente ativa;
 * - fornecer acesso controlado ao estado da aplicação.
 *
 * Este módulo NÃO:
 *
 * - consulta a API;
 * - renderiza componentes;
 * - executa lógica analítica;
 * - modifica resultados produzidos pelo CORE QAI.
 */

const App = {

    // =====================================================
    // Estado
    // =====================================================

    analysis: null,

    currentView: "ambiente",


    // =====================================================
    // Analysis
    // =====================================================

    setAnalysis(analysis) {

        this.analysis = analysis;

    },


    getAnalysis() {

        return this.analysis;

    },


    // =====================================================
    // Current View
    // =====================================================

    setCurrentView(view) {

        this.currentView = view;

    },


    getCurrentView() {

        return this.currentView;

    }

};


// =========================================================
// Export
// =========================================================

export default App;