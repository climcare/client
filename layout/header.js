/**
 * ======================================================================
 * CORE QAI
 * Reference Dashboard
 * ----------------------------------------------------------------------
 * Arquivo : layout/header.js
 * Função  : Header operacional permanente da aplicação
 * Versão  : RC4.0
 * ======================================================================
 */


/**
 * Renderiza o Header operacional.
 *
 * O Header apresenta apenas informações fornecidas
 * pelo contrato JSON do MIQAI Server.
 *
 * IMPORTANTE:
 *
 * - não executa lógica analítica;
 * - não interpreta resultados do CORE;
 * - não controla Views;
 * - não realiza chamadas à API.
 *
 * @param {HTMLElement} container
 * @param {Object} data
 */

export default function renderHeader(
    container,
    data
) {

    // ================================================================
    // Validação
    // ================================================================

    if (!container) {

        console.error(
            "Container do Header não informado."
        );

        return;

    }


    // ================================================================
    // Estrutura do contrato
    // ================================================================

    const device =
        data?.device ?? {};

    const telemetry =
        data?.telemetry ?? {};

    const analysis =
        data?.analysis ?? {};

    const metadata =
        analysis?.metadata ?? {};

    const domain =
        analysis?.domain ?? {};


    // ================================================================
    // Identificação
    // ================================================================

    const deviceId =
        device.deviceId ??
        "Dispositivo não identificado";


    // ================================================================
    // Domain
    // ================================================================

    const domainName =
        domain.name ??
        metadata.environment ??
        "N/D";


    // ================================================================
    // Status
    // ================================================================

    const status =
        metadata.status ??
        "N/D";


    // ================================================================
    // Timestamp
    // ================================================================

    const timestamp =
        formatTimestamp(
            telemetry.timestamp ??
            metadata.timestamp
        );


    // ================================================================
    // Renderização
    // ================================================================

    container.innerHTML = `

        <div class="app-header">

            <!-- ================================================== -->
            <!-- IDENTIDADE -->
            <!-- ================================================== -->

            <div class="app-header-brand">

                <div
                    class="app-brand-mark"
                    aria-hidden="true"
                >
                    Q
                </div>

                <div class="app-brand-content">

                    <strong class="app-brand-name">
                        MONITOR IAQ
                    </strong>

                    <span class="app-brand-description">
                        Monitoramento Inteligente da Qualidade do Ar
                    </span>

                </div>

            </div>


            <!-- ================================================== -->
            <!-- CONTEXTO -->
            <!-- ================================================== -->

            <div class="app-header-context">

                <div class="header-context-item">

                    <span class="header-context-label">
                        Dispositivo
                    </span>

                    <strong class="header-context-value">
                        ${escapeHTML(deviceId)}
                    </strong>

                </div>


                <div class="header-context-item">

                    <span class="header-context-label">
                        Domínio
                    </span>

                    <strong class="header-context-value">
                        ${escapeHTML(domainName)}
                    </strong>

                </div>

            </div>


            <!-- ================================================== -->
            <!-- STATUS -->
            <!-- ================================================== -->

            <div class="app-header-status">

                <div class="header-status-online">

                    <span
                        class="status-indicator"
                        aria-hidden="true"
                    ></span>

                    <span>
                        ${escapeHTML(status)}
                    </span>

                </div>


                <div class="header-last-update">

                    <span class="header-context-label">
                        Última atualização
                    </span>

                    <strong class="header-context-value">
                        ${timestamp}
                    </strong>

                </div>

            </div>


            <!-- ================================================== -->
            <!-- AÇÕES -->
            <!-- ================================================== -->

            <div
                class="app-header-actions"
                aria-label="Ações da aplicação"
            >

                <button
                    type="button"
                    class="header-action"
                    data-action="theme"
                    title="Tema"
                    aria-label="Alterar tema"
                >
                    <span aria-hidden="true">
                        ◐
                    </span>

                    <span class="header-action-label">
                        Tema
                    </span>
                </button>


                <button
                    type="button"
                    class="header-action"
                    data-action="alerts"
                    title="Alertas"
                    aria-label="Visualizar alertas"
                >
                    <span aria-hidden="true">
                        ◉
                    </span>

                    <span class="header-action-label">
                        Alertas
                    </span>
                </button>


                <button
                    type="button"
                    class="header-action"
                    data-action="export"
                    title="Exportar"
                    aria-label="Exportar informações"
                >
                    <span aria-hidden="true">
                        ⇩
                    </span>

                    <span class="header-action-label">
                        Exportar
                    </span>
                </button>

            </div>

        </div>

    `;

}


// ======================================================================
// Timestamp
// ======================================================================

function formatTimestamp(
    value
) {

    if (!value) {

        return "N/D";

    }


    const date =
        new Date(value);


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return "N/D";

    }


    return new Intl.DateTimeFormat(
        "pt-BR",
        {
            dateStyle: "short",
            timeStyle: "short"
        }
    ).format(date);

}


// ======================================================================
// Segurança básica de saída
// ======================================================================

function escapeHTML(
    value
) {

    return String(value)

        .replaceAll(
            "&",
            "&amp;"
        )

        .replaceAll(
            "<",
            "&lt;"
        )

        .replaceAll(
            ">",
            "&gt;"
        )

        .replaceAll(
            '"',
            "&quot;"
        )

        .replaceAll(
            "'",
            "&#039;"
        );

}