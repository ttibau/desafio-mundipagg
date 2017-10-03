import Request from 'superagent';
import isEmptyObject from './verifyObject';
import Q from 'q';

 // Retorna o valor do parâmetro que eu passar
 // Vai ser usada para retornar o número de páginas total (last)
 // Retorna page={x}
 function getUrlParameter(name, link) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(link);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};


/**
 * 
 * @param {*} commitUrl = url da primeira página de commits do repo
 * Primeiro remove o que vier após '{' e faz a requisicao
 * A resposta da requisicao virá (ou não) com os links de paginação (next, last) -> Fazer a verificação se há páginas
 */
export default function counterCommit(commitUrl, repoId) {
    const numberOfCommits = [];
    let n = commitUrl.indexOf('{');
    const url = commitUrl.substring(0, n !== -1 ? n : commitUrl.length);
    Request.get(url)
        .then((data, error) => {
            if(error) {
                console.log("Deu erro");
            } else {
                numberOfCommits.push(data.body);
                //console.log(data);
                let objVerified = isEmptyObject(data.links); // Retorna true se não houverem links 
                if(!objVerified){
                    let numberOfLastPage = parseInt(getUrlParameter('page', data.links.last)); 
                    let numberOfNextPage = parseInt(getUrlParameter('page', data.links.next));
                    console.log(numberOfCommits);
                    for(let i=numberOfNextPage; i <=  numberOfLastPage; i++){
                        let deferred = Q.defer();
                        let urlPages = "https://api.github.com/repositories/" + repoId + "/commits?page=" + i;
                        Request.get(urlPages)
                            .then(data => {
                                numberOfCommits.push(data.body);
                            });
                    }
                }
            }
        })
};  