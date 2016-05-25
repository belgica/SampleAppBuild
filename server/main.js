import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
  parseUpload( data ) {
    check( data, Array );

    for ( let i = 0; i < data.length; i++ ) {
      let item   = data[ i ],
          exists = Candidates.findOne( { saleId: item.saleId } );
      // saleId ?

      if ( !exists ) {
        Candidates.insert( item );
      } else {
        console.warn( 'Rejected. This item already exists.' );
      }
    }
  }
});