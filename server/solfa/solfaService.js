const pdfjslib = require('pdfjs-dist');
const {parse} = require("dotenv");

function getVersion(solfas) {
    for(let i = 0; i < solfas.length; i++) {
        if(solfas[i].str === `(1)`) {
            return true;
        }
    }
    return false;
}

function getKey(solfas) {
    let tonalite = ''
    let index = 0;
    try {
        for(let i = 0; i < solfas.length; i++) {
            if(solfas[i].str.includes('dia')) {
                index = i;
            }
        }

        if(solfas[index+1].str !== 'b') {
            tonalite = `${solfas[index].str}`
        } else {
            tonalite = `${solfas[index].str}${solfas[index+1].str}`
        }
        return tonalite.split(' ').pop();

    } catch (e) {
        console.error(e)
    }

}
function getTitle(solfas, number, category) {
    let title = '';
    let index = 0;
    try {
        for(let i = 0; i < solfas.length; i++) {
            if(solfas[i].str.includes(parseTitle(category.toUpperCase(), number))) {
                index = i;
            }
        }

        title = `${solfas[index].str.split('.').pop()}`;
        return title;
    } catch (e) {
        console.error(e);
    }
    return ""
}

function parseTitle(category, number) {
    let title = ''
    switch(category) {
        case 'FFPM':
            title = `${number}.`;
            break;

        case 'FF':
            title = `${category}${number}.`;
            break;

        case 'ANTEMA':
            title = `${category} ${number}.`;
            break;

        case 'TSANTA':
            title = `${category} ${number}.`;
            break;

        default:
            title = 'default';
            break;
    }
    return title;
}

async function getPDFInfo(query) {
    let mergedItems = [];


    try {
        const url = `${process.env.BASE_API_URL}${query.category}/${query.number}.pdf`
        const data = await pdfjslib.getDocument(url).promise;
        for(let i = 1; i <= data.numPages; i++) {
            const page = await data.getPage(i);
            const textContent = await page.getTextContent();
            mergedItems = mergedItems.concat(textContent.items);
        }

        const infos = {
            category: query.category,
            number: query.number,
            title: getTitle(mergedItems, query.number, query.category),
            tonalite:getKey(mergedItems)
        }

        console.log(infos)

        return infos
    } catch (e) {
        console.error(e);
    }


}

/**
 * Quand l'utilisateur fait Add, ca envoie une requete pour voir si solfa a +1 version. Si oui alors demander utilisateur quelle version.,
 */

module.exports = {
    getKey,
    getTitle,
    getPDFInfo
}