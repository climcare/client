/**
 * ======================================================================
 * CORE QAI
 * Reference Dashboard
 * ----------------------------------------------------------------------
 * Arquivo : script.js
 * Função  : Bootstrap e controle principal da aplicação
 * Versão  : RC3.0
 * ======================================================================
 */


// ======================================================================
// Application State
// ======================================================================

import App
    from "./app/app.js";


// ======================================================================
// Services
// ======================================================================

import { getLatestAnalysis }
    from "./services/api.js";


// ======================================================================
// Layout
// ======================================================================

import renderHeader
    from "./layout/header.js";

import renderNavbar
    from "./layout/navbar.js";

import renderWorkspace
    from "./layout/workspace.js";


// ======================================================================
// Bootstrap
// ======================================================================

document.addEventListener(
    "DOMContentLoaded",
    initialize
);


// ======================================================================
// Inicialização
// ======================================================================

async function initialize() {

    try {

        console.log(
            "CORE QAI Reference Dashboard RC3 iniciado."
        );


        // ==============================================================
        // Carrega análise
        // ==============================================================

        const analysis =
            await getLatestAnalysis();


        // ==============================================================
        // Estado
        // ==============================================================

        App.setAnalysis(
            analysis
        );


        // ==============================================================
        // Renderização inicial
        // ==============================================================

        renderApplication();


        console.log(
            "CORE QAI RC3 carregado.",
            App.getAnalysis()
        );

    }

    catch (error) {

        console.error(
            "Falha ao inicializar o CORE QAI Reference Dashboard.",
            error
        );

        renderFatalError();

    }

}


// ======================================================================
// Renderização da Aplicação
// ======================================================================

function renderApplication() {

    const analysis =
        App.getAnalysis();

    const currentView =
        App.getCurrentView();


    // ==============================================================
    // Containers permanentes
    // ==============================================================

    const headerContainer =
        document.getElementById(
            "header"
        );

    const navbarContainer =
        document.getElementById(
            "navbar"
        );


    // ==============================================================
    // Header
    // ==============================================================

    renderHeader(
        headerContainer,
        analysis
    );


    // ==============================================================
    // Navbar
    // ==============================================================

    renderNavbar(
        navbarContainer,
        currentView,
        handleNavigate
    );


    // ==============================================================
    // Workspace
    // ==============================================================

    renderWorkspace(
        currentView,
        analysis
    );

}


// ======================================================================
// Navegação
// ======================================================================

function handleNavigate(
    viewName
) {

    // ==============================================================
    // Evita navegação redundante
    // ==============================================================

    if (
        viewName ===
        App.getCurrentView()
    ) {

        return;

    }


    // ==============================================================
    // Atualiza estado
    // ==============================================================

    App.setCurrentView(
        viewName
    );


    // ==============================================================
    // Atualiza Navbar
    // ==============================================================

    const navbarContainer =
        document.getElementById(
            "navbar"
        );

    renderNavbar(
        navbarContainer,
        App.getCurrentView(),
        handleNavigate
    );


    // ==============================================================
    // Atualiza Workspace
    // ==============================================================

    renderWorkspace(
        App.getCurrentView(),
        App.getAnalysis()
    );

}


// ======================================================================
// Erro fatal
// ======================================================================

function renderFatalError() {

    const workspace =
        document.getElementById(
            "workspace"
        );

    if (!workspace) {

        return;

    }

    workspace.innerHTML = `

        <section class="workspace-message">

            <h1>
                Não foi possível carregar o Dashboard
            </h1>

            <p>
                O serviço de análise não respondeu corretamente.
            </p>

        </section>

    `;

}