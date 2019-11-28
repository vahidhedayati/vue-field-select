# VueFieldSelect vue-field-select
[![npm (scoped)](https://img.shields.io/npm/v/vue-field-select.svg?style=flat-square)](https://www.npmjs.com/package/vue-field-select)
[![npm](https://img.shields.io/npm/dm/vue-field-select.svg?style=flat-square)](https://www.npmjs.com/package/vue-field-select)
[![MIT](https://img.shields.io/github/license/vahidhedayati/vue-field-select.svg?style=flat-square)](https://opensource.org/licenses/MIT)

## Installation via NPM

## First
Install via NPM 
```
npm i vue-field-select --save-dev
```
or
```
npm i  vue-field-select --save
```
## Second
Require in your project:
```
var VueFieldSelect = require('vue-field-select');
```
or ES6 syntax:
```js
import VueFieldSelect from 'vue-field-select'
import {VueFieldSelectValid} from 'vue-field-select'
```

# Third
You can register the component globally:
```
Vue.component('vue-field-select', VueFieldSelect)
                                                
```
Or locally in a single Vue component / both not needed / an example of either:
```
 components: { 'vue-field-select':VueFieldSelect,
'vue-field-select-valid':VueFieldSelectValid,
 },
```

#### All Available Props for vue-field-select

Prop | Type | Default | Description
--- | --- | --- | ---
keyField | String | id | id for the hidden input / your expected object key i.e. id:xxx
valueField | String | name | the value that is set for your expected object value  i.e. name:xxx
remoteKey | String | *keyField | the value that is set for your expected object key  i.e. {id:xxx}
remoteValue| String | *valueField | the value that is set for your expected object value  i.e. {name:xxx}
showSelect| Boolean | true | show select box / area
field| String | name | the value that is set for a blank select box
clazz| String | - | css classes to load if additional css styling needed
returnPromise| Boolean | false | return entire object - this is for more complex objects that have many other things you need to do with returned data
actualItem| Object | {} | The actual selected object when user chooses one of drop down - emited back to parent call overwriting parent key/value fields
name| String | - |The name of select field must match object name that is being saved for validation to work or valueField name
values | Array | [] | parent's array of selectable objects - can be fixed or db driven - key presses by user trigger list to update
disabled | Boolean | false | set to true to disable selectable area
readonly | Boolean | false | set to true to make area non selectable and readonly


#### All Available Props for vue-field-select-valid (above + below)
Prop | Type | Default | Description
--- | --- | --- | ---
validationErrors| Array | [] | returns any vee-validate validation issues back to caller
validation| String | - | the validation types required i.e. 'required|xx'

#### Events
Event | Description
--- | ---
@key-press | Fired when the input text changes 
@search-value| if `v-model` directive declared then not required but if set allows you to manipulate locally from set selected value field
@id-sent| if `v-model` directive declared then not required  but if set allows you to manipulate locally from set selected key field
@return-promise| Not required but if set won't manipulate parent object instead return the full object from remote selection back to you, this contains the entire object selected. It may have many other values you need to update page with.

## Usage

##### [Working Demo project (needs to be downloaded run)](https://github.com/vahidhedayati/vue-autocompletion-test)

#### [YouTube demo video](https://www.youtube.com/watch?v=8gjKhyUlEro)

##### Example 1: Basic 

```html
 <vue-field-select v-model="currentEdit.vehicle" name="name"
                        keyField="id"
                        valueField="name"
                        :field="$t('select_a_vehicle')"
                        :actualItem="currentEdit.vehicle" :values="vehicles" />
```
```javascript
<script> 
import VueFieldSelect from 'vue-field-select'
export default {
    data () {
        return {
            validationErrors:[],
            currentEdit: {id:'', vehicle:{id:'', name:''}, someOtherProperty:''},
            vehicles:[]
        }
    },
    components: {
        VueFieldSelect
    },
    created() {
        this.initialiseDropDowns();
    },
   methods: {
        initialiseDropDowns(){
            MyService.fetch('/vehicle/list')
                .then((res) => {
                    if (res.data) {
                        this.vehicles = res.data;
                        /**
                        {id:'a',name:'vehicle 01'},{id:'a0', name:'zyz vehicle 01'},
                        {id:'a1', name:'abc vehicle 02'},{id:'a2', name:'vehicle 03'},{id:'a3', name:'vehicle 03'},
                        {id:'a4', name:'abc vehicle 04'},{id:'a5', name:'vehicle 05'},{id:'a6', name:'vehicle 06'},
                        {id:'a7', name:'abc vehicle 07'},{id:'a8', name:'vehicle 08'},{id:'a9', name:'vehicle 09'}
                        */
                    }
                });
        },
   }
}
</script>
```

##### Example 2 `vue-field-select-valid`: Validation using `vee-validate` 
You need to add `"vee-validate": "^2.2.13"` to `devDependencies` in `package.json`. 
 

Then in `src/main.js` Following has been added 
```javascript
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate, { inject: false });
```

Then in your vue page:
```html
 <vue-field-select-valid v-model="currentEdit" name="vehicName"
                        :validationErrors="validationErrors"
                        validation='required'
                        remoteKey="vhecId"
                        remoteValue="vehicleName"
                        keyField="vehicleId"
                        valueField="vehicName"
                        :field="$t('select_a_vehicle')"
                        :actualItem="currentEdit" :values="vehicles" />
```
```javascript
<script> 
import {VueFieldSelectValid} from 'vue-field-select'
export default {
    $_veeValidate: {
        validator: 'new'
    },
    data () {
        return {
            validationErrors:[],
            currentEdit: {id:'', vehicleId:'',vehicName:'', someOtherProperty:''},
            vehicles:[]
        }
    },
    components: {
        VueFieldSelectValid
    },
    created() {
        this.initialiseDropDowns();
    },
   methods: {
        initialiseDropDowns(){
            MyService.fetch('/vehicle/list')
                .then((res) => {
                    if (res.data) {
                        this.vehicles = res.data;
                        /**
                        {vhecId:'a',vehicleName:'vehicle 01'},{vhecId:'a0', vehicleName:'zyz vehicle 01'},
                        {vhecId:'a1', vehicleName:'abc vehicle 02'},{vhecId:'a2', vehicleName:'vehicle 03'},{vhecId:'a3', vehicleName:'vehicle 03'},
                        {vhecId:'a4', vehicleName:'abc vehicle 04'},{vhecId:'a5', vehicleName:'vehicle 05'},{vhecId:'a6', vehicleName:'vehicle 06'},
                        {vhecId:'a7', vehicleName:'abc vehicle 07'},{vhecId:'a8', vehicleName:'vehicle 08'},{vhecId:'a9', vehicleName:'vehicle 09'}
                        */
                    }
                });
        },
   }
}
</script>
```
##### Example 3 : Return promise and deal with selected item manually
```html
 <vue-field-select  name="vehicleName"
                        :returnPromise="true"
                        @return-promise="returnPromise"
                        remoteKey="id"
                        remoteValue="name"
                        keyField="vehicleId"
                        valueField="vehicleName"
                        :field="$t('select_a_vehicle')"
                        :actualItem="currentEdit" :values="vehicles"/>
```
```javascript
<script> 
import VueFieldSelect from 'vue-field-select'
export default {
    data () {
        return {
            validationErrors:[],
            currentEdit: {id:'', vehicleId:'', vehicleName:'', chassisNumber:'',colour:'',steering:'', someOtherProperty:''},
            vehicles:[]
        }
    },
    components: {
        VueFieldSelect
    },
    created() {
        this.initialiseDropDowns();
    },
   methods: {
         //  Populate multiple elements from returned promise which may have other fields to be filled
        returnPromise:function(data) {             
             // for (var key in data) {
             //     this.currentEdit[key]=data[key]
             // }        
            this.currentEdit.chassisNumber=data.chassisNumber
            this.currentEdit.colour=data.colour
            this.currentEdit.steering=data.steering

            this.currentEdit.vehicleId=data.id
            this.currentEdit.vehicleName=data.name
        },
        initialiseDropDowns(){
            MyService.fetch('/vehicle/list')
                .then((res) => {
                    if (res.data) {
                        this.vehicles = res.data;
                        /**
                        {id:'a',name:'vehicle 01', colour:'red', chassisNumber:'x', steering:'Power'},
                        {id:'a0', name:'zyz vehicle 01',colour:'red', chassisNumber:'x', steering:'Power'},
                        {id:'a1', name:'abc vehicle 02',colour:'red', chassisNumber:'x', steering:'Power'},
                        {id:'a2', name:'vehicle 03',colour:'red', chassisNumber:'x', steering:'Power'},
                        {id:'a3', name:'vehicle 03',colour:'red', chassisNumber:'x', steering:'Power'},
                        */
                    }
                });
        },
   }
}
</script>
```

                        
##### Example 4 : `v-model` directive not defined `@search-value` `@id-sent` 

```html
 <vue-field-select  name="name"
                        @id-sent="updateSelectKey"
                        @search-value="updateSelectValue"
                        keyField="id"
                        valueField="name"
                        :field="$t('select_a_vehicle')"
                        :actualItem="currentEdit" :values="vehicles"/>
```
```javascript
<script> 
import VueFieldSelect from 'vue-field-select'
export default {
    data () {
        return {
            validationErrors:[],
            currentEdit: {id:'', name:''},
            vehicles:[]
        }
    },
    components: {
        VueFieldSelect
    },
    created() {
        this.initialiseDropDowns();
    },
   methods: {
        updateSelectKey:function(value) {
            this.currentEdit.id=value
        },
        updateSelectValue:function(value) {
            this.currentEdit.name=value
        },
        initialiseDropDowns(){
            MyService.fetch('/vehicle/list')
                .then((res) => {
                    if (res.data) {
                        this.vehicles = res.data;
                        /**
                        {id:'a',name:'vehicle 01'},{id:'a0', name:'zyz vehicle 01'},
                        {id:'a1', name:'abc vehicle 02'},{id:'a2', name:'vehicle 03'},{id:'a3', name:'vehicle 03'},
                        {id:'a4', name:'abc vehicle 04'},{id:'a5', name:'vehicle 05'},{id:'a6', name:'vehicle 06'},
                        {id:'a7', name:'abc vehicle 07'},{id:'a8', name:'vehicle 08'},{id:'a9', name:'vehicle 09'}
                        */
                    }
                });
        },
   }
}
</script>
```

#### Changelog
#### v.1.1.5
- `id` `ref` tags added to autocomplete will be set to what ever you set `name` as .
-  likely an issue with pre-loading existing data the created mounted functions did not work single mounted added

#### v.1.1.4
This is really version 1.0.1, should have kept to 1.1.3 as initial release to save on current headache revert
 
#### v.1.0.2 / 1.0.1 
- minor logic issues spotted  - but due to a bad release of 1.1.3 I can't publish properly 
`npm version patch && npm publish --tag current-version`    `npm info vue-field-select versions`
None of this update to the latest which is now an old tag 
grrrr...


#### v.1.0.0
- Working release built on webpack 4 - includes `vue-field-select` & `vue-field-select-valid`
 

## Credits
### [Zachary Klein](https://github.com/grails-guides/building-a-vue-app/blob/master/complete/client/src/components/form/FieldSelect.vue)
FieldSelect was the original code that got expanded to become this a more flexible way of calling `field-select`
 
