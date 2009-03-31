// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2009 Apple, Inc. and contributors.
// License:   Licened under MIT license (see license.js)
// ==========================================================================
/*globals module ok equals same test MyApp */


var store, storeKey1, storeKey2, storeKey3, storeKey4, storeKey5, storeKey6;
var storeKey7, storeKey8, json, json1, json2, json3, json4, json5, json6 ;
var json7, json8;

module("SC.Store#commitRecord", {
  setup: function() {
    
    store = SC.Store.create();
    
    json1 = {
      guid: "retrieveGUID1",
      string: "string",
      number: 23,
      bool:   YES
    };
    json2 = {
      guid: "retrieveGUID2",
      string: "string",
      number: 23,
      bool:   YES
    };
    json3 = {
      guid: "retrieveGUID3",
      string: "string",
      number: 23,
      bool:   YES
    };
    json4 = {
      guid: "retrieveGUID4",
      string: "string",
      number: 23,
      bool:   YES
    };
    json5 = {
      guid: "retrieveGUID5",
      string: "string",
      number: 23,
      bool:   YES
    };
    json6 = {
      guid: "retrieveGUID6",
      string: "string",
      number: 23,
      bool:   YES
    };
    json7 = {
      guid: "retrieveGUID7",
      string: "string",
      number: 23,
      bool:   YES
    };
    json8 = {
      guid: "retrieveGUID8",
      string: "string",
      number: 23,
      bool:   YES
    };
    
    storeKey1 = SC.Store.generateStoreKey();
    store.writeDataHash(storeKey1, json1, SC.Record.EMPTY);
    storeKey2 = SC.Store.generateStoreKey();
    store.writeDataHash(storeKey2, json2, SC.Record.ERROR);
    storeKey3 = SC.Store.generateStoreKey();
    store.writeDataHash(storeKey3, json3, SC.Record.DESTROYED_CLEAN);
    storeKey4 = SC.Store.generateStoreKey();
    store.writeDataHash(storeKey4, json4, SC.Record.BUSY_DESTROYING);
    storeKey5 = SC.Store.generateStoreKey();
    store.writeDataHash(storeKey5, json5, SC.Record.BUSY_CREATING);
    storeKey6 = SC.Store.generateStoreKey();
    store.writeDataHash(storeKey6, json6, SC.Record.BUSY_COMMITTING);
    storeKey7 = SC.Store.generateStoreKey();
    store.writeDataHash(storeKey7, json7, SC.Record.DESTROYED_DIRTY);
    storeKey8 = SC.Store.generateStoreKey();
    store.writeDataHash(storeKey8, json8, SC.Record.READY_CLEAN);
    }
});
    
test("Retrieve a record and check for different errors and states", function() {

  store.retrieveRecord(undefined, undefined, storeKey1, YES);
  status = store.readStatus( storeKey1);
  equals(status, SC.Record.BUSY_LOADING, "the status should have changed to BUSY_LOADING");
  
  store.retrieveRecord(undefined, undefined, storeKey2, YES);
  status = store.readStatus( storeKey2);
  equals(status, SC.Record.BUSY_LOADING, "the status should have changed to BUSY_LOADING");
  
  store.retrieveRecord(undefined, undefined, storeKey3, YES);
  status = store.readStatus( storeKey3);
  equals(status, SC.Record.BUSY_LOADING, "the status should have changed to BUSY_LOADING");
  
  try{
    store.retrieveRecord(undefined, undefined, storeKey4, YES);
    msg='';
  }catch(error1){
    msg=error1.message;
  }
  equals(msg, SC.Record.BUSY_ERROR.message, "should throw error");

  try{
    store.retrieveRecord(undefined, undefined, storeKey5, YES);
    msg='';
  }catch(error2){
    msg=error2.message;
  }
  equals(msg, SC.Record.BUSY_ERROR.message, "should throw error");
  
  try{
    store.retrieveRecord(undefined, undefined, storeKey6, YES);
    msg='';
  }catch(error3){
    msg=error3.message;
  }
  equals(msg, SC.Record.BUSY_ERROR.message, "should throw error");

  try{
    store.retrieveRecord(undefined, undefined, storeKey7, YES);
    msg='';
  }catch(error4){
    msg=error4.message;
  }
  equals(msg, SC.Record.BAD_STATE_ERROR.message, "should throw error");


  store.retrieveRecord(undefined, undefined, storeKey8, YES);
  status = store.readStatus( storeKey8);
  ok(SC.Record.BUSY_REFRESH | (status & 0x03), "the status changed to BUSY_REFRESH.");
  
});
