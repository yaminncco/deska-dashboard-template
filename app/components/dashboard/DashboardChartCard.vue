<template>
  <Card>
    <CardHeader>
      <slot name="header" />
    </CardHeader>
    <CardContent class="px-0">
      <slot />
    </CardContent>
  </Card>
</template>
