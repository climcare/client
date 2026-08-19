/**
 * ======================================================================
 * CORE QAI
 * Reference Dashboard
 * ----------------------------------------------------------------------
 * Arquivo : api.js
 * Serviço : CORE API
 * Versão  : RC3.1
 * ======================================================================
 */

const API_URL =
    "https://miqai-server.onrender.com";


export async function getLatestAnalysis(
    deviceId
) {

    if (
        deviceId === null ||
        deviceId === undefined ||
        deviceId === ""
    ) {

        throw new Error(
            "deviceId é obrigatório."
        );

    }


    const url =
        `${API_URL}/?deviceId=${encodeURIComponent(deviceId)}`;


    const response =
        await fetch(url);


    if (!response.ok) {

        throw new Error(
            `Erro HTTP ${response.status}`
        );

    }


    return await response.json();

}