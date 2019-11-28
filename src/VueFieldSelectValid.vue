<template id="validation-select-template" xmlns="http://www.w3.org/1999/xhtml">
  <span v-if="showSelect"  >
    <select :name="name"  :id="name" :ref="name"
            :disabled="disabled" :readonly="readonly"
            :class="[clazz,errorClazz]"
            v-validate="validation"
            @change="onChange">
              <option v-if="blankForm && !readonly"  :value="null">{{field}}</option>
              <option  v-if="!readonly" v-for="value in values" :value="value[currentKey]" :key="value[currentKey]"
                      :selected="actualItem ?  (actualItem[keyField] === value[currentKey]? 'selected' : '') : '' ">
              {{ value[currentValue] }}
            </option>
    </select>
    <div v-show="errors.has(name)" class="col-sm-12 alert alert-danger">{{ errors.first(name)}}</div>
  </span>
</template>
<script>
    import VueFieldSelectLogic from "./VueFieldSelectLogic";
    export default {
        inject: ["$validator"],
        props: VueFieldSelectLogic.loadProps(true),
        computed:VueFieldSelectLogic.loadComputed(true),
        methods:VueFieldSelectLogic.loadMethods(),
        mounted:function(){
            if (this.actualItem!=null) {
                this.updateIncommingValue();
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
                    if (!this.selected[this.valueField]) {
                        this.selected[this.valueField]=this.values.find(value => value[this.currentKey] === this.actualItem[this.keyField]||value[this.currentKey] === Number(this.actualItem[this.keyField]))
                    }
                    if (this.selected[this.valueField]) {
                        this.$emit('search-value', this.selected[this.valueField]);
                    }
                    if (this.selected[this.valueField]) {
                        this.$emit('search-value', this.selected[this.valueField]);
                    }
                }
            } catch(e) {}
        },
        data: function () {
            return {
                activePage:true,
                defaultValueRequired: (this.actualItem==null || this.actualItem &&
                    this.actualItem.hasOwnProperty(this.keyField) &&
                    this.actualItem[this.keyField]=='' && this.field===undefined),
                selected: this.actualItem
            }
        }
    }
</script>

