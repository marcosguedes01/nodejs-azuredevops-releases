/*
    Fontes:
    https://docs.microsoft.com/en-us/rest/api/vsts/core/projects/list?view=vsts-rest-4.1
    https://docs.microsoft.com/en-us/rest/api/vsts/release/releases/list?view=vsts-rest-4.1
    https://docs.microsoft.com/en-us/rest/api/vsts/release/releases/get%20release?view=vsts-rest-4.1
    https://docs.microsoft.com/en-us/rest/api/vsts/release/approvals/list?view=vsts-rest-4.1

    Exemplos:
    https://dev.azure.com/avageneralproject/_apis/projects?api-version=4.1
    https://vsrm.dev.azure.com/avageneralproject/ProjetoTeste/_apis/release/releases?api-version=4.1-preview.6
    https://vsrm.dev.azure.com/avageneralproject/ProjetoTeste/_apis/release/releases/61?api-version=4.1-preview.6

    Api:
    https://github.com/Microsoft/azure-devops-node-api
    https://docs.microsoft.com/en-us/rest/api/vsts/?view=vsts-rest-4.1
*/

var azdev = require('azure-devops-node-api');

// your collection url
let orgUrl = "https://dev.azure.com/{organization}";

// ideally from config
let token = "key_azure_devops"; 

let authHandler = azdev.getPersonalAccessTokenHandler(token); 
let connection = new azdev.WebApi(orgUrl, authHandler);

connection.getCoreApi("projects").then(function(build){
    build.getProjects().then(function(reles){
        reles.forEach(projeto => {
            //console.log(`Lendo projeto: ${projeto.name}`)

            connection.getReleaseApi("/release/releases/").then(function(build){               
                build.getReleases(projeto.name).then(function(reles){
                    reles.forEach(release => {
                        console.log(`${projeto.name}: ${release.name} - ${release.createdOn} - ${release.createdBy.uniqueName}\n`)
                    });
                })
            })

        });
    })
})