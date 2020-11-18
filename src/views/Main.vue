<template>
  <Welcome />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Welcome from '@/components/main/Welcome.vue';

@Component({
  components: {
    Welcome
  }
})
export default class Home extends Vue {}
</script>
