<template>
    <div>
        <h3>APi Tests : </h3>
        =<pre>{{Object.keys(data.dev)}}</pre>=
    </div>
</template>
<script setup>

const headers     = getBaseHeaders();
const { data } = await useFetch(`/api/config`, {  method: 'GET', headers});
consola.warn(data.value)
</script>