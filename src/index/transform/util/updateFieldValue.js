export let updateObj = params => {
  let {
    props,
    changedFields,
    tmpData
  } = params;

  if($.isEmptyObject(changedFields) || !tmpData){
    return;
  }

  let updateValue = (changedItem) => {
    let {name, value} = changedItem;

    if(!!value && !!value.format){
      value = value.format('YYYY/MM/DD');
    }

    tmpData[name] = value;
  };

  Object.keys(changedFields).forEach(changedKey => {
    updateValue(changedFields[changedKey]);
  });

  return tmpData;
};

export let updateArray = params => {
  let {
    props,
    changedFields,
    addKey,
    tmpData
  } = params;

  if($.isEmptyObject(changedFields)){
    return;
  }

  let updateValue = changedKey => {
    if(changedKey === addKey){
      let changedArr = changedFields[changedKey].value;

      let filtered = tmpData.filter(value => {
        if(!!value.key && changedArr.indexOf(value.key) > -1){
          return true;
        }
        return false;
      });

      let newArr  = changedArr.map(key => {
        let keys = filtered.map(item => {
          return item.key;
        });
        if(keys.indexOf(key) < 0){
          return {key: key};
        }
        return tmpData.find(item => {
          return item.key === key;
        });
      });
      tmpData = newArr;
    } else {
      let { name, value } = changedFields[changedKey];

      let reg1 = /^(.*)-/;
      let reg2 = /-(\d+)$/;

      if(!(reg1.exec(name) && reg2.exec(name))){
        return;
      }

      let nameWithoutIndex = reg1.exec(name)[1];
      let index = reg2.exec(name)[1];

      let tmpArr = tmpData;

      tmpData = tmpArr.map(item => {
        if(item.key == +index){

          if(!!value && !!value.format){
            value = value.format('YYYY/MM/DD');
          }

          item[nameWithoutIndex] = value;
        }
        return item;
      });
    }
  };

  Object.keys(changedFields).forEach((changedKey) => {
    updateValue(changedKey);
  });

  return tmpData;
};

export let updateArrayLength = params => {
  let {
    props,
    changedFields,
    tmpData
  } = params;

  let updateValue = changedKey => {
    let { name, value } = changedFields[changedKey];

    let reg1 = /^(.*)-/;
    let reg2 = /-(\d+)$/;

    let nameWithoutIndex = reg1.exec(name)[1];
    let index = reg2.exec(name)[1];

    let item = tmpData[+index - 1];
    if(typeof item == 'undefined'){
      item = {};
    }

    if(!!value && !!value.format){
      value = value.format('YYYY');
    }

    item[nameWithoutIndex] = value;

    tmpData[+index -1] = item;

  };

  Object.keys(changedFields).forEach(changedKey => {
    updateValue(changedKey);
  });

  return tmpData;

};

export let updateArrayItem = () => {

};
