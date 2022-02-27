export default class PlantController {

    constructor(formId, listId){

        this.formEl = document.getElementById(formId);
        this.listEl = document.getElementById(listId);

        console.log(this.formEl);
        console.log(this.listEl);

        this.onChange();

    }

    onChange(){

        this.getOrder();

    }

    getOrder(){        

        [...this.formEl.elements].forEach((field, index) => {
            field.addEventListener('change',() => {
                console.log(field.value);
                this.getValues(field.value);
            });
        });

    }

    getValues(){

        const options = {
            method: 'GET',
            mode: 'cors',
            cache: 'default'
        }

        fetch(`https://front-br-challenges.web.app/api/v2/green-thumb/?sun=high&water=regularly&pets=false`, options)
        .then(res => {res.json()
            .then(data=> console.log(data))
        })
        .catch(e=>console.log('deu erro: ' + e.message));

    }

}