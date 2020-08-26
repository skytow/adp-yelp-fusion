'use strict';

const yelp = require('yelp-fusion');
const _ = require('lodash');

// Place holder for Yelp Fusion's API Key. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const apiKey = 'y0_n46saIjA6HZ2-MmmyQkyxOdy2xe7sneHAoX3W5bvvW45lYRYwkdHAZu-Dllr4jdJy0XzROMSiT4ad7qUnl-OdPym9J-pcB_zfYDjeG2uA02x76aX4jrWMhCNEX3Yx';

const searchRequest = {
  sort_by:'rating',
  limit: 5,
  categories: 'icecream',
  location: 'alpharetta, ga'
};

const client = yelp.client(apiKey);

client.search(searchRequest).then(response => {
  const businessData = response.jsonBody.businesses;
  const businessIds = _.map(businessData, 'id');
  _.forEach(businessIds, function(id){
    client.reviews(id).then(data =>{
      const reviews = data.jsonBody.reviews;
      const tmpBusinesses = _.map(businessData, _.partialRight(_.pick,['id','name', 'location']))
      const tmpReviews = _.map(reviews,  _.partialRight(_.pick,['id','text', 'user']))
      const result = _. merge(tmpBusinesses, tmpReviews);
      const prettyJson = JSON.stringify(result, null, 4);
      console.log(prettyJson);
    });
  });
}).catch(e => {
  console.log(e);
});
