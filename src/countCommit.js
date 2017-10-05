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
export default function counterCommit(commitUrl) {
    const deferred = Q.defer();
    const numberOfCommits = [];
    let n = commitUrl.indexOf('{');
    const url = commitUrl.substring(0, n !== -1 ? n : commitUrl.length);
    Request.get(url + "?per_page=100")
    .set("Authorization", "Basic " + btoa("ttibau:tibaus7212"))
        .then((data, error) => {
            if(error) {
                console.log("Deu erro");
            } else {
                deferred.resolve(data.body);
            }
        })
    return deferred.promise;
};  

