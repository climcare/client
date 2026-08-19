/**
 * ======================================================================
 * CORE QAI
 * Reference Dashboard
 * ----------------------------------------------------------------------
 * Arquivo : app/app.js
 * Função  : Estado central da aplicação
 * Versão  : RC4.0
 * ======================================================================
 */


/**
 * Estado global do Reference Dashboard.
 *
 * O estado representa o payload completo recebido do MIQAI Server.
 *
 * Estrutura:
 *
 * data
 * ├── device
 * ├── telemetry
 * └── analysis
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

    data: null,

    currentView: "ambiente",


    // =====================================================
    // Data
    // =====================================================

    setData(data) {

        this.data =
            data;

    },


    getData() {

        return this.data;

    },


    // =====================================================
    // Current View
    // =====================================================

    setCurrentView(view) {

        this.currentView =
            view;

    },


    getCurrentView() {

        return this.currentView;

    }

};


// =========================================================
// Export
// =========================================================

export default App;