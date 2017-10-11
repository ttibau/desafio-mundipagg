import Request from 'superagent';
import Q from 'q';
import token from './token'

/**
 * 
 * @param {*} commitUrl = url da primeira página de commits do repo
 * Primeiro remove o que vier após '{' e faz a requisicao
 * A resposta da requisicao virá (ou não) com os links de paginação (next, last) -> Fazer a verificação se há páginas
 */
export default function counterCommit(commitUrl) {
    const deferred = Q.defer();
    let n = commitUrl.indexOf('{');
    const url = commitUrl.substring(0, n !== -1 ? n : commitUrl.length);
    Request.get(url + "?per_page=100")
    .set(token())
        .then((data, error) => {
            if(error) {
                console.log("Deu erro");
            } else {
                mappingCommits(data.body)
                    .then(commits => {
                        deferred.resolve(commits);
                    });
            }
        })
    return deferred.promise;
};  


// Retorna um Object contendo Data: quantidade
function mappingCommits(array){
    const deferred = Q.defer();
    let labels = [];
    for (let i = 0; i < array.length; i++){
        let date = new Date (array[i].commit.committer.date).toLocaleDateString();
        if (!(date in labels)) { // Se Não houver date em labels
            labels[date] = 0; // labels 20/09/2015 = 0
          }
          
          labels[date] += 1; // 20/09/2015 += 1

          if(i === array.length -1){
            //console.log(labels);
            deferred.resolve(labels);
          }
    }
    return deferred.promise;
};

