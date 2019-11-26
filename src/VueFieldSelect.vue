<template id="select-template" xmlns="http://www.w3.org/1999/xhtml">
  <span v-if="showSelect"  >
    <select :name="name" :disabled="disabled"  :readonly="readonly"
            :class="[clazz,errorClazz]"
            @change="onChange">
              <option v-if="blankForm && !readonly"  :value="null">{{field}}</option>
              <option  v-if="!readonly" v-for="value in values" :value="value[currentKey]" :key="value[currentKey]"
                      :selected="actualItem ?  (actualItem[keyField] === value[currentKey]? 'selected' : '') : '' ">
              {{ value[currentValue] }}
            </option>
    </select>
  </span>
</template>
<script>
    import VueFieldSelectLogic from "./VueFieldSelectLogic";
    export default {
        props: VueFieldSelectLogic.loadProps(),
        computed:VueFieldSelectLogic.loadComputed(),
        methods:VueFieldSelectLogic.loadMethods(),
        created:VueFieldSelectLogic.loadCreated(),
        mounted:VueFieldSelectLogic.loadCreated(true),
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
