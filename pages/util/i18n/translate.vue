<template>
    <h1>Translate</h1>

    <CCardBody class="down" >
            <div class="form-floating">
                <ControlTranslate v-model="config"/>
                <!-- <textarea class="form-control"  :id="`json-${config.multiSiteCode}`" style="height: 300px"  :value="jsonConfig">
                </textarea>
                <input type="hidden"    v-model="config"/>
            
                <label :for="`json-${config.multiSiteCode}`">JSON</label> -->
            </div>
        </CCardBody>
<hr>
    <pre>
        {{config}}
    </pre>
</template>

<script setup>


const config = ref({});
</script>