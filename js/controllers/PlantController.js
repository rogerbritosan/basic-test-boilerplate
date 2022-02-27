export default class PlantController {

    constructor(formId, listId){

        this.formEl = document.getElementById(formId);
        this.listEl = document.getElementById(listId);

        console.log(this.formEl);
        console.log(this.listEl);

        this.onChange();

    }

    onChange(){

        [...this.formEl.elements].forEach(function(field, index){
            field.addEventListener('change',function(){
                console.log('trocou?');
            });
        });

    }

}