<template>
    <h3>{{config.name}}</h3>
    <hr>
    <MultiSiteConfig :config="config"/>
    <hr>
    <ListSites/>

</template>
<script setup>
import {  useConfigStore } from "~/stores/config";

const configStore = useConfigStore();
const route = useRoute();

const config = computed(()=>configStore.getMultiSite(route.params.multiSiteIdentifier).config);

// const c = configStore.getMultiSite(route.params.multisiteIdentifier).config


//await configStore.setMultiSiteConfig('dev', route.params.multisiteIdentifier,c )
</script>
