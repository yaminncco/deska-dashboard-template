<template>
  <ConfigProvider
    :use-id="useIdFunction"
    :dir="dir"
  >
    <Html
      :lang="lang"
      :dir="dir"
    >
      <Head>
        <Link
          rel="icon"
          type="image/svg+xml"
          href="/favicon.svg"
        />
        <Link
          rel="shortcut icon"
          href="/favicon.ico"
        />
      </Head>

      <slot />
    </Html>
  </ConfigProvider>
</template>

<script lang="ts" setup>
import { ConfigProvider } from 'reka-ui'

const useIdFunction = () => useId()

const lang = 'en'
const dir = 'ltr'
</script>
