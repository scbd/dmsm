<template>
    <div>
        <h1>Stack</h1>
        <pre>{{data}}</pre>
    </div>
</template>
<script setup>


    const route         = useRoute()                                ;
    const env           = ref(route.params.env)                ;
    const multiSiteCode = ref(route.params.multiSiteIdentifier);
    const method        = 'GET'                                     ;
    const headers       = getBaseHeaders()                          ;


    const  data = await $fetch(`/api/${env.value}/${multiSiteCode.value}/stack`,{ headers, method });

</script>