<script setup lang="ts">
import { BaseContainer } from '@/shared/ui'
</script>
<template>
  <div class="app">
    <div class="app__layout">
      <BaseContainer>
        <h1 class="app__title">Permissions</h1>

        <nav class="app__navigation">
          <slot name="navigation" />
        </nav>
        <main class="app__page">
          <slot name="page" />
        </main>
      </BaseContainer>
    </div>
  </div>
</template>

<style scoped lang="scss">
.app {
  &__title {
    font-size: 2rem;
    text-align: left;

    @media screen and (max-width: 768px) {
      margin-top: 10px;
      margin-left: 5px;
      font-size: 1.5rem;
    }
  }
  &__layout {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px 0;
    background-color: #59585d;
  }

  &__navigation {
    align-self: flex-end;
  }

  &__page {
    min-height: 50rem;
  }
}
</style>
