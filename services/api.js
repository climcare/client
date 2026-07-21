/**
 * ======================================================================
 * CORE QAI
 * Reference Dashboard
 * ----------------------------------------------------------------------
 * Arquivo : api.js
 * Serviço : CORE API
 * Versão  : RC2.1
 * ======================================================================
 */

const API_URL =
    "https://core-qai-runtime.onrender.com";

export async function getLatestAnalysis() {

    const response =
        await fetch(API_URL);

    if (!response.ok) {

        throw new Error(
            `Erro HTTP ${response.status}`
        );

    }

    return await response.json();

}