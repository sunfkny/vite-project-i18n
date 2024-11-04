<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { LANG_INFO, saveLanguage } from "../locale";

const i18n = useI18n();

const btns = Object.values(LANG_INFO).map(info => {
    return {
        name_local: info.name_local,
        setLanguage: () => {
            i18n.locale.value = info.code;
            saveLanguage(info.code);
        },
    };
});
</script>

<template>
    <div>
        <div v-for="btn in btns">
            <p>
                <button @click="btn.setLanguage()">{{ btn.name_local }}</button>
            </p>
        </div>
    </div>
</template>
