<template id="validation-select-template" xmlns="http://www.w3.org/1999/xhtml">
  <span v-if="showSelect"  >
    <select :name="name"  :id="name" :ref="name"
            :disabled="disabled" :readonly="readonly"
            :class="[clazz,errorClazz]"
            v-validate="validation"
            @change="onChange">
              <option v-if="blankForm && !readonly"  :value="null">{{field}}</option>
              <option  v-if="!readonly" v-for="value in values" :value="value[currentKey]" :key="value[currentKey]"
                       :selected="workOutSelected">
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
        mounted() {return VueFieldSelectLogic.mounted(this)},
        data: VueFieldSelectLogic.dataObject()
    }
</script>

