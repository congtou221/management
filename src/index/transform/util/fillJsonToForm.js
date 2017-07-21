import moment from 'moment';

export let fillBasicToForm = params => {
  let {
    form,
    data
  } = params;

  let r = /^\d{4}\/\d{2}\/\d{2}$/;
  let newData = Object.keys(data).reduce((prev, cur) => {
    let item = data[cur];

    if(typeof item !== 'object'){

      if(r.exec(item)){
        prev[cur] = item && moment(item);
      } else {
        prev[cur] = item;
      }

    }
    return prev;
  }, {});


  form.setFieldsValue(newData);
};

export let fillDealToForm = fillBasicToForm;

export let fillVariableArrToForm = params => {
  let {
    form,
    data,
    keyname
  } = params;

  // 设置表单增加项的数量
  let keys = data.map(item => {
    return item.key;
  });

  let tmpKey = {};
  tmpKey[keyname] = keys;
  form.setFieldsValue(tmpKey);


  // 分别设置每个增加项的表单具体值
  data.map(item => {
    let key = item.key;
    delete item.key;

    let newData = Object.keys(item).reduce((prev, cur) => {
      prev[`${cur}-${key}`] = item[cur];

      return prev;
    }, {});

    form.setFieldsValue(newData);

  });

};

export let fillArrLenToForm = params => {
  let {
    form,
    keys,
    keyname
  } = params;

  let tmp = {};
  tmp[keyname] = keys;

  form.setFieldsValue(tmp);
};

export let fillArrToForm = params => {
  let {
    form,
    data
  } = params;

  data.map(item => {
    let key = item.key;
    delete item.key;

    let newData = Object.keys(item).reduce((prev, cur) => {
      prev[`${cur}-${key}`] = item[cur];

      return prev;
    }, {});

    form.setFieldsValue(newData);
  });

};
