import Request from 'superagent';
import Q from 'q';

/**
 * Esta função irá me retornar o números de contribuidores
 * Pega o último e a próxima página. Remove o último caractere do next e vai incrementando até que o link seja
 * igual ao last, e vai atribuindo os resultados dentro do array com spread, no final, retornar o valor do length do array
 * @param {*} next = Próxima página de contribuidores
 * @param {*} last = Última página de contribuidores
 */


 // Retorna o valor do parâmetro que eu passar
 // Vai ser usada para retornar o número de páginas total (last)
function getUrlParameter(name, link) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(link);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};


export default function counterContrib (next, last, repoId){
    let numberOfLastPage = parseInt(getUrlParameter('page', last)); 
    let numberOfNextPage = parseInt(getUrlParameter('page', next));

    console.log("NextPage", typeof(numberOfNextPage)); // 2
    console.log("LastPage", numberOfLastPage); // 15

    // ele não entra no for
    for (let i = numberOfNextPage; i <= numberOfLastPage; i++){
        console.log(i);
    }

}
