import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

Template.upload.onCreated( () => {
  Template.instance().uploading = new ReactiveVar( false );
});

Template.upload.helpers({
  uploading() {
    return Template.instance().uploading.get();
  }
});

Template.upload.events({
  'change [name="uploadCSV"]' ( event, template ) {

    Papa.parse( event.target.files[0], {
      header: true,
      complete( results, file ) {
        Meteor.call( 'parseUpload', results.data, ( error, response ) => {
          if ( error ) {
            console.log( error.reason );
          } else {
            template.uploading.set( false );
            Bert.alert( 'Upload complete!', 'success', 'growl-top-right' );
          }
        });
      }
    });
  }
});
//new code starts here, in case you need to work from a place from where it works
Template.candidateOutput.helpers({
  candidate:function(){
    return Candidates.find();
  }
});

/*
var OutputCandidateDictionary = {
   CandidateDictionary: function (){
     return Candidates.find();
   }
};

Template.candidateOutput.helpers(OutputCandidateDictionary);
*/
/* take a look at the hello helper for counter that is commented out on lines 54 - 58. How does that differ?  charles*/

/*
Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});
*/