
<template>
    <div class="form-floating">
        <textarea :value="modelValueString"  @input="updateValue" :id="`json-${props.modelValue.multiSiteCode}`" style="height: 300px" class="form-control" >

        </textarea>
        <label :for="`json-${props.modelValue.multiSiteCode}`">JSON</label>
    </div>
</template>
<script setup>

const props = defineProps({ modelValue: Object })

const modelValueString = ref(stringifyJSON(props.modelValue, null, 4))

const emit = defineEmits(['update:modelValue'])

const updateValue = (event) => {
    modelValueString.value = event.target.value

    const returnObject = parseJSON(event.target.value)

    if(returnObject)
    emit('update:modelValue', returnObject)
    
}
</script>