'use strict';

export default {
  port: (process.env.PORT || 3000),
  mongo: {
    uri: 'mongodb://' + (process.env[(process.env.DB_NODE || 'DB') + '_PORT_27017_TCP_ADDR'] || 'localhost') + '/working'
  }
}
