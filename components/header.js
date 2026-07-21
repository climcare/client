/**
 * ======================================================================
 * CORE QAI
 * Reference Dashboard
 * ----------------------------------------------------------------------
 * Arquivo : header.js
 * Componente : Header
 * Versão : RC2.1
 * ======================================================================
 */

export default function renderHeader(analysis) {

    const container =
        document.getElementById("header");

    if (!analysis) {

        container.innerHTML = `
            <h1>CORE QAI</h1>
            <p>Nenhuma análise disponível.</p>
        `;

        return;

    }

    const metadata =
        analysis.metadata;

    const origin =
        analysis.origin;

    container.innerHTML = `

        <div class="header">

            <div>

                <h1>CORE QAI</h1>

                <p>
                    Reference Dashboard
                </p>

            </div>

            <div class="header-info">

                <p>

                    <strong>Dispositivo:</strong>

                    ${origin.deviceId ?? "N/D"}

                </p>

                <p>

                    <strong>Domínio:</strong>

                    ${metadata.domain}

                </p>

                <p>

                    <strong>Atualização:</strong>

                    ${metadata.analysisTimestamp}

                </p>

                <p>

                    <strong>Status:</strong>

                    ${metadata.status}

                </p>

            </div>

        </div>

    `;

}