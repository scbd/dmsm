<template>
      <CFormSelect @change="changed($event)" size="sm" class="my-3 w-75 ms-4" aria-label="Default select example">
        <option v-for="env in environments" :selected="env === selected">{{env}}</option>
      </CFormSelect>
</template>

<script setup>

const configStore = useConfigStore();
const route = useRoute();
const selected     = computed(()=>configStore.env);
const environments = computed(()=>configStore.environments);

function changed(e){
    configStore.setEnv(e.target.value)
    consola.warn(route)
    navigateTo(`/${e.target.value}/${route.params.multiSiteIdentifier}`)
}

</script>