'use strict';

export default {
  port: (process.env.PORT || 3000),
  mongo: {
    uri: 'mongodb://' + (process.env.DB_PORT_27017_TCP_ADDR || 'localhost') + '/working'
  }
}
