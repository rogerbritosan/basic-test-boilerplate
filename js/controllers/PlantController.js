import Plant from "../models/Plant";

export default class PlantController {

    constructor(formId, listId){

        this.formEl = document.getElementById(formId);
        this.listEl = document.getElementById(listId);
        this.goTo('arrow-down','order');
        this.goTo('btn-top','header');
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
            // if (field.name == 'sun' && field.value == ''){
            //     field.value = 'high';
            // } else if (field.name == 'water' && field.value == ''){
            //     field.value = 'regularly';
            // } else if (field.name == 'pet' && field.value == ''){
            //     field.value = 'false';
            // }
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
            .then(data=> {
                this.fetchList(data);
                document.getElementById('results').style.display = "block";
                document.getElementById('noresults').style.display = "none";
            })
        })
        .catch(e=>{
            console.log('deu erro: ' + e.message);
            document.getElementById('noresults').style.display = "block";
        });

    }

    fetchList(data){

        let plants = [];

        data.forEach((d,index) => {

            var plant = new Plant (
                d.id, 
                d.name, 
                d.price,
                d.sun, 
                d.toxicity,
                d.url,
                d.water
            );

            plants.push(plant);

        });

        this.addItem(plants);

    }

    addItem(items){

        this.listEl.innerHTML = "";

        console.log(items.length);

        items.forEach((item, index) => {
            let position = "";

            //console.log('item',item);

            switch(index){
                case 0:
                    position = "first";
                    break;
                case 1:
                    position = "second";
                    break;
                case 2:
                    position = "third";
                    break;
                case 3:
                    position = "fourth";
                    break;
                case 4:
                    position = "fifth";
                    break;
                case 5:
                    position = "sixth";
                    break;
                case 6:
                    position = "seventh";
                    break;
                case 7:
                    position = "eighth";
                    break;
                case 8:
                    position = "ninth";
                    break;
                default:
            }
        
            this.listEl.innerHTML += `
            <li class="results__cards--item ${position}">
                <div class="results__cards--item--pic" style="background-image:url(${item.url});">
                    
                </div>
                <div class="results__cards--item--name">
                ${item.name}
                </div>
                <div class="results__cards--item--price">
                $${item.price}
                </div>
                <div class="results__cards--item--icons">
                    <div class="icon-feature toxicity--${item.toxicity}"></div>
                    <div class="icon-feature sun--${item.sun}"></div>
                    <div class="icon-feature water--${item.water}"></div>
                </div>
            </li>
            `;



        });
    }

    goTo(btnEl, targetEl){

        document.getElementById(btnEl).addEventListener('click',() => {
            var el = document.getElementById(targetEl);
            document.documentElement.scrollTop = el.offsetTop;
        });
    }

}