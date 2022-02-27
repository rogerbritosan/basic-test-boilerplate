import Plant from "../models/Plant";

export default class PlantController {

    constructor(formId, listId){

        this.formEl = document.getElementById(formId);
        this.listEl = document.getElementById(listId);

        // console.log(this.formEl);
        // console.log(this.listEl);

        this.onChange();

    }

    onChange(){

        this.getOrder();

    }

    getOrder(){  

        [...this.formEl.elements].forEach((field, index) => {
            field.addEventListener('change',() => {
                this.getValues();
            });            
        });
        
    }

    getValues(){

        let selectOrder = [];

        [...this.formEl.elements].forEach((field, index) => {
            if (field.name == 'sun' && field.value == ''){
                field.value = 'high';
            } else if (field.name == 'water' && field.value == ''){
                field.value = 'regularly';
            } else if (field.name == 'pet' && field.value == ''){
                field.value = 'false';
            }
            selectOrder.push(field.value);
        });    

        console.log(selectOrder);

        const options = {
            method: 'GET',
            mode: 'cors',
            cache: 'default'
        }

        fetch(`https://front-br-challenges.web.app/api/v2/green-thumb/?sun=${selectOrder[0]}&water=${selectOrder[1]}&pets=${selectOrder[2]}`, options)
        .then(res => {res.json()
            .then(data=> this.fetchList(data))
        })
        .catch(e=>console.log('deu erro: ' + e.message));

    }

    fetchList(data){

        console.log('data',data);

        data.forEach((d,index) => {


        });


    }

}