/**
 * ======================================================================
 * CORE QAI
 * Reference Dashboard
 * ----------------------------------------------------------------------
 * Arquivo : environment.js
 * Função  : Renderização da telemetria ambiental recebida do Server
 * Versão  : RC4.0
 * ======================================================================
 */

/**
 * Renderiza exclusivamente os valores de telemetria recebidos
 * pelo contrato oficial do MIQAI Server.
 *
 * Este componente NÃO:
 *
 * - calcula métricas;
 * - classifica parâmetros;
 * - interpreta Domains;
 * - aplica limites;
 * - produz diagnóstico;
 * - executa regras de negócio.
 *
 * A telemetria é apenas apresentada.
 *
 * @param {Object} telemetry
 */
export default function renderEnvironment(
    telemetry
) {

    const container =
        document.getElementById(
            "environment"
        );


    // ==================================================================
    // Validação do container
    // ==================================================================

    if (!container) {

        console.warn(
            "Container #environment não encontrado."
        );

        return;

    }


    // ==================================================================
    // Validação da telemetria
    // ==================================================================

    if (!telemetry) {

        container.innerHTML = `

            <div class="component-card">

                <h2>
                    Leituras Ambientais
                </h2>

                <p class="empty-state">
                    Dados ambientais indisponíveis.
                </p>

            </div>

        `;

        return;

    }


    // ==================================================================
    // Estrutura visual
    // ==================================================================

    container.innerHTML = `

        <div class="component-card">

            <div class="component-header">

                <div>

                    <h2>
                        Leituras Ambientais
                    </h2>

                    <p class="component-subtitle">
                        Telemetria recebida do dispositivo
                    </p>

                </div>

            </div>


            <!-- ====================================================== -->
            <!-- PARÂMETROS PRINCIPAIS -->
            <!-- ====================================================== -->

            <div class="section-block">

                <h3 class="section-title">
                    PARÂMETROS PRINCIPAIS
                </h3>

                <div class="environment-grid">

                    ${createMetric(
                        "Temperatura",
                        telemetry.temperature,
                        "°C"
                    )}

                    ${createMetric(
                        "Umidade",
                        telemetry.humidity,
                        "%"
                    )}

                    ${createMetric(
                        "CO₂",
                        telemetry.co2,
                        "ppm"
                    )}

                </div>

            </div>


            <!-- ====================================================== -->
            <!-- MATERIAL PARTICULADO -->
            <!-- ====================================================== -->

            <div class="section-block">

                <h3 class="section-title">
                    MATERIAL PARTICULADO
                </h3>

                <div class="environment-grid">

                    ${createMetric(
                        "PM1",
                        telemetry.pm1_0,
                        "µg/m³"
                    )}

                    ${createMetric(
                        "PM2.5",
                        telemetry.pm25,
                        "µg/m³"
                    )}

                    ${createMetric(
                        "PM4",
                        telemetry.pm4_0,
                        "µg/m³"
                    )}

                    ${createMetric(
                        "PM10",
                        telemetry.pm10,
                        "µg/m³"
                    )}

                </div>

            </div>


            <!-- ====================================================== -->
            <!-- ÍNDICES DE GASES -->
            <!-- ====================================================== -->

            <div class="section-block">

                <h3 class="section-title">
                    ÍNDICES DE GASES
                </h3>

                <div class="environment-grid">

                    ${createMetric(
                        "VOC Index",
                        telemetry.vocIndex,
                        ""
                    )}

                    ${createMetric(
                        "NOx Index",
                        telemetry.noxIndex,
                        ""
                    )}

                </div>

            </div>


            <!-- ====================================================== -->
            <!-- DISTRIBUIÇÃO DE PARTÍCULAS -->
            <!-- ====================================================== -->

            <div class="section-block">

                <h3 class="section-title">
                    DISTRIBUIÇÃO DE PARTÍCULAS
                </h3>

                <div class="environment-grid">

                    ${createMetric(
                        "NC0.5",
                        telemetry.nc0_5,
                        "#/cm³"
                    )}

                    ${createMetric(
                        "NC1.0",
                        telemetry.nc1_0,
                        "#/cm³"
                    )}

                    ${createMetric(
                        "NC2.5",
                        telemetry.nc2_5,
                        "#/cm³"
                    )}

                    ${createMetric(
                        "NC4.0",
                        telemetry.nc4_0,
                        "#/cm³"
                    )}

                    ${createMetric(
                        "NC10",
                        telemetry.nc10_0,
                        "#/cm³"
                    )}

                </div>

            </div>


            <!-- ====================================================== -->
            <!-- CARACTERÍSTICA DAS PARTÍCULAS -->
            <!-- ====================================================== -->

            <div class="section-block">

                <h3 class="section-title">
                    CARACTERÍSTICA DAS PARTÍCULAS
                </h3>

                <div class="environment-grid">

                    ${createMetric(
                        "Tamanho Típico",
                        telemetry.typicalSize,
                        "µm"
                    )}

                </div>

            </div>


            <!-- ====================================================== -->
            <!-- SINAL -->
            <!-- ====================================================== -->

            <div class="section-block">

                <h3 class="section-title">
                    CONECTIVIDADE
                </h3>

                <div class="environment-grid">

                    ${createMetric(
                        "Sinal",
                        telemetry.signalStrength,
                        "dBm"
                    )}

                </div>

            </div>


            <!-- ====================================================== -->
            <!-- TIMESTAMP -->
            <!-- ====================================================== -->

            <div class="telemetry-timestamp">

                Última leitura:
                ${formatTimestamp(telemetry.timestamp)}

            </div>

        </div>

    `;

}


// ======================================================================
// Metric Card
// ======================================================================

function createMetric(
    label,
    value,
    unit
) {

    const displayValue =
        formatValue(value);


    return `

        <div class="environment-item">

            <span class="environment-label">
                ${label}
            </span>

            <div class="environment-value">

                ${displayValue}

                ${
                    unit
                        ? `<span class="environment-unit">${unit}</span>`
                        : ""
                }

            </div>

        </div>

    `;

}


// ======================================================================
// Formatação segura
// ======================================================================

function formatValue(
    value
) {

    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {

        return "N/D";

    }


    if (
        typeof value === "number" &&
        !Number.isFinite(value)
    ) {

        return "N/D";

    }


    if (
        typeof value === "number" &&
        !Number.isInteger(value)
    ) {

        return Number(
            value.toFixed(2)
        );

    }


    return value;

}


// ======================================================================
// Timestamp
// ======================================================================

function formatTimestamp(
    timestamp
) {

    if (!timestamp) {

        return "N/D";

    }


    const date =
        new Date(timestamp);


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return timestamp;

    }


    return date.toLocaleString(
        "pt-BR",
        {
            dateStyle: "short",
            timeStyle: "medium"
        }
    );

}