import { API } from 'aws-amplify';

async function buscarDocumentos() {
    const rut = document.getElementById("rut").value;
    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = "Buscando documentos...";

    try {
        const response = await API.graphql({
            query: `query getDocumentosPorRut($rut: String!) {
                getDocumentosPorRut(rut: $rut) {
                    RUT
                    NOMBRE
                    APELLIDO_PATERNO
                    APELLIDO_MATERNO
                    # Agrega otros campos de la tabla DynamoDB según tus necesidades
                }
            }`,
            variables: { rut }
        });

        const datos = response.data.getDocumentosPorRut;
        if (datos) {
            resultadoDiv.innerHTML = `
                <table>
                    <tr><th>RUT</th><td>${datos.RUT}</td></tr>
                    <tr><th>Nombre</th><td>${datos.NOMBRE}</td></tr>
                    <tr><th>Apellido Paterno</th><td>${datos.APELLIDO_PATERNO}</td></tr>
                    <tr><th>Apellido Materno</th><td>${datos.APELLIDO_MATERNO}</td></tr>
                    <!-- Añade otras filas para los campos adicionales -->
                </table>
            `;
        } else {
            resultadoDiv.innerHTML = "No se encontraron documentos para el RUT ingresado.";
        }
    } catch (error) {
        console.error("Error al consultar DynamoDB", error);
        resultadoDiv.innerHTML = "Error al consultar documentos.";
    }
}
