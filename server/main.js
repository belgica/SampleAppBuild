import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
  parseUpload( data ) {
    check( data, Array );

    for ( let i = 0; i < data.length; i++ ) {
      let item   = data[ i ],
          exists = Candidates.findOne( { First_Name: item.First_Name } );
      // should 'saleId' get changed to 'First Name'? also...is 'First Name' valid name...or should it have an underscore or something 'First_Name' which would also mean changing the columns in the file.bél.
      // I
      if ( !exists ) {
        Candidates.insert( item );
      } else {
        console.warn( 'Rejected. This item already exists.' );
      }
    }
  }
});