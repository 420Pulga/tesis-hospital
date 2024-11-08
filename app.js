import { Amplify } from 'aws-amplify';
import config from './aws-exports.js';

Amplify.configure(config);

const apiUrl = https://l7t44xcxezfj3cbu2fawykzw6e.appsync-api.us-east-1.amazonaws.com/graphql; // Reemplaza esto con la URL de tu API en Amplify

document.getElementById("buscarBtn").addEventListener("click", async function() {
    const rut = document.getElementById("rutInput").value;

    try {
        const response = await fetch(`${apiUrl}/buscar-rut?rut=${rut}`);
        const data = await response.json();
        console.log(data); // Mostrar los datos en la consola o en la página
    } catch (error) {
        console.error("Error al llamar a la API", error);
    }
});

import { API, graphqlOperation } from 'aws-amplify';
import { createTesisHospitalExtractedText } from './graphql/mutations';
import { getTesisHospitalExtractedText } from './graphql/queries';

async function addDocument() {
  const data = { DocumentID: "12345", RUT: "20.245.752-5" };
  await API.graphql(graphqlOperation(createTesisHospitalExtractedText, { input: data }));
}

async function fetchDocument() {
  const result = await API.graphql(graphqlOperation(getTesisHospitalExtractedText, { DocumentID: "12345" }));
  console.log(result);
}

