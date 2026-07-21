/**
 * ======================================================================
 * CORE QAI
 * Reference Dashboard
 * ----------------------------------------------------------------------
 * Arquivo : environment.js
 * Função  : Renderização das leituras ambientais recebidas do CORE
 * Versão  : RC2.1
 * ======================================================================
 */


// ======================================================================
// Render principal
// ======================================================================

export default function renderEnvironment(environment) {

    const container =
        document.getElementById("environment");

    if (!container) {

        console.warn(
            "Container #environment não encontrado."
        );

        return;

    }

    if (!environment) {

        container.innerHTML = `
            <div class="component-card">
                <h2>Leituras Ambientais</h2>

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
                    <h2>Leituras Ambientais</h2>

                    <p class="component-subtitle">
                        Valores ambientais utilizados na análise
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
                        environment.temperature,
                        "°C"
                    )}

                    ${createMetric(
                        "Umidade",
                        environment.humidity,
                        "%"
                    )}

                    ${createMetric(
                        "CO₂",
                        environment.co2,
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
                        environment.pm1,
                        "µg/m³"
                    )}

                    ${createMetric(
                        "PM2.5",
                        environment.pm25,
                        "µg/m³"
                    )}

                    ${createMetric(
                        "PM4",
                        environment.pm4,
                        "µg/m³"
                    )}

                    ${createMetric(
                        "PM10",
                        environment.pm10,
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
                        environment.vocIndex,
                        ""
                    )}

                    ${createMetric(
                        "NOx Index",
                        environment.noxIndex,
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
                        environment.nc0_5,
                        "#/cm³"
                    )}

                    ${createMetric(
                        "NC1.0",
                        environment.nc1_0,
                        "#/cm³"
                    )}

                    ${createMetric(
                        "NC2.5",
                        environment.nc2_5,
                        "#/cm³"
                    )}

                    ${createMetric(
                        "NC4.0",
                        environment.nc4_0,
                        "#/cm³"
                    )}

                    ${createMetric(
                        "NC10",
                        environment.nc10_0,
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
                        environment.typicalParticleSize,
                        "µm"
                    )}

                </div>

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

function formatValue(value) {

    if (
        value === null ||
        value === undefined ||
        Number.isNaN(value)
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