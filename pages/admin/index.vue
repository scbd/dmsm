<template>
    <h1 class="mb-4">Admin</h1>
    <hr>

    <h3>Missing i18n Services ({{missing.length}})</h3>
    <div>{{missing}}</div>
    <h3 class="mt-3">Supported i18n Locales ({{supported.length}})</h3>
    <div>{{supported}}</div>

    <h3 class="mt-3">In Use i18n Locales ({{inUse.length}})</h3>
    <div>{{inUse}}</div>
</template>
<script setup>

const { data:missing } = await useFetch(`/api/admin/i18n/no-services`, {  method: 'GET'});
const { data:supported } = await useFetch(`/api/admin/i18n/supported-locales`, {  method: 'GET'});
const { data:inUse } = await useFetch(`/api/admin/i18n/locales-in-use`, {  method: 'GET'});
</script>