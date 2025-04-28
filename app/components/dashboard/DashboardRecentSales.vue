<template>
  <DashboardCard
    :title="'Recent Sales'"
    :description="'Last 7 days.'"
    :icon="'lucide:chart-column'"
  >
    <template v-if="data.length">
      <div
        v-for="(sale, index) in data"
        :key="index"
        class="relative flex items-center gap-1.5 px-2 py-2.5"
      >
        <Avatar>
          <AvatarImage
            :src="sale.user.avatar?.src"
            :alt="sale.user.name"
          />
          <AvatarFallback>
            <span class="text-lg">{{ getAvatarFallback(sale.user.name) }}</span>
          </AvatarFallback>
        </Avatar>
        <div class="flex-1 text-sm truncate">
          <p class="font-medium">
            {{ sale.user.name }}
          </p>
          <p class="text-muted-foreground">
            {{ sale.user.email }}
          </p>
        </div>

        <p class="text-lg font-medium">
          {{ formatCurrency(sale.price) }}
        </p>
      </div>
    </template>
    <template v-else>
      <div
        v-for="i in 3"
        :key="i"
        class="px-4 py-4"
      >
        <Skeleton
          class="w-full h-5 rounded-sm"
        />
      </div>
    </template>
  </DashboardCard>
</template>

<script lang="ts" setup>
const sales = [
  {
    user: {
      name: 'Glad Corkill',
      email: 'gcorkill0@example.com',
      avatar: {
        src: 'https://i.pravatar.cc/128?u=30',
      },
    },
    price: 120,
  },
  {
    user: {
      name: 'Tonia Gawen',
      email: 'tgawen1@example.com',
      avatar: {
        src: 'https://i.pravatar.cc/128?u=38',
      },
    },
    price: 560,
  },
  {
    user: {
      name: 'Vitoria Ickowicz',
      email: 'vickowicz2@example.com',
      avatar: {
        src: 'https://i.pravatar.cc/128?u=35',
      },
    },
    price: 350,
  },
  {
    user: {
      name: 'Stearn Nelhams',
      email: 'snelhams3@example.com',
      avatar: {
        src: 'https://i.pravatar.cc/128?u=56',
      },
    },
    price: 80,
  },
  {
    user: {
      name: 'Jack Carnelley',
      email: 'jcarnelley4@example.com',
      avatar: {
        src: 'https://i.pravatar.cc/128?u=77',
      },
    },
    price: 350,
  },
  {
    user: {
      name: 'Dermot Brettor',
      email: 'dbrettor5@example.com',
      avatar: {
        src: 'https://i.pravatar.cc/128?u=73',
      },
    },
    price: 80,
  },
]

const { data, execute } = useAsyncData(async () => {
  await sleep(500)
  return sales
}, {
  default: () => [],
  immediate: false,
})

onMounted(() => {
  execute()
})
</script>
