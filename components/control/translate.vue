
<template>
    <div v-if="msgs.length">
        <div :class="{ [`alert-${msg.type}`]: msg.type }" class="alert  alert-dismissible fade show" v-for="(msg,i) in msgs || []" :key="i"  style="border-color:#DDD; " role="alert">
            <button @click="removeMsg(i)" type="button" class="btn float-end" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <h3>{{msg.title}}</h3>
            <p>{{msg.body}}</p>

        </div>
    </div>
    <div class="form-floating">
        <div class="form-group">
            <label>Translate to:</label>
            
            <VueMultiselect
            v-model="selectedLanguages"
            :options="googleLangs"
            :searchable="true"
            track-by="code"
            label="name"
            :multiple="true"
            :hide-selected="true"
            :taggable="true"
            />
        </div>

        <div class="form-group">
            <label>Json5 to translate:</label>
            <textarea v-model="targets" :id="`json-translate`" style="height: 150px" class="form-control" >

            </textarea>
            <pre>{{targets}}</pre>
        </div>
        <div class="form-group">
            <button @click="translate()" type="button" class="btn btn-success bold" >
                    <span>Translate</span>
                </button>
        </div>
        <div class="form-group">
            Results:
            <pre>{{results}}</pre>
            {{router.query  }}
        </div>
    </div>
</template>
<script setup>
import JSON5 from 'json5';
import VueMultiselect from 'vue-multiselect';

const router = useRoute()
const props = defineProps({ modelValue: Object })


const targets = ref('{}')
const emit = defineEmits(['update:modelValue'])


const headers     = getBaseHeaders();
const { data: googleLangs } = await useFetch(`/api/i18n/google-locales`, {  method: 'GET', headers});

const selectedLanguages = ref([])
const results =ref({})
const msgs = ref([])
//   emit('update:modelValue', returnObject)

const idbLangs = ref([ "am", "az", "bg", "bn", "bs", "ca", "cs", "de", "et", "eu", "fi", "ga", "gd", "gl", "el", "hi", "hr", "ht", "is", "hu", "hy", "it", "ja", "ka", "ko", "lt", "lv", "mr", "ms", "ne", "pl", "pt", "ro", "sk", "sl", "sr", "tr", "uk" ]);



function translate(){

    const targetsObj = JSON5.parse(targets.value || {});
    if(!selectedLanguages?.value?.length) return noLangSelected();
    if(!targets?.value || !Object.keys(targetsObj).length) return noTranslationProvided();


    const promises = [];

    for(const { code } of selectedLanguages.value){
        promises.push($fetch(`/api/i18n/${code}`, {  method: 'POST', headers, body: targetsObj  }).then((r)=> results.value[code]=r));
        // results.value.push(data)
    }

    Promise.all(promises).then(()=> {
       //emit('update:modelValue', results.value)
        consola.error('results.value', results.value)
    }).catch((e)=> {
        msgs.value.push({title: 'Error', body:e, type: 'danger' })
    })
}

function noLangSelected(){
    msgs.value.push({title: 'Please select a language', body:'', type: 'danger' })
}

function noTranslationProvided(){
    msgs.value.push({title: 'Please provide targets to translate', body:'No targets provided', type: 'danger' })
}

function removeMsg(i){
    msgs.value.splice(i, 1)
}

if(router.query.idb){
    selectedLanguages.value = googleLangs.value.filter((l)=>idbLangs.value.includes(l.code) )
}
</script>
