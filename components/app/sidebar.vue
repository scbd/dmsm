<template>
  <CSidebar
    position="fixed"
    :unfoldable="false"
    :visible="true"
    @visible-change="(event) =>{}"
  >

    <CSidebarBrand >
        <img class="ps-2" src="https://chm.cbd.int/app/components/scbd-branding/images/cbd-leaf-green.svg" role="img" custom-class-name="sidebar-brand-full" height="65">
        <CTooltip content="Drupal Multi-site Infra Management" placement="bottom" trigger="hover">
            <template #toggler="{ on }">
                <span class="brand-name" v-on="on">SCBD Drupal <br> Multi-site Management</span>
            </template>
        </CTooltip>

    </CSidebarBrand>     
    <CSidebarNav>

      <AppEnvChanger/>
      <KmLink to="/" > Dashboard </KmLink>

      <!-- <CNavGroup :visible="true">
        <template #togglerContent>
             Something
        </template>
        <KmLink to="/" >  erqwrqone</KmLink>
        <KmLink to="/" >  two</KmLink>
      </CNavGroup> -->

      
      <li class="nav-title">Multisite Instances</li>  
      <!-- v-for="(aTarget,i) in multiSites || []" :key="i" -->
      <CNavGroup  v-on:click="goTo(`/${env}/${multiSite.multiSiteCode}`)" v-for="(multiSite,i) in multiSites || []" :key="i"  :visible="false">
        <template #togglerContent> {{multiSite.name}} </template>
        <KmLink :to="`/${env}/${multiSite.multiSiteCode}/sites`" >Sites</KmLink>
      </CNavGroup>  
    </CSidebarNav>
    <!-- @click="userPreferences.setSidebarUnfoldable(!userPreferences.sidebarUnfoldable)" -->
    <!-- <CSidebarToggler  class="d-none d-lg-flex" >  
   

    </CSidebarToggler> -->
    
  </CSidebar>
</template>
<script setup>
  import {  useConfigStore } from "~/stores/config";

  const configStore = useConfigStore();

  const env        = computed(()=>configStore.env);
  const multiSites = computed(()=>configStore.multiSiteConfigs);

  async function goTo(path){
        if(!path) return 

        await navigateTo({ path })
    }


</script>

<!-- <script>

import { useRealmConfStore }    from '@/stores/realmConf';
import { useUserPreferencesStore } from '@/stores/userPreferences';
import { KmNavLink } from '@/components/controls';
import { useRoute } from 'vue-router';


export default {
  name: 'AppSidebar',
  components: {
    KmNavLink
},
  async setup() {
    const { ACCOUNTS_HOST_URL, TAG, COMMIT } = useRuntimeConfig().public
    const {$appRoutes:appRoutes }   = useNuxtApp();
    const {locale} = useI18n()
    const localePath  = useLocalePath()
    const { loadRealmConf } = useRealmConfStore();
    const userPreferences = useUserPreferencesStore();
    const { t } = useI18n()
    const route = useRoute();
    
    await loadRealmConf();

    const menuAccess = {
      [appRoutes.DASHBOARD] : true,
      [appRoutes.NATIONAL_TARGETS]            : true,
      [appRoutes.NATIONAL_TARGETS_MY_COUNTRY]   : true,//false,
      [appRoutes.NATIONAL_REPORTS_NR6]      : true,
      [appRoutes.NATIONAL_REPORTS_NR7]      : true,
      [appRoutes.NATIONAL_REPORTS_NR7_EDIT] : true,//false,
      
    }
    // for (const route in menuAccess) {
    //   if (Object.hasOwnProperty.call(menuAccess, route)) {
    //     if(!menuAccess[route])
    //       menuAccess[route] = await $security.canAccessRoute(route)
    //   }
    // }

    const isChildRouteActive = (path)=>{
      return route.fullPath.indexOf(path)>=0
    }

    const isDevelopment = ACCOUNTS_HOST_URL.indexOf('accounts.cbddev.xyz')>=0
    
    return {
      sidebarUnfoldable: false,
      sidebarVisible: true,
      appRoutes,
      menuAccess,
      localePath,
      t,
      isChildRouteActive,
      isDevelopment,
      userPreferences, TAG, COMMIT
    }
  },
}
</script> -->
<style scoped>
/* TODO:Temp check why its not align with parellel component */
.sidebar-nav .nav-title {
  background: #000;
}

.sidebar-brand .brand-name {
  font-size: medium;
  padding: 5px;
  margin-top: 10px;
}

.app-version{
    position: absolute;
    left:5px;
    bottom: 10px;
    color: #fff;
}
</style>