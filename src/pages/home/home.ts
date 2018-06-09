import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Platform } from 'ionic-angular';

import { SMS } from '@ionic-native/sms';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import { Contacts } from '@ionic-native/contacts';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	mobile:any;
	message:any;
	attachment:any;
	platform:any;
	dataUrlString:any;
	searchContacts:any = [];
	searchContactField: any;

	constructor(public navCtrl: NavController, private sms: SMS, private imagePicker: ImagePicker, public plt: Platform, public loadingCtrl: LoadingController, private base64: Base64, private contacts: Contacts) {
		this.platform = plt;
		this.attachment = 0;
	}


	getAttachmentPics(){
		let option = { width:100, height:100};		
		this.imagePicker.getPictures(option).then((results) => {
		  	for (var i = 0; i < results.length; i++) {
		      	console.log('Image URI: ' + results[i]);
		      	this.attachment = results[i];	      	 				
		  	}
		}, (err) => { });
	}

	//Search contact 
	searchContactsFn(event, input){	 
		console.log(input); 	
	  	/*if(input !='' ){
		  	this.contacts.find(['displayName', 'phoneNumbers'], {filter: input, multiple: true}).then(data => {
		      	this.searchContacts = data;
		    });
	    }*/
	}

	//Pick the contact from search list
	pickMyContact(event,smobile){
		console.log(smobile);
	  	//alert(JSON.stringify(event) + ' :: '+ smobile);
	  	this.mobile = smobile;
	  	this.searchContacts=[];
	  	this.searchContactField.reset();
	 }

	//Send MMS
	sendSMS(){
		let loading = this.loadingCtrl.create({
		    content: 'Please wait...'
		});
		var number = this.mobile; /* iOS: ensure number is actually a string */
        var message = this.message;
        //var attachment = this.attachment;
        console.log("number=" + number + ", message= " + message + ", attachment ="+ this.attachment );

        if(this.attachment == ''){
        	this.attachment = "https://www.atomix.com.au/media/2015/06/atomix_user31.png";
        } 		

        var options = {
            replaceLineBreaks: false, // true to replace \n by a new line, false by default
            android: {
                intent: 'INTENT'  // send SMS with the native android SMS messaging
                //intent: '' // send SMS without open any other app
            }
        };

        /*var dataURL;
        var canvas = document.createElement('canvas'), context = canvas.getContext('2d');
        var img = new Image();
        img.src = this.attachment;        
        img.onload = function () {	        
			canvas.width = img.width;
			alert(canvas.width);
			canvas.height = img.height;
			context.drawImage(img, img.width, img.height);
			dataURL = canvas.toDataURL();				
			alert(dataURL);							
		}; 

		setTimeout( () => {
		    dataURL = canvas.toDataURL().replace(/^data:image\/(png|jpg);base64,/, '');
		    this.dataUrlString = dataURL;
		    loading.dismiss();				
			alert(dataURL);
			let checkSMS = this.sms.send(number, message, dataURL, options);
	    	alert(JSON.stringify(checkSMS));

		}, 3000);	*/



		this.base64.encodeFile(this.attachment).then((base64File: string) => {
			console.log(base64File);
			this.dataUrlString = base64File;			
		}, (err) => {
			console.log(err);
		});
		setTimeout( () => {
			let checkSMS = this.sms.send(number, message, this.dataUrlString, options);
		    alert(JSON.stringify(checkSMS));
		}, 3000);
		
	}

	
}
