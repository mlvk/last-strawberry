const updateModelField = (model, key, value) => model.set(key, value);

const saveModelIfDirty = model => {
  if(model !== undefined && model.get('hasDirtyAttributes')) {
    model.save();
  }
}

export { updateModelField, saveModelIfDirty};
