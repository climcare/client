/**
 * ======================================================================
 * CORE QAI
 * Reference Dashboard
 * ----------------------------------------------------------------------
 * Arquivo : layout/navbar.js
 * Função  : Navegação principal da aplicação
 * Versão  : RC3.0
 * ======================================================================
 */


/**
 * Views disponíveis na navegação principal.
 *
 * A definição centralizada evita duplicação entre
 * renderização e tratamento de eventos.
 */
const navigationItems = [

    {
        id: "ambiente",
        label: "Ambiente",
        icon: "⌂"
    },

    {
        id: "diagnostico",
        label: "Diagnóstico",
        icon: "◇"
    },

    {
        id: "evidencias",
        label: "Evidências",
        icon: "◎"
    },

    {
        id: "historico",
        label: "Histórico",
        icon: "▥"
    }

];


// ======================================================================
// Renderização
// ======================================================================

/**
 * Renderiza a navegação principal.
 *
 * @param {HTMLElement} container
 * @param {string} currentView
 * @param {Function} onNavigate
 */
export default function renderNavbar(
    container,
    currentView,
    onNavigate
) {

    // ================================================================
    // Validação
    // ================================================================

    if (!container) {

        console.error(
            "Container da Navbar não informado."
        );

        return;

    }


    if (typeof onNavigate !== "function") {

        console.error(
            "Callback de navegação não informado."
        );

        return;

    }


    // ================================================================
    // Renderização
    // ================================================================

    container.innerHTML = `

        <div class="app-navbar">

            <div
                class="app-navbar-items"
                role="navigation"
                aria-label="Navegação principal"
            >

                ${
                    navigationItems
                        .map(
                            item =>
                                createNavigationItem(
                                    item,
                                    currentView
                                )
                        )
                        .join("")
                }

            </div>

        </div>

    `;


    // ================================================================
    // Eventos
    // ================================================================

    container.onclick =
    handleNavigation;


    // ================================================================
    // Handler
    // ================================================================

    function handleNavigation(event) {

        const button =
            event.target.closest(
                "[data-view]"
            );

        if (
            !button ||
            !container.contains(button)
        ) {

            return;

        }

        const viewName =
            button.dataset.view;


        // Não executa navegação desnecessária
        if (
            viewName === currentView
        ) {

            return;

        }


        // Entrega a decisão ao bootstrap/controlador
        onNavigate(
            viewName
        );

    }

}


// ======================================================================
// Item de navegação
// ======================================================================

function createNavigationItem(
    item,
    currentView
) {

    const isActive =
        item.id === currentView;

    return `

        <button
            type="button"
            class="app-navbar-item${isActive ? " is-active" : ""}"
            data-view="${item.id}"
            aria-current="${isActive ? "page" : "false"}"
        >

            <span
                class="app-navbar-icon"
                aria-hidden="true"
            >
                ${item.icon}
            </span>

            <span class="app-navbar-label">
                ${item.label}
            </span>

        </button>

    `;

}