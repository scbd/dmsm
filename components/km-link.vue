<template>
    <CNavItem >
        <!-- isActve{{ route.path }} {{ to }} @click="navigateTo(to)" href="#" -->
        <NuxtLink class="nav-link" :to="to" :class="{'active' : route.path == to}" :target="target">
            <CIcon v-if="icon && ~icon.indexOf('cil-')" :icon="icon" class="nav-icon" /> 
            <!-- <font-awesome-icon  v-if="icon && ~icon.indexOf('fa-')" class="menu-icon" :icon="'fa-solid ' + icon" /> -->
            <slot></slot>
        </NuxtLink> 
    </CNavItem>
</template>
<script lang="ts">
import {useRoute } from 'vue-router';

export default defineComponent({
    props: {
        title: { type:String},
        to   : { type:String, required :true},
        icon : { type:String },
        target : { type:String }
    },
    setup(props) {
        const route = useRoute();
        const to = computed(()=>{
            return props.to
        });
        const title = computed(()=>props.title);
        const icon = computed(()=>props.icon);
        const isRouteActive = ()=>route.path === props.to;

        return {
            to,
            title,
            icon,
            target: props.target,
            isRouteActive,
            route
        }
    },
})
</script>
<style scoped>
    .menu-icon{
        margin-right: 5px;
    }
</style>