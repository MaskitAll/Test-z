'use strict';

var Vue = new Vue({
	el: '#contacts',
	data: {
        idGenerator: 0,

        contactLocal: [],

        contactList: [
            {
                contactVisible: false,
                id: "01",
                
                data: {
                    name: "Maksim",
                    num: "89922211223"
                }
            },
            {
                contactVisible: false,
                id: "02",
                
                data: {
                    name: "Maria",
                    num: "23211223"
                }
            },
            {
                contactVisible: false,
                id: "03",
                
                data: {
                    name: "Anna",
                    num: "74529478"
                }
            },

    ],

    },

    methods: {
        addContact: function(){
            var newName = document.contactAddForm.name.value;
            var newNum = document.contactAddForm.num.value;

            this.contactList.push({id: this.idGenerator++, contactVisible: false, data: {name: newName, num: newNum}});
            console.log("Добавлено");
        },

        deleteContact: function(contact){
            if(confirm("Удалить контакт?")){
                this.contactList.splice(this.contactList.findIndex(findContact => findContact === contact), 1); 
                console.log("Удалено");  
            } 
        },

        showInfo: function(contact = this.contactLocal){
            contact.contactVisible = true;
            this.contactLocal = contact;
            console.log("Показано");
        },

        hideInfo: function(){
            this.contactLocal.contactVisible = false;
            this.contactList[this.contactList.findIndex(findContact => findContact === this.contactLocal)] = this.contactLocal; 
            console.log("Спрятано");
        },

        toggleInfo: function(dataName){
            const data = prompt("Заменить значение поля " + dataName + ": ");
            if(data){
                this.contactLocal.data[dataName] = data;
                console.log("Изменено");}
            else { 
                console.log("Осталось как было.");
            }
        },

        addInfo: function(){
            const newData = prompt("Добавить поле");
            if(!newData) return;
            var dataName = newData.slice(0, newData.indexOf(":"));
            var dataValue = newData.slice(newData.indexOf(":") + 1);

            this.contactLocal.data[dataName] =  dataValue;
            
            this.hideInfo();
            this.showInfo();
            console.log("Добавено");
        },

        deleteInfo: function(dataName){
            if(confirm("Удалить данные?")){
                delete this.contactLocal.data[dataName];
                this.hideInfo();
                this.showInfo();
                console.log("Удалено");

            }
        },

    }

});