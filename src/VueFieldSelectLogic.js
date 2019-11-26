/**
 * Vahid Hedayati 26/11/2019
 *
 * VueFieldSelectLogic centralises all the default properties for:
 *
 * - VueFieldSelect.vue
 * - VueFieldSelectValid.vue
 * ----
 * This now means any future updates for both can be done in this one
 * centralised place. Reducing duplicate changes need in both.
 */
export default {
    loadProps(loadValidation) {
        var p = {
            keyField: {
                default: 'id'
            },
            valueField: {
                default: 'name'
            },
            remoteKey: {
                default: ''
            },
            remoteValue: {
                default: ''
            },
            disabled: {
                type: Boolean,
                required: false,
                default: false
            },
            readonly: {
                type: Boolean,
                required: false,
                default: false
            },
            values: {type: Array},
            field: {type: String},
            actualItem: {  default: null },
            obj: {type: Object},
            showSelect:{default:true},
            returnPromise:{
                type: Boolean,
                required: false,
                default: false
            },
            clazz: {default:"inline form-control form-control-sm"},
            name: {default:'selectField'}

        };
        if (loadValidation!=undefined && loadValidation===true) {
            p['validation']= {type: String, required: false, default:""}
            p['validationErrors']={ type:Array, default: function() { return []}}
        }
        return p
    },
    loadComputed(loadValidation) {
        var p = {
            currentValue() {
                return (this.remoteValue ? this.remoteValue : this.valueField)
            },
            currentKey() {
                return (this.remoteKey ? this.remoteKey : this.keyField)
            },
            blankForm() {
                return ((this.actualItem==null||this.actualItem && this.actualItem.hasOwnProperty(this.keyField) && this.actualItem[this.keyField]=='') && this.field!=undefined||this.field!='')
            }
        };
        if (loadValidation!=undefined && loadValidation===true) {
            p['errorClazz'] = function () {
                return (this.errors.has(this.name)|| this.validationErrors && this.validationErrors.includes(this.name)) ? 'is-invalid' : ''
            }
        } else {
            p['errorClazz']= function () {
                return (this.validationErrors && this.validationErrors.includes(this.name)) ? 'is-invalid' : ''
            }
        }
        return p;
    },
    loadMethods() {
      var p = {
          updateIncommingValue: function () {
              if (this.selected) {
                  if (this.returnPromise) {
                      this.$emit('return-promise', this.selected)
                  } else {
                      //This fixed v-model of field select
                      var vmodel = this.actualItem
                      vmodel[this.valueField]=this.selected[this.valueField]
                      vmodel[this.keyField]=this.selected[this.keyField]
                      this.$emit('input', vmodel)

                      this.$emit('id-sent', this.selected[this.valueField])
                      this.$emit('search-value', this.selected[this.keyField])
                  }
              }
          },
          updateValue: function () {
              if (this.selected) {
                  if (this.returnPromise) {
                      this.$emit('return-promise', this.selected)
                  } else {
                      var vmodel = this.actualItem
                      vmodel[this.valueField]=this.selected[this.currentValue]
                      vmodel[this.keyField]=this.selected[this.currentKey]
                      this.$emit('input', vmodel)
                      this.$emit('id-sent', this.selected[this.currentKey])
                      this.$emit('search-value', this.selected[this.currentValue])
                  }
              } else {
                  var vmodel = this.actualItem
                  vmodel[this.valueField]=''
                  vmodel[this.keyField]=''
                  this.$emit('input', vmodel)
                  this.$emit('id-sent','')
                  this.$emit('search-value', '')
              }
          },
          onChange (e) {
              this.selected = this.values.find(value => value[this.currentKey] === e.target.value||value[this.currentKey] === Number(e.target.value))
              this.updateValue()
          }
      };
      return p;
    },
    loadCreated(loadMounted) {
        if (loadMounted==undefined||loadMounted===false) {
            if (this.actualItem!=null) {
                this.updateIncommingValue();
            }
        }
        if (this.defaultValueRequired) {
            this.selected = this.values[0]
            if (this.selected) {
                var vmodel = this.actualItem
                vmodel[this.valueField]=this.selected[this.currentValue]
                vmodel[this.keyField]=this.selected[this.currentKey]
                this.$emit('input', vmodel)
                //end of fix
                this.$emit('id-sent', this.selected[this.currentKey])
                this.$emit('search-value', this.selected[this.currentValue])
            }
        }
        try {
            if (this.selected &&  this.actualItem && this.actualItem.hasOwnProperty(this.keyField)) {
                if (loadMounted!=undefined && loadMounted===true) {
                    if (this.selected[this.valueField]) {
                        this.$emit('search-value', this.selected[this.valueField]);
                    } else {
                        this.selected[this.valueField]=this.values.find(value => value[this.currentKey] === this.actualItem[this.keyField]||value[this.currentKey] === Number(this.actualItem[this.keyField]))
                        this.$emit('search-value', this.selected[this.valueField]);
                    }
                    this.$emit('id-sent',this.actualItem[this.keyField]);
                } else {
                    if (this.selected[this.valueField]) {
                        this.$emit('search-value', this.selected[this.valueField]);
                    } else {
                        this.selected[this.valueField]=this.values.find(value => value[this.currentKey] === this.actualItem[this.keyField]||value[this.currentKey] === Number(this.actualItem[this.keyField]))
                        this.$emit('search-value', this.selected[this.valueField]);
                    }
                    this.$emit('id-sent',this.actualItem[this.keyField]);
                }
            }
        } catch(e) {}
    }
}