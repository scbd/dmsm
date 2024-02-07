<template>
  <CBreadcrumb class="d-md-down-none me-auto mb-0"> 
    <NuxtLink v-for="item in breadcrumbs" class="breadcrumb-item"
      :key="item"
      :href="item.active ? '' : item.to"
      :class="{'active' : item.active}">{{ item.text }}</NuxtLink>
  </CBreadcrumb>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { capitalCase } from 'change-case';
// import { languages } from '@/app-data/languages'
import { useRoute } from 'vue-router' 
//TODO: verify when nuxt issue is fixed, temp use useRoute directly from vue instead of nuxt

const route = useRoute();

    function makeCrumbs (){ //eslint-disable-line

      

      const crumbs    = {
                            '/'             : [ { text:'Dashboard', to: '/', active: '/' === route.path } ],   
                            '/bl2'          : [ { text:'Bioland 2.0', to: '/bl2', active: '/bl2' === route.path } ],
                            '/bl2/over-view': [ { text:'Bioland 2.0', to: '/bl2', active: '/bl2' === route.path }, { text:'Over View', to: '/bl2/over-view', active: '/bl2/over-view' === route.path }],
                            '/bl1'          : [ { text:'Bioland 1.0', to: '/bl1', active: '/bl1' === route.path } ],
                            '/bl1/over-view': [ { text:'Bioland 1.0', to: '/bl1', active: '/bl1' === route.path }, { text:'Over View', to: '/bl1/over-view', active: '/bl1/over-view' === route.path }],
      }
      return crumbs[route.path];
    }
    const breadcrumbs = computed(()=>{
      return makeCrumbs()
    })
      
</script>
